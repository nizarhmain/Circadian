import React, { Component } from 'react'
import { Card, Button, Progress  } from 'antd';
import moment from 'moment'

export default class Task extends Component {


  constructor(props) {
    super(props)
    this.state = {}
    
  }

  started() {
    let startDate = new Date(this.props.startDate)
    let now = new Date(this.props.now)
    return moment(startDate).fromNow();
  }

  finish() {
    let deadline = new Date(this.props.deadline)
    let now = new Date(this.props.now)
    return moment(deadline).fromNow();  
  }

  delete(id) {
    var url = '/api/tasks'
    var data = { id: id }

    fetch(url, {
      method: 'DELETE', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then((response) => {
      if (response.status === 200) {
        console.log(' successfully deleted')
        this.props._handleDelete(id);
      } else {
        console.log('cant go there ')
      }
    })
  }

  render() {
    let percentage = ((new Date(this.props.now) - new Date(this.props.startDate)))
    let completion = ((new Date(this.props.deadline) - new Date(this.props.startDate)))
    let finalMath = ((percentage) * 100) / completion
    let howFar = () => {
      if(percentage > 0) {
        return 'End ' + this.finish()
      } else {
        return 'starts ' + this.started()
      }
    }
    let time = howFar();
    return (
      <div style={{ padding: '30px' }}>
        <Card title={this.props.name} extra={
          <Button type="default" icon="close" onClick={(e) => this.delete(this.props.id)}>
          </Button>}>
          Start : {moment(new Date(this.props.startDate)).calendar()} <br />
          Deadline : {moment(new Date(this.props.deadline)).calendar() } <br />
          <div> <Progress type="dashboard" percent={Math.trunc(finalMath)} /> <br /></div>
          { time }
        </Card>
      </div>
    )
  }
}
