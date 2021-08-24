function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

/*
This function returns a number that represents the number of 
books _that are currently checked out of the library._ 
This number can be found by looking at the first transaction 
in the `borrows` key of each book. If the transaction 
says the book has not been returned (i.e. `returned: 
false`), the book has been borrowed.
*/

function getBooksBorrowedCount(books) {
let borrowedBooks = 0;

books.forEach(book => {
  if (!book.borrows[0].returned) borrowedBooks++;
});
return borrowedBooks;
}



/*
This function returns an array containing five objects 
or fewer that represents the most common occurring genres, 
ordered from most common to least.

Each object in the returned array has two keys:
- The `name` key which represents the name of the 
genre.
- The `count` key which represents the number of times
 the genre occurs.

If more than five genres are present, only the top 
five should be returned.
*/

function getMostCommonGenres(books) {
// create a const variable for books that maps the books genre
  const genresOfBooks = books.map((book) => book.genre);
// create an empty array to return at end of function
  const fiveCommonGenres = [];
//map over book genres from the previously create variable
genresOfBooks.map((genre) => {
// create a const variable that check for each genre, to see if genre already exists in array
    const location = fiveCommonGenres.findIndex((element) => element.name === genre);
//second, if it exists and is greater than 0, increase count by 1
    if (location >= 0) {
      fiveCommonGenres[location].count = fiveCommonGenres[location].count + 1;
//else, push a new genre object onto array with count of 1
    } else {
      fiveCommonGenres.push({ name: genre, count: 1 });
    }
  });
  fiveCommonGenres.sort((a, b) => b.count - a.count);
  if (fiveCommonGenres.length > 5) {
    return fiveCommonGenres.slice(0, 5);
  }
  return fiveCommonGenres;
}


/*
The `getMostPopularBooks()` function in `public/src/home.js`
has a single parameter:
- An array of books.
It returns an array containing five objects or fewer that 
represents the most popular books in the library. Popularity 
is represented by the number of times a book has been borrowed.

Each object in the returned array has two keys:
- The `name` key which represents the title of the book.
- The `count` key which represents the number of times
the book has been borrowed.

If more than five books are present, only the top five 
should be returned.
*/


function getMostPopularBooks(books) {
  // set an empty array for the most popular books
  const mostPopularBooks = [];
  // use the forEach() method on the books array 
  books.forEach(book => {
 // create an object that contains the book title and it's number of borrows
      let bookObj = {
          bookTitle: book.title,
          bookBorrows: book.borrows.length,
      };
// push that object onto the array
      mostPopularBooks.push(bookObj);
  });

  mostPopularBooks.sort((bookA, bookB) => (bookA.borrows.length > bookB.borrows.length ? 1 : -1));
  return mostPopularBooks.slice(0, 5);
}




function getMostPopularBooks(books) {
  let popularBooks = [];

  const borrows = books.reduce((acc, book) => {
    popularBooks.push({ name: book.title, count: book.borrows.length });
  }, []);

  return topFive(popularBooks);
}

function topFive(array) {
  let popularBooks = array
    .sort((countA, countB) => (countA.count < countB.count ? 1 : -1))
    .slice(0, 5);

  return popularBooks;
}





function getMostPopularAuthors(books, authors) {
  const popularAuthors = [];

  for (let author of authors) {
    const authorName = `${author.name.first} ${author.name.last}`;
    let count = 0;
    for (let book of books) {
      if (author.id === book.authorId) {
        count += book.borrows.length;
      }
    }
    const authorObject = { name: authorName, count: count };
    popularAuthors.push(authorObject);
  }

  return topFive(popularAuthors);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};