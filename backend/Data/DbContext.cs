using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

//Think of this as a bridge between C# code and databse
public class AppDbContext:DbContext{
    
    public AppDbContext(DbContextOptions<AppDbContext> options):base(options){

    }

    public DbSet<BlogPost> BlogPosts {get; set;}

}