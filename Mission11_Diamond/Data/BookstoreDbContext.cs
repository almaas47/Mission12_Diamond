using Microsoft.EntityFrameworkCore;
using Mission11_Diamond.Data;

namespace Mission11_Diamond.Data
{
    public class BookstoreDbContext : DbContext
    {
        public BookstoreDbContext(DbContextOptions<BookstoreDbContext> options) : base(options)
        {
        }
        
        public DbSet<Book> Books { get; set; }
    }
}