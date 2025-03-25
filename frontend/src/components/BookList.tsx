import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function BookList ({selectedCategories} : {selectedCategories: string[]}) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {

            const categoryParams = selectedCategories
                .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
                .join('&');

            const response = await fetch(`http://localhost:4000/api/BookStore?pageHowMany=${pageSize}&pageNumber=${pageNumber}${selectedCategories.length ? `&${categoryParams}` : ''}`,
            {
                credentials: 'include'
            });

            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(totalItems / pageSize));
        }
        fetchBooks();
    }, [pageSize, pageNumber, totalItems, selectedCategories]);

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const sortedBooks = [...books].sort((a, b) => {
        return sortOrder === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
    });

    const handleAddToCart = (book: Book) => {
        const cartItem = {
            bookId: book.bookID,
            title: book.title,
            price: parseFloat(book.price.toFixed(2)),
            quantity: 1 // Add a quantity field
        };
    
        addToCart(cartItem);
        setShowToast(true); // Show toast
        setTimeout(() => setShowToast(false), 3000); // Toast timeout
    };

    return (
        <>
            <button className="btn btn-primary mb-3" onClick={toggleSortOrder}>
                Sort by Title ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
            </button>
            <br />

            {sortedBooks.map((p) => 
                <div id="bookCard" className="card mb-3" key={p.bookID}>
                    <h3 className="card-title">{p.title}</h3>
                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li><strong>Author:</strong> {p.author}</li>
                            <li><strong>Publisher:</strong> {p.publisher}</li>
                            <li><strong>ISBN:</strong> {p.isbn}</li>
                            <li><strong>Classification/Category:</strong> {p.classification}/{p.category}</li>
                            <li><strong>Number of Pages:</strong> {p.pageCount}</li>
                            <li><strong>Price:</strong> ${p.price}.00</li>
                        </ul>
                        <button 
                            className="btn btn-success" 
                            onClick={() => handleAddToCart(p)}
                            // onClick={() => navigate(`/donate/${p.author}/${p.bookID}`)}
                            >
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            <div className={`toast ${showToast ? "show" : "hide"}`} style={{
                position: "fixed", bottom: "20px", right: "20px", background: "#28a745",
                color: "white", padding: "10px 15px", borderRadius: "8px"
            }}>
                📚 Added to Cart!
            </div>

            <br />

            <button disabled={pageNumber === 1} onClick={() => setPageNumber(pageNumber - 1)}>Previous</button>

            {
                [...Array(totalPages)].map((_, i) => (
                <button key={i + 1} onClick={() => setPageNumber(i + 1)} disabled={pageNumber === (i + 1)}>
                    {i + 1}
                </button>
                ))}

            <button disabled={pageNumber === totalPages} onClick={() => setPageNumber(pageNumber + 1)}>Next</button>

            <br />

            <label htmlFor="">
                Results Per Page: 
                <select 
                value={pageSize} 
                onChange={
                    (p) => {
                        setPageSize(Number(p.target.value));
                        setPageNumber(1);
                }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </label>
        </>
    );
}

export default BookList;