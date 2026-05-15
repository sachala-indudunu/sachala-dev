# Backend Documentation
### sachala-dev — ASP.NET Core Web API

> Every decision is explained, not just described.

---

## Overview

The backend is a REST API built with ASP.NET Core. It is completely separate from the frontend — it does not know anything about the UI. Its only job is to receive HTTP requests, do something with the data, and return a response.

The frontend (Next.js) calls this API over HTTP to get blog posts, create posts, assign categories, and so on. They talk to each other through JSON.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| ASP.NET Core (C# / .NET 10) | Web framework — handles HTTP requests and routing |
| Entity Framework Core | ORM — translates between C# objects and database tables |
| Npgsql | PostgreSQL driver — lets EF Core talk to PostgreSQL |
| PostgreSQL 18 | The database — stores all data |

---

## Project Structure

```
backend/
├── Controllers/          ← Entry points for HTTP requests
│   └── BlogPostsController.cs
├── Data/                 ← Database context
│   └── AppDbContext.cs
├── DTOs/                 ← Shapes of data going in and out of the API
│   ├── BlogPostDto.cs
│   ├── CategoryDto.cs
│   ├── CreateBlogPostDto.cs
│   └── UpdateBlogPostDto.cs
├── Migrations/           ← History of database schema changes (auto-generated)
├── Models/               ← C# classes that map to database tables
│   ├── BlogPost.cs
│   └── Category.cs
├── appsettings.json      ← Configuration (connection string lives here)
├── Program.cs            ← App entry point — registers all services
└── backend.csproj        ← Project file — defines dependencies
```

---

## How a Request Flows Through the App

Understanding this flow is the key to understanding everything else.

```
HTTP Request (from Postman or frontend)
  │
  ▼
Controller method (receives the request, validates input)
  │
  ▼
AppDbContext (talks to the database through EF Core)
  │
  ▼
PostgreSQL (reads or writes the actual data)
  │
  ▼
Controller maps result to a DTO
  │
  ▼
HTTP Response (JSON sent back to the caller)
```

Notice the DTO appears at the end — it controls exactly what data leaves the API. The raw database model is never sent directly.

---

## Database

### Models

Models are C# classes that EF Core maps to database tables. Each property becomes a column.

**BlogPost**

```csharp
public class BlogPost
{
    public int Id { get; set; }           // Primary key, auto-incremented
    public required string Title { get; set; }
    public required string Slug { get; set; }   // URL-friendly identifier e.g. "my-first-post"
    public required string Content { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public List<Category> Categories { get; set; } = [];  // Navigation property
}
```

**Category**

```csharp
public class Category
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public List<BlogPost> BlogPosts { get; set; } = [];  // Navigation property
}
```

### The Many-to-Many Relationship

A blog post can belong to many categories. A category can contain many blog posts. This is a many-to-many relationship.

Databases cannot express this directly. A third table — called a join table — stores pairs of IDs that record which posts belong to which categories.

```
BlogPostCategory (join table)
-----------------------------
BlogPostId | CategoryId
1          | 2
1          | 5
3          | 2
```

**You never create or manage this table manually.** EF Core creates it automatically when it sees navigation properties on both sides of the relationship (`List<Category>` on BlogPost and `List<BlogPost>` on Category). EF Core also manages inserts and deletes on this table automatically when you update the `Categories` list on a post.

### Navigation Properties

A navigation property is a property that points to a related object instead of storing a foreign key number.

```csharp
// Instead of storing just the number:
public int CategoryId { get; set; }

// Navigation property stores the actual object:
public List<Category> Categories { get; set; } = [];
```

This lets you write `post.Categories` in C# and get the actual category objects back. EF Core handles the join table query behind the scenes.

To load navigation properties you must use `Include()` when querying:

```csharp
// Without Include — Categories will be an empty list
var post = await _context.BlogPosts.FindAsync(id);

// With Include — Categories will be populated
var post = await _context.BlogPosts
    .Include(p => p.Categories)
    .FirstOrDefaultAsync(p => p.Id == id);
```

### AppDbContext

`AppDbContext` is the bridge between your C# code and the database. Every database read or write goes through it.

```csharp
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<BlogPost> BlogPosts { get; set; }
    public DbSet<Category> Categories { get; set; }
}
```

Each `DbSet` represents a table. `_context.BlogPosts` gives you access to the BlogPosts table.

### Migrations

A migration is a snapshot of a schema change. Every time you change a model — add a property, add a new model, change a type — you create a new migration. EF Core applies migrations to the database in order.

The `__EFMigrationsHistory` table in PostgreSQL tracks which migrations have already been applied so the same migration never runs twice.

**Migration history for this project:**

| Migration | What it did |
|---|---|
| `InitialCreate` | Set up the initial database connection |
| `AddBlogPostTable` | Created the BlogPosts table |
| `AddCategoryWithManyToMany` | Created Categories table and BlogPostCategory join table |
| `FixCategoryNameColumn` | Fixed a column name issue on the Categories table |

---

## DTOs — Why They Exist

A DTO (Data Transfer Object) is a class that defines exactly what shape of data travels over the wire. The rule is simple — never expose a database model directly from your API.

**Three reasons:**

1. **Security** — your model might have fields you never want to expose (e.g. a password hash). A DTO lets you choose exactly what goes out.
2. **Shape control** — what the client sends when creating a post is different from what it receives when reading one. Different DTOs for different operations.
3. **Stability** — your database model can change without breaking your API, as long as your DTOs stay consistent.

**DTOs in this project:**

| DTO | Used for |
|---|---|
| `BlogPostDto` | Returned when reading a post (GET) |
| `CategoryDto` | Returned as part of a BlogPostDto |
| `CreateBlogPostDto` | Received when creating a post (POST) |
| `UpdateBlogPostDto` | Received when updating a post (PUT) |

---

## API Endpoints

Base URL (local development): `http://localhost:5230`

---

### Blog Posts

---

#### `GET /api/blogposts`

Returns all blog posts with their categories.

**Request body:** none

**Response — 200 OK:**

```json
[
    {
        "id": 1,
        "title": "My First Blog Post",
        "slug": "my-first-blog-post",
        "content": "This is the content...",
        "createdAt": "2026-05-11T12:09:15.607972Z",
        "categories": [
            { "id": 1, "name": "Backend" },
            { "id": 2, "name": "dotnet" }
        ]
    }
]
```

---

#### `GET /api/blogposts/{id}`

Returns a single blog post by its id.

**Request body:** none

**Response — 200 OK:** same shape as a single object from the list above

**Response — 404 Not Found:** if no post exists with that id

---

#### `POST /api/blogposts`

Creates a new blog post and optionally assigns categories.

**Request body:**

```json
{
    "title": "My New Post",
    "slug": "my-new-post",
    "content": "Post content here.",
    "categoryIds": [1, 2]
}
```

`categoryIds` is optional — pass an empty array `[]` if no categories.

**Response — 201 Created:**

```json
{
    "id": 3,
    "title": "My New Post",
    "slug": "my-new-post",
    "content": "Post content here.",
    "createdAt": "2026-05-15T08:00:00Z",
    "categories": [
        { "id": 1, "name": "Backend" },
        { "id": 2, "name": "dotnet" }
    ]
}
```

---

#### `PUT /api/blogposts/{id}`

Updates an existing blog post. Replaces all fields and reassigns categories.

**Request body:**

```json
{
    "title": "Updated Title",
    "slug": "updated-slug",
    "content": "Updated content.",
    "categoryIds": [1]
}
```

**Response — 204 No Content:** success, no body returned

**Response — 404 Not Found:** if no post exists with that id

---

#### `DELETE /api/blogposts/{id}`

Deletes a blog post by its id.

**Request body:** none

**Response — 204 No Content:** success, no body returned

**Response — 404 Not Found:** if no post exists with that id

---

## Key Concepts

### Dependency Injection

The controller needs `AppDbContext` to talk to the database. Instead of the controller creating its own instance, ASP.NET Core creates one and passes it in through the constructor automatically.

```csharp
public BlogPostsController(AppDbContext context)
{
    _context = context;
}
```

This works because `AppDbContext` was registered in `Program.cs`:

```csharp
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionStr));
```

That registration tells ASP.NET Core — whenever something needs an `AppDbContext`, create one using this connection string and inject it.

### Async/Await

All database calls are async. This means the thread is not blocked while waiting for the database to respond — it is released to handle other requests in the meantime.

```csharp
// Synchronous — thread is blocked until DB responds
var posts = _context.BlogPosts.ToList();

// Async — thread is released while waiting, picked up when DB responds
var posts = await _context.BlogPosts.ToListAsync();
```

The behavior of your code is identical. The difference is efficiency when many users are hitting the API at the same time.

---

## Local Development

### Prerequisites

- .NET 10 SDK
- PostgreSQL 18
- dotnet-ef tool: `dotnet tool install --global dotnet-ef`

### Running the backend

```bash
cd backend
dotnet run
# API runs at http://localhost:5230
```

### Applying migrations

```bash
cd backend
dotnet ef database update
```

### Creating a new migration

Run this whenever you change a model:

```bash
dotnet ef migrations add YourMigrationName
dotnet ef database update
```

### Connection string

Located in `appsettings.json`:

```json
"ConnectionStrings": {
    "DefaultConnection": "Host=localhost; Port=5432; Database=sachala_dev; Username=postgres; Password=yourpassword"
}
```

Never commit real production passwords to Git. For local development this is acceptable.

---

*Last updated: May 2026 — Blog post CRUD and category relationship complete. Projects and contact form endpoints deferred to post-deployment phase.*
