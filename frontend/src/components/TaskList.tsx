import * as React from 'react'


import { Col, Row } from 'antd';

import OpenMenu from './OpenMenu'
import Task from './TaskItem'


interface IMyState {
    taskname?: string;
    top: number;
    left: number;
    tasks?: any;
    date: Date;
    displayMenu: string;
    endOpen: boolean;
}

// TODO add an actual button to add events, easier that
export default class TaskList extends React.Component<{}, IMyState> {

    timerID: any;
    state: IMyState = {
        taskname: "",
        top: 0,
        left: 0,
        tasks: [],
        date: new Date(),
        endOpen: false,
        displayMenu: "none"
    }

    constructor(props: any) {
        super(props)

        this.onClick = this.onClick.bind(this);
        this.fetchAll = this.fetchAll.bind(this)
        this._handleDelete = this._handleDelete.bind(this);
    }

    componentDidMount() {
        console.log(' I am an updated version ')
        this.fetchAll()
    }

    fetchAll(): any {
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

    _handleDelete(id: any): any {
        this.setState(prevState => ({
            tasks: prevState.tasks.filter((el: any) => el._id !== id)
        }));
    }

    onClick(e: any) {
        if (e.nativeEvent.button === 2) {
            if (this.state.displayMenu === "block") {
                this.setState({ endOpen: false, displayMenu: "none" })
            } else {
                this.setState({ displayMenu: "block" })
                this.setState({ top: e.nativeEvent.clientY })
                this.setState({ left: e.nativeEvent.clientX })
            }
        }
    }

    render() {
        return (
            <div style={{ background: '#EBEBEB', fontFamily: 'Monospace' }} onMouseDown={this.onClick}>
                <h3> {this.state.date.toLocaleString()} </h3>
                <div style={{ display: this.state.displayMenu, position: "absolute", top: this.state.top, left: this.state.left }}>
                    <OpenMenu
                        _fetchAll={this.fetchAll}
                    />
                </div>
                <Row gutter={16}>
                    {
                        this.state.tasks.map(
                            ((task: any) =>
                                <Col key={task._id} sm={{ span: 24 }} lg={{ span: 8 }}>
                                    <Task
                                        id={task._id}
                                        name={task.name}
                                        startDate={task.startDate}
                                        deadline={task.deadline}
                                        now={this.state.date.toISOString()}
                                        _handleDelete={this._handleDelete}
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
