import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { BookQuery } from './BookList'


const DeleteBook = (props) => {
    const enable = () => {

        props.mutate({
            variables: {
                id: props.id
            }
        })
            .then((result) => {
                console.log(result)
            }).catch((err) => {
                console.log(err)
            })
    }

    return <button onClick={enable}>X</button>
}


export const DeleteBookMutation = gql`
    mutation DeleteBook($id:ID){
  deleteBook(id:$id){
    id
    title
  }
}
`

export default graphql(DeleteBookMutation, {
    options: props => ({
        update: (proxy, { data: { deleteBook } }) => {
            const data = proxy.readQuery({ query: BookQuery });

            data['allBooks'] = deleteBook
            proxy.writeQuery({ query: BookQuery, data }); // ใช้ update ค่าใน chche เกี่ยวกับ store ของ graphql
        }
    })
})(DeleteBook)