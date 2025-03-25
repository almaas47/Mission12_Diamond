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
        public IActionResult GetBooks(int pageHowMany = 5, int pageNumber = 0, [FromQuery] List<string>? projectTypes = null)
        {
            var query = _bookContext.Books.AsQueryable();
            if (projectTypes != null && projectTypes.Any())
            {
                query = query.Where(p => projectTypes.Contains(p.Category));
            }
            
            string? favoriteBook = Request.Cookies["FavoriteBook"];
            Console.WriteLine("==========COOKIE==========");
            
            HttpContext.Response.Cookies.Append("FavoriteBook", "Les Miserables", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now.AddMinutes(1)
            });
            
            var totalNumBooks = query.Count();
            
            var something = query
                .Skip((pageNumber - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            var theObject = new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            };
            
            return Ok(theObject);
        }

        [HttpGet("BookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _bookContext.Books
                .Select(p => p.Category)
                .Distinct()
                .ToList();
            return Ok(bookTypes);
        }
        
    }
}