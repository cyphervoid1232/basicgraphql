export default  `
    type Query{
        allBooks: [Book]
        book(id: ID!) : Book
        author(id: ID!) : Author
        allAuthors: [Author]
    }

    type Mutation{
        createBook(input : BookInput) : Book
        deleteBook(id: ID) : [Book]
        updateBook(input : BookUpdate) : Book
    }

    type Subscription{
        commentAdded(repoFullName: String): Book
    }

    type Book{
        id: ID
        title: String
        price: Int
        authors: [Author]
    }

    input BookUpdate {
        id : ID
        data : BookInput
    }

    input BookInput{
        title:String
        price: Int
    }

    type Author{
        id: ID
        name: String
        age: Int
        books : [Book]
    }
`