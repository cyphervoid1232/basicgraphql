import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { BookQuery } from './BookList'

class EditBook extends React.Component {

    id = this.props.profile.id
    data = {
        title:this.props.profile.title,
        price:this.props.profile.price
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        this.props.mutate({
            variables: {
                input: {
                    id : this.id,
                    data: this.data
                }
            }
        }).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        })
    }

    _handleChange = (e) => {
        e.preventDefault()
        this.data[e.target.name] = e.target.value

    }
    render() {
        return (
            <div>
                <form>
                    <input onChange={this._handleChange} defaultValue={this.props.profile.title} type="text" name="title" />
                    <input onChange={this._handleChange} defaultValue={this.props.profile.price} type="number" name="price" />
                    <button name="submit" onClick={this._handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

const EditBookMutation = gql`
    mutation EditBook($input:BookUpdate){
  updateBook(input:$input){
    title
    id
    price
  }
}
`
export default graphql(EditBookMutation, {
    options: props => ({
        update: (proxy, { data: { updateBook } }) => {
            const data = proxy.readQuery({ query: BookQuery });

            for(let i = 0; i < data.allBooks.length; i++){
                if(data.allBooks[i].id === updateBook.id){
                    data.allBooks[i] = updateBook
                    break;
                }
            }
            proxy.writeQuery({ query: BookQuery, data }); // ใช้ update ค่าใน chche เกี่ยวกับ store ของ graphql
        }
    })
})(EditBook)