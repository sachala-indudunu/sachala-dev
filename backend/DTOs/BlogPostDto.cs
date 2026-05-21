// what the API returns when someone reads a post. Include Id, Title, Content, CreatedAt, and Slug.

namespace backend.DTOs;

public class BlogPostDto
{
    // Primary Key (Standard for EF Core)
    public int Id { get; set; }

    // Required text field
    public required string Title { get; set; }

    // The 'Slug' (e.g., "my-first-post")
    // Usually indexed in the database for fast lookups
    public required string Slug { get; set; } 

    // Use 'string' for long-form text (mapped to TEXT or NVARHCAR(MAX))
    public required string Content { get; set; } 

    // Precise timestamp for when it was created
    public DateTime CreatedAt { get; set; } 

    public required List<CategoryDto> Categories{get; set;} = [];

    public string? ThumbnailUrl { get; set; }

}
