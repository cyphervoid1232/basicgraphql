import * as book from '../modal/bookModal'

export default {
    Query: {
        allBooks: () => book.list(),
        book: (_, data) => {
            return book.findBookByID(data.id)
        },
        author: (_, data) => {
            return book.findAuthorByID(data.id)
        },
        allAuthors: () => book.authorList()
    },
    Mutation: {
        createBook: (_, { input }) => {
            return book.createBook(input)
        },
        deleteBook: (_, { id }) => book.deleteBookByID(id),
        updateBook: (_, { input : {id, data} }) => {

           return book.updateBookByID(id,data)
        }
    }
    // Subscription: {
    //     commentAdd: {
    //         subscribe: () => pubsub.asyncIterator('commentAdded')
    //     }
    // }
}