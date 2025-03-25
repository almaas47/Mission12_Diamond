import { useState } from "react";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import WelcomeBook from "../components/WelcomeBook";
import CartSummary from "../components/CartSummary";

function BooksPage () {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <div className='container'>
          <CartSummary />
        <WelcomeBook />
      <div className='row'>
          <div className='col-md-3'>
            <CategoryFilter 
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              />
          </div>
          <div className='col-md-9'>
            <BookList selectedCategories={selectedCategories}/>
          </div>
      </div>
    </div>
    );
}

export default BooksPage;