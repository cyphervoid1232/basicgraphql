import React, { Component } from 'react';
import BookList from './BookList'
import CreateBook from './CreateBook'

class App extends Component {
  render() {
    return (
      <div >
        <CreateBook/>
        <BookList/>
      </div>
    );
  }
}

export default App;
