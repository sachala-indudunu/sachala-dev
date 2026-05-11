using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

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
       public ActionResult<IEnumerable<BlogPostDto>> GetAll()
       //ActionResult<IEnumerable<BlogPostDto>> is the return type. 
       // IEnumerable<BlogPostDto> means a list of BlogPostDto objects. ActionResult wraps it so you can also return HTTP status codes like 200 or 404.
        {
            var posts = _context.BlogPosts.ToList();

            var result = posts.Select(p => new BlogPostDto
            {
                Id = p.Id,
                Title = p.Title,
                Slug = p.Slug,
                Content = p.Content,
                CreatedAt = p.CreatedAt
            });
            //The Select maps each BlogPost database model to a BlogPostDto. 
            // This is the manual mapping — you are explicitly choosing what fields go into the response. 
            // This is where your DTO earns its purpose.

            return Ok(result);
        }


        [HttpPost]
        public ActionResult<BlogPostDto> Create(CreateBlogPostDto dto){
            //CreateBlogPostDto dto — ASP.NET Core reads the JSON body of the request and maps it to this object automatically.
            var post = new BlogPost
            {
                Title = dto.Title,
                Slug = dto.Slug,
                Content = dto.Content
            };

            _context.BlogPosts.Add(post);
            _context.SaveChanges();

            var result = new BlogPostDto
            {
                Id = post.Id,
                Title = post.Title,
                Slug = post.Slug,
                Content = post.Content,
                CreatedAt = post.CreatedAt
            };

            return CreatedAtAction(nameof(GetAll), result);
            //CreatedAtAction returns HTTP 201 — which means "resource created successfully". This is more correct than Ok() for a POST.

        }
        
    }
    
}