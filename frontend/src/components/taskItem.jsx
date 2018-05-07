import React, { Component } from 'react'
import { Card, Button, Progress  } from 'antd';


export default class Task extends Component {


  constructor(props) {
    super(props)
    this.state = {}
  }

  when() {
    let deadline = new Date(this.props.deadline)
    let now = new Date(this.props.now)
    if (deadline > now) {
      return {
        months: Math.abs((deadline.getMonth() +1 ) - (now.getMonth() +1)) + ' months left ',
        days: Math.abs(deadline.getDate() - now.getDate()) + ' days left ',
        hours: Math.abs(deadline.getHours() - now.getHours()) + ' hours left ',
        minutes: Math.abs(deadline.getMinutes() - now.getMinutes()) + ' minutes left '
      }
    } else {
      return {
        months: Math.abs((deadline.getMonth() +1 )  - (now.getMonth() +1)) + ' months ago ',
        days: Math.abs(deadline.getDate() - now.getDate()) + ' days ago ',
        hours: Math.abs(deadline.getHours() - now.getHours()) + ' hours ago ',
        minutes: Math.abs(deadline.getMinutes() - now.getMinutes()) + ' minutes ago '
      }
    }
  }

  parseTime() {
    if(this.when().months !== '0 months ago ' && this.when().months !== '0 months left ' ) {
      return this.when().months    
    } else if (this.when().days !== '0 days ago ' && this.when().days !== '0 days left ') {
      return this.when().days
    } else if (this.when().hours !== '0 hours ago ' && this.when().hours !== '0 hours left ') {
      return this.when().hours
    } else if (this.when().minutes !== '0 minutes ago ' && this.when().minutes !== '0 minutes left ') {
      return this.when().minutes
    }
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
    let typeOfDate = this.parseTime().split(" ")[1]
    let percentage = ((new Date(this.props.now) - new Date(this.props.startDate)))
    let completion = ((new Date(this.props.deadline) - new Date(this.props.startDate)))
    let finalMath = ((percentage) * 100) / completion
    return (
      <div style={{ padding: '30px' }}>
        <Card title={this.props.name} extra={
          <Button type="default" icon="close" onClick={(e) => this.delete(this.props.id)}>
          </Button>}>
          Starts the : {new Date(this.props.startDate).toLocaleString()} <br />
          Deadline : {new Date(this.props.deadline).toLocaleString()} <br />
          { typeOfDate === "days" ? <div> <Progress type="dashboard" percent={Math.trunc(finalMath)} /> <br /></div>: "" }
          { typeOfDate === "hours" ? <div> <Progress type="dashboard" percent={Math.trunc(finalMath)} /> <br /></div>: "" }
          { typeOfDate === "minutes" ? <div> <Progress type="dashboard" percent={Math.trunc(finalMath)} /> <br /></div>: "" }
          {this.parseTime()}
        </Card>
      </div>
    )
  }
}
