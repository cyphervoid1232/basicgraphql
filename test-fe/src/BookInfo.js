import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import DeleteBook from './DeleteBook'
import EditBook from './EditBook'
import { DeleteBookMutation } from './DeleteBook'

 const BookInfo = ({enable, id, data}) => {
    if(enable) {
        console.log(data)
        
    }

    return <div></div>

}

export const findBook = gql`
query findBook($id:ID!){
    book(id:$id){
      id
      title
      price
      authors{
        id
        name
        age
      }
    }
  }
`


export default graphql(findBook)(BookInfo);