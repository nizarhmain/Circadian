import * as React from 'react'

import {  Button, Card, Progress } from 'antd';
import * as moment from 'moment'



interface IMyProps {
  id: any,
  name: any,
  now: any,
  startDate: any,
  deadline: any,
  _handleDelete(id: any): () => void;
}

export default class Task extends React.Component<IMyProps, {}> {



  constructor(props: IMyProps) {
    super(props)
  }

  started() {
    const startDate = new Date(this.props.startDate)
    return moment(startDate).fromNow();
  }

  finish() {
    const deadline = new Date(this.props.deadline)
    return moment(deadline).fromNow();
  }

  delete(id: number) {
    const url = '/api/tasks'
    const data = { id }

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

  /*
   In order to calculate the difference you have to put the + operator, that way typescript converts the dates to numbers.
  +new Date()- +new Date("2013-02-20T12:01:04.753Z")
    what the fuck
  */
  render() {
    const percentage = ((+new Date(this.props.now) - +new Date(this.props.startDate)))
    const completion = ((+new Date(this.props.deadline) - +new Date(this.props.startDate)))
    const finalMath = ((percentage) * 100) / completion
    const howFar = () => {
      if (percentage > 0) {
        return 'End ' + this.finish()
      } else {
        return 'starts ' + this.started()
      }
    }
    const time = howFar();
    return (
      <div style={{ padding: '30px' }}>
        <Card title={this.props.name} extra={
          <Button type="default" icon="close" onClick={this.delete.bind(this, this.props.id)} />
          }>
          Start : {moment(new Date(this.props.startDate)).calendar()} <br />
          Deadline : {moment(new Date(this.props.deadline)).calendar()} <br />
          <div> <Progress type="dashboard" percent={Math.trunc(finalMath)} /> <br /></div>
          {time}
        </Card>
      </div>
    )
  }
}
