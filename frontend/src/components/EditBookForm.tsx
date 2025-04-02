import { useState } from "react"
import { Book } from "../types/Book"
import { updateBook } from "../api/BooksAPI";

interface editBookFormProps {
    book: Book;
    onSuccess: () => void;
    onCancel: () => void;
}

const EditBookForm = ({book, onSuccess, onCancel }: editBookFormProps) => {
    const [formData, setFormData] = useState<Book>({...book});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateBook(formData.bookID, formData);
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Book</h2>
            <label>Title:<input type="text"  name="title" value={formData.title} onChange={handleChange}/></label>
            <label>Author:<input type="text" name="author" value={formData.author} onChange={handleChange}/></label>
            <label>Publisher:<input type="text" name="publisher" value={formData.publisher} onChange={handleChange}/></label>
            <label>ISBN:<input type="text" name="isbn" value={formData.isbn} onChange={handleChange}/></label>
            <label>Classification:<input type="text" name="classification" value={formData.classification} onChange={handleChange}/></label>
            <label>Category:<input type="text" name="category" value={formData.category} onChange={handleChange}/></label>
            <label>Page Count:<input type="text" name="pageCount" value={formData.pageCount} onChange={handleChange}/></label>
            <label>Price:<input type="text" name="price" value={formData.price} onChange={handleChange}/></label>
            <button type="submit">Update Book</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditBookForm;