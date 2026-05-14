namespace backend.Models;

public class Category
{
    public int Id {get; set;}
    public required string name {get; set;}

    public List<BlogPost> BlogPosts {get; set;} = [];
}