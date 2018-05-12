import * as React from 'react'
import './App.css';


import ActivityManager from './components/ActivityManager'
import TaskList from './components/TaskList'

// TODO make a modal open on deletion

class App extends React.Component<{}, {}> {

  public render() {
    const preventDefault = (e:any) => { e.preventDefault() }
    return (
      <div className="App" onContextMenu={preventDefault}>
        <ActivityManager />
        <TaskList />
      </div>
    );
  }
}

export default App;
