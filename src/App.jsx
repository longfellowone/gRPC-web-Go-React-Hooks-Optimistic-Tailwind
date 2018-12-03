import React, { Component } from 'react';
import Todo from './Todo/Todo';

class App extends Component {
  render() {
    return (
      <div className="container mx-auto p-4">
        <Todo />
      </div>
    );
  }
}
export default App;
