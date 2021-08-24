
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
};

function sortAccountsByLastName(accounts) {
  return accounts.sort((lastNameA, lastNameB) => (lastNameA.name.last.toLowerCase() > lastNameB.name.last.toLowerCase() ? 1 : -1));
}; 

// this is a function that returns a number that represents the number of times the account's ID appears in any book's borrow array

// declare function & set accounts and books as it's parameters
function getTotalNumberOfBorrows(account, books) {
// create a variable for the id in account using destructuring
  const {
      id: accountId
  } = account;
// use the reduce method on books
  return books.reduce((accumulator, book) => {
// callback function
    return (
          accumulator +
          book.borrows
// use filter method to create a new array that only includes borrows that have the same id as the account id 
          .filter(borrow => borrow.id === accountId)
// use the reduce method to add 1 for each item in the filtered array?
          .reduce((accumulatorBorrows, borrow) => accumulatorBorrows + 1, 0)
      );
  }, 0);
}

/*
It returns an array of books and authors that represents all books
 _currently checked out_ by the given account. _Look carefully at
 the object below,_ as it's not just the book object; 
the author object is embedded inside of it.
*/
 
function getBooksPossessedByAccount(account, books, authors) {

  let checkedOut = [];

  books.forEach(book => {

          if (book.borrows.find(item => item.id === account.id && !item.returned))

                  checkedOut.push(book);
              
          })

      console.log(checkedOut); 
      checkedOut.forEach(book => {
          let theAuthor = authors.find(person => person.id === book.authorId);
          book['author'] = theAuthor;
      })

      console.log(checkedOut);
      return checkedOut;
  }

  

module.exports = {
findAccountById,
sortAccountsByLastName,
getTotalNumberOfBorrows,
getBooksPossessedByAccount,
};
