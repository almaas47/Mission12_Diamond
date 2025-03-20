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
        public IActionResult GetBooks(int pageHowMany = 5, int pageNumber = 0)
        {
            var something = _bookContext.Books
                .Skip((pageNumber - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();   
            
            var totalNumBooks = _bookContext.Books.Count();

            var theObject = new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            };
            
            return Ok(theObject);
        }
        
        // [HttpGet]
        // public IEnumerable<Book> GetFunctionalBooks() => _bookContext.Book.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
    }
}