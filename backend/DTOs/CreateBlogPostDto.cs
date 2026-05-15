// what the client sends when creating a new post. 
// You should only need Title, Content, and Slug here.
// Think about why CreatedAt and Id are not included.

namespace backend.DTOs;

public class CreateBlogPostDto
{
    // Required text field
    public required string Title { get; set; } = string.Empty;

    // The 'Slug' (e.g., "my-first-post")
    // Usually indexed in the database for fast lookups
    public required string Slug { get; set; } = string.Empty;

    public List<int> CategoryIds { get; set; } = [];

    // Use 'string' for long-form text (mapped to TEXT or NVARHCAR(MAX))
    public required string Content { get; set; } = string.Empty;

}
