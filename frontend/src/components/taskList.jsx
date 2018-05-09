import React, { Component } from 'react'
import Task from './taskItem.jsx'
import OpenMenu from './OpenMenu.jsx'
import { Col, Row } from 'antd';


export default class taskList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            taskname: "",
            top: 0,
            left: 0,
            tasks: [],
            date: new Date(),
            displayMenu: "none"

        }
    }

    componentDidMount() {
        this.fetchAll()
    }

    fetchAll() {
        fetch('/api/tasks').then(r => r.json())
            .then(data => this.setState({ tasks: data }))
            .catch(e => console.log("Booo"))

        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    _handleDelete(id) {
        this.setState(prevState => ({
            tasks: prevState.tasks.filter(el => el._id !== id)
        }));
    }

    onClick(e) {
            if (this.state.displayMenu === "block") {
                this.setState({ endOpen: false, displayMenu: "none" })
            } else {
                this.setState({ displayMenu: "block" })
                this.setState({ top: e.nativeEvent.clientY })
                this.setState({ left: e.nativeEvent.clientX })
            }
    }

    render() {
        return (
            <div style={{ background: '#EBEBEB', fontFamily: 'Monospace' }} onMouseDown={(e) => this.onClick(e)}>
                <h3> {this.state.date.toLocaleString()} </h3>
                <div style = {{ display: this.state.displayMenu, position: "absolute", top: this.state.top, left: this.state.left }}>
                    <OpenMenu
                        _fetchAll={this.fetchAll.bind(this)}
                    />
                </div>
                <Row gutter={16}>
                    {
                        this.state.tasks.map(
                            (task =>
                                <Col key={task._id} sm={{ span: 24 }} lg={{ span : 8}}>
                                    <Task
                                        id={task._id}
                                        name={task.name}
                                        startDate={task.startDate}
                                        deadline={task.deadline}
                                        now={this.state.date.toISOString()}
                                        _handleDelete={this._handleDelete.bind(this)}
                                    />
                                </Col>
                            )
                        )
                    }
                </Row>
            </div>
        )
    }
}
