import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { BookQuery } from './BookList'

class CreateBook extends React.Component {
    state = {
        title: "",
        price: 0
    }

    _handleSubmit = (e) => {

        e.preventDefault();
        this.props.mutate({
            variables: {
                input: this.state
            }
            ,
            optimisticResponse: {
                createBook: {
                    __typename: 'Book',
                    id: 9999,
                    ...this.state
                }
            }
        })
        .then((result) => {
            console.log(result)
            this.setState({
                title:'',
                price:0
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    _handleChange = (e) => {
        e.preventDefault()
        this.setState({[e.target.name] : e.target.value})

    }

    render() {
        return (
            <form >
                <input value={this.state.title} onChange={this._handleChange} type="text" name="title" />
                <input value={this.state.price} onChange={this._handleChange} type="number" name="price" />
                <button name="submit" onClick={this._handleSubmit}>Submit</button>
            </form>
        )
    }
}

const CreateBookMutation = gql`
    mutation CreateBooks($input:BookInput){
  createBook(input:$input){
    id
    title
    price
  }
}
`

export default graphql(CreateBookMutation, {
    options: props => ({
        update: (proxy, { data: { createBook } }) => {
            const data = proxy.readQuery({ query: BookQuery });
            data.allBooks.push(createBook)
            proxy.writeQuery({ query: BookQuery, data }); // ใช้ update ค่าใน cache เกี่ยวกับ store ของ graphql
        }
    })
})(CreateBook)