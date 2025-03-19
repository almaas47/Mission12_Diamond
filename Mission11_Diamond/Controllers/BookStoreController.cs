using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Mission11_Diamond.Data;

namespace Mission11_Diamond.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookStoreController : ControllerBase
    {
        private BookstoreDbContext _bookContext;
        
        public BookStoreController(BookstoreDbContext temp) => _bookContext = temp;

        [HttpGet]
        public IEnumerable<Book> GetBooks() => _bookContext.Books.ToList();
        
        // [HttpGet]
        // public IEnumerable<Book> GetFunctionalBooks() => _bookContext.Book.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
    }
}