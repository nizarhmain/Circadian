import React, { Component } from 'react';
import './App.css';

import TaskList from './components/taskList.jsx'


class App extends Component {

  render() {
    const preventDefault = (e) => { e.preventDefault() }
    return (
      <div className="App" onContextMenu={preventDefault}>
        <TaskList />
      </div>
    );
  }
}

export default App;
