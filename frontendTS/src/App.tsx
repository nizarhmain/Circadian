import * as React from 'react'
import './App.css';

import TaskList from './components/TaskList'

// TODO make a modal open on deletion

class App extends React.Component<{}, {}> {

  public render() {
    const preventDefault = (e:any) => { e.preventDefault() }
    return (
      <div className="App" onContextMenu={preventDefault}>
        <TaskList />
      </div>
    );
  }
}

export default App;
