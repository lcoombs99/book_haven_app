import classes from './AvailableBooks.module.css';
import Card from '../ui/Card.jsx';
import BookItem from './book-item/BookItem.jsx';
import { useEffect, useState } from 'react';

const AvailableBooks = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
      const fetchBooks = async () => {
        const response = await fetch(
          'https://book-haven-app-76046-default-rtdb.firebaseio.com/books.json');
        try {

          const responseData = await response.json();
          if (!response.ok) {
            throw new Error('Failed to load books. Please try again later.');
          }
          const loadedBooks = [];

          for (const key in responseData) {
            loadedBooks.push({
              id: key,
              name: responseData[key].name,
              description: responseData[key].description,
              price: responseData[key].price
            });
          }

          setBooks(loadedBooks);
          setIsLoading(false);

        } catch (error) {
          setIsLoading(false);
          setHttpError(error.message);
        }

      };

      fetchBooks();
    }, []);

    if (isLoading) {
      return (
        <section className={classes.BooksLoading}>
          <p>Loading books...</p>
        </section>
      );
    }

    if (httpError) {
      return (
        <section className={classes.BooksError}>
          <p>{httpError}</p>
        </section>
      );
    }

    const booksList = books.map((book) => (
      <BookItem
        id={book.id}
        key={book.id}
        name={book.name}
        description={book.description}
        price={book.price}
      />
    ));

    return (
      <section className={classes.books}>
        <Card>
          <ul>{booksList}</ul>
        </Card>
      </section>
    );
  }
;

export default AvailableBooks;