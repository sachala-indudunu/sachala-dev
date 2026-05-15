## Blog Post Backend Documentation
### ASP.NET Core Web API

## Overview

This backend is a REST API built with ASP.NET Core. It is completely separate from the frontend — it does not know anything about the UI. Its only job is to receive HTTP requests, do something with the data, and return a response.

The frontend calls this API over HTTP to get blog posts, create posts, assign categories, and so on. They talk to each other through JSON.

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
