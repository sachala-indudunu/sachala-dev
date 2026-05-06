using Microsoft.EntityFrameworkCore;


//Think of this as a bridge between C# code and databse
public class AppDbContext:DbContext{
    
    public AppDbContext(DbContextOptions<AppDbContext> options):base(options){

    }

}