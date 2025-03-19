import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BookList () {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('http://localhost:4000/api/BookStore');
            const data = await response.json();
            setBooks(data);
        }
        fetchBooks();
    }, [])

    return (
        <>
            <h1>BookStore</h1>
            <br />
            {books.map((p) => 
                <div id="bookCard">
                    <h3>{p.title}</h3>
                    <ul>
                        <li>Author: {p.author}</li>
                        <li>Publisher: {p.publisher}</li>
                        <li>ISBN: {p.isbn}</li>
                        <li>Classification/Category: {p.classification}/{p.category}</li>
                        <li>Number of Pages: {p.pageCount}</li>
                        <li>Price: ${p.price}.00</li>
                    </ul>
                </div>
            )}
        </>
    );
}

export default BookList;