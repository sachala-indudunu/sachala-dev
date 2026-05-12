
namespace backend.DTOs;

public class UpdateBlogPostDto
{
    // Required text field
    public required string Title { get; set; } = string.Empty;

    // The 'Slug' (e.g., "my-first-post")
    // Usually indexed in the database for fast lookups
    public required string Slug { get; set; } = string.Empty;

    // Use 'string' for long-form text (mapped to TEXT or NVARHCAR(MAX))
    public required string Content { get; set; } = string.Empty;

}
