using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations.Operations;

namespace backend.Controllers{
    
    // tells ASP.NET Core — this class is an API controller, handle it accordingly. It enables automatic validation and error handling.
    [ApiController]
    //any request that comes in to the URL /api/blogposts should be handled by this controller.
    [Route("api/blogposts")]

    public class BlogPostsController:ControllerBase{
        //is a base class provided by ASP.NET Core. 
        // It gives you helper methods like Ok(), NotFound(), BadRequest() — you will use these to return responses.
        private readonly AppDbContext _context;
        //_context is now your connection to the database. 
        // The readonly keyword means it can only be set in the constructor — not changed later. This is standard practice.

        public BlogPostsController(AppDbContext context)
        //this is dependency injection happening. ASP.NET Core sees the constructor needs an AppDbContext, 
        // and because you registered it in Program.cs, it automatically creates one and passes it in.
        {
            _context = context;
        }
       
       [HttpGet] //tells ASP.NET Core this method handles GET requests to /api/blogposts.
       public async Task<ActionResult<IEnumerable<BlogPostDto>>> GetAll()
       //ActionResult<IEnumerable<BlogPostDto>> is the return type. 
       // IEnumerable<BlogPostDto> means a list of BlogPostDto objects. ActionResult wraps it so you can also return HTTP status codes like 200 or 404.
        {
            var posts = await _context.BlogPosts.Include(b => b.Categories).ToListAsync();

            var result = posts.Select(p => new BlogPostDto
            {
                Id = p.Id,
                Title = p.Title,
                Slug = p.Slug,
                Content = p.Content,
                CreatedAt = p.CreatedAt,
                Categories = p.Categories.Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name
                }).ToList()
                
            });
            //The Select maps each BlogPost database model to a BlogPostDto. 
            // This is the manual mapping — you are explicitly choosing what fields go into the response. 
            // This is where your DTO earns its purpose.

            return Ok(result);
        }


        [HttpPost]
        public async Task<ActionResult<BlogPostDto>> Create(CreateBlogPostDto dto){
            //CreateBlogPostDto dto — ASP.NET Core reads the JSON body of the request and maps it to this object automatically.
            var post = new BlogPost
            {
                Title = dto.Title,
                Slug = dto.Slug,
                Content = dto.Content
            };

            _context.BlogPosts.Add(post);
            await _context.SaveChangesAsync();


            var categories = await _context.Categories
                .Where(c => dto.CategoryIds.Contains(c.Id))
                .ToListAsync();

            post.Categories =  categories;

            await _context.SaveChangesAsync();


            var result = new BlogPostDto
            {
                Id = post.Id,
                Title = post.Title,
                Slug = post.Slug,
                Content = post.Content,
                CreatedAt = post.CreatedAt,
                Categories = post.Categories.Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name
                }).ToList()
            };

            return CreatedAtAction(nameof(GetAll), result);
            //CreatedAtAction returns HTTP 201 — which means "resource created successfully". This is more correct than Ok() for a POST.

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<BlogPostDto>> GetBlogPost(int id)
        {
            var post = await _context.BlogPosts.Include(b => b.Categories).FirstOrDefaultAsync(b => b.Id == id);

            if(post == null)
            {
                return NotFound();
            }

            var result = new BlogPostDto
            {
                Id = post.Id,
                Title = post.Title,
                Slug = post.Slug,
                Content = post.Content,
                CreatedAt = post.CreatedAt,
                Categories = post.Categories.Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name
                }).ToList()
            };

            return Ok(result);
        }
        

        [HttpPut("{id}")]
        public async Task<ActionResult<BlogPostDto>> UpdateBlogPost(int id, UpdateBlogPostDto dto)
        {
            var existing = await _context.BlogPosts
                .Include(p => p.Categories)
                .FirstOrDefaultAsync(p => p.Id == id);

            if(existing == null)
            {
                return NotFound();
            }

            existing.Title = dto.Title;
            existing.Content = dto.Content;
            existing.Slug = dto.Slug;

            var categories = await _context.Categories
                .Where(c => dto.CategoryIds.Contains(c.Id))
                .ToListAsync();

            existing.Categories = categories;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBlogPost(int id)
        {
            var existing = await _context.BlogPosts.FindAsync(id);

            if(existing == null)
            {
                return NotFound();
            }

            _context.BlogPosts.Remove(existing);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
    
}