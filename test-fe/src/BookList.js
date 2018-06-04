import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import DeleteBook from './DeleteBook'
import EditBook from './EditBook'
import { DeleteBookMutation } from './DeleteBook'
import BookInfo  from './BookInfo';


const Book = ({ book: { id, title, price, authros }, mutate, enable, handleClick }) => (
    <div>
        {id} {title} {price} <BookInfo enable={enable} id={id} /><button onClick={() => {
            mutate({
                variables: {
                    id
                }
            })
                .then((result) => {
                    console.log(result)
                }).catch((err) => {
                    console.log(err)
                })
        }} >Xin</button> <DeleteBook id={id} />
        {/* <EditBook profile={book} /> */}
        <button onClick={handleClick}>Info</button>
    </div>
)

// const BookList = ({ data: { loading, allBooks, networkStatus }, mutate }) => {
//     if (loading) return <div>Loading...</div>
//     console.log(allBooks)
//     return allBooks.map((book) => <Book onClick={() => {

//     }} book={book} mutate={mutate} />)
// }

class BookList extends React.Component {
    // constructor(props){
    //     super(props)
    //     console.log(this.props)
    // }

    toggle = true

    handleClick = () => {
        console.log("hello")
        this.toggle = !this.toggle
        console.log('g')
    }

    render() {
        let { loading, allBooks } = this.props.data
        let mutate = this.props.mutate
        return (
            <div>
                {
                    loading ? <div>Loading...</div> :
                        allBooks.map((book) =>
                            <Book handleClick={this.handleClick} enable={this.toggle} book={book} mutate={mutate} />
                        )
                }
            </div>
        )
    }
}


export const BookQuery = gql`
    query{
        allBooks{
            id
            title
            price
        }
    }
`

export default compose(graphql(BookQuery, {
    skip: props => {
        console.log(props)
        console.log(BookList)
        return false
    }
}), graphql(DeleteBookMutation, {
    options: props => ({
        update: (proxy, { data: { deleteBook } }) => {
            const data = proxy.readQuery({ query: BookQuery });

            data['allBooks'] = deleteBook
            proxy.writeQuery({ query: BookQuery, data }); // ใช้ update ค่าใน chche เกี่ยวกับ store ของ graphql
        }
    })
}))(BookList);