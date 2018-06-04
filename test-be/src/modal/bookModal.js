var books = [
    { id: "1", title: "Hello Kitty", price: 400, authors: [{ id: '2' }] },
    { id: "2", title: "GG WP", price: 350, authors: [{ id: '1' }, { id: '2' }] }

]

var authors = [
    {
        id: '1', name: "Han", age: 80, books: [
            { id: "2" }
        ]
    },
    {
        id: '2', name: "Glove", age: 14, books: [
            { id: "1" },
            { id: "2" }
        ]
    }
]

var composeFunction = function (collection1, collection2, s2, c) {
    // let arr = []
    // collection1.forEach((x) => {
    //     let arr1 = []       
    //     x[s2].forEach((s) =>{
    //         arr1.push(c(s.id))     
    //     })
    //     x[s2] = arr1
    //     arr.push(x)
    // })
    // console.log(arr)
    // return arr

    let arr1 = []
    collection1[s2].forEach((s) => {
        arr1.push(c(s.id))
    })
    collection1[s2] = arr1
    return collection2

}

export const list = () => {

    // return composeFunction(books,authors,'authors', findAuthorByID);
    return books
}

export const authorList = () => {
    // return composeFunction(authors,books,'books',findBookByID);
    return authors
}

export const findBookByID = (id) => {
    // console.log(id)
    return books.find((book) => {
        if (book.id === id) {

            // console.log(book)
            return composeFunction(book, authors, 'authors', findAuthor)
        }
    })
}

const findBook = (id) => {
    // console.log(id)
    return books.find((book) => {
        if (book.id === id) {

            // console.log(book)
            return book
        }
    })
}

export const findAuthorByID = (id) => {
    // console.log(id)
    return authors.find((author) => {
        // console.log(id)
        if (author.id === id) {
            return composeFunction(author, books, 'books', findBook)
        }
    })
}

const findAuthor = (id) => {
    // console.log(id)
    return authors.find((author) => {
        // console.log(id)
        if (author.id === id) {
            return author
        }
    })
}


var id = 3
export const createBook = book => {
    let newBook = { id: id++ + '', ...book }
    books.push(newBook)
    return newBook
}

export const deleteBookByID = id => {
    console.log(id)
    books = books.filter((book) => book.id !== id)
    console.log(books)
    return books
}

export const updateBookByID = (id, data) => {
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            books[i].title = data.title
            books[i].price = data.price
            console.log(books)
            return books[i]
        }
    }
}