import * as React from 'react'

import { Button, DatePicker, Icon, Input, Menu } from 'antd';

interface IMyProps {
    _fetchAll(): () => any;
}

interface IMyState {
    displayMenu: string,
    taskname: string,
    top: string,
    left: string,
    startValue?: any,
    endValue?: any,
    endOpen: boolean
}

export default class OpenMenu extends React.Component<IMyProps, IMyState> {

    state: IMyState = {
        displayMenu: "block",
        taskname: "",
        top: "",
        left: "",
        startValue: null,
        endValue: null,
        endOpen: false
    }

    constructor(props: IMyProps) {
        super(props)
        // binds actually impact performance, didnt know that
        this.addTask = this.addTask.bind(this)
    }

    disabledStartDate = (startValue: any) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue: any) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onChange = (field: any, value: any) => {
        this.setState({
            [field]: value
        });
    }

    onStartChange = (value: any) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value: any) => {
        this.onChange('endValue', value);
    }

    handleStartOpenChange = (open: any) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open: any) => {
        this.setState({ endOpen: open });
    }

    addTask() {
        const url = '/api/tasks';
        const data = {
            name: this.state.taskname,
            startDate: this.state.startValue,
            deadline: this.state.endValue
        };

        fetch(url, {
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'POST', // or 'PUT'
        }).then((response) => {
            if (response.status === 200) {
                console.log(' successfully added')
                this.props._fetchAll()
            } else {
                console.log('couldnt add it for some reason')
            }
        })
    }

    onChangeTaskName = (e: any) => {
        this.setState({ taskname: e.target.value });
    }

    render() {
        const buttonAbility = (this.state.startValue !== null && this.state.endValue !== null && this.state.taskname !== "");
        const { startValue, endValue } = this.state;
        return (
            <div>
                <Menu
                    style={{
                        width: 500,
                        display: this.state.displayMenu,
                        position: "absolute",
                        top: this.state.top,
                        left: this.state.left,
                        zIndex: 1
                    }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    <Menu.SubMenu key="sub1" title={<span><Icon type="mail" /><span>Add a Task</span></span>}>
                        <Menu.ItemGroup key="g2">
                            <Menu.Item key="2">
                                <Input value={this.state.taskname}
                                    placeholder="task name"
                                    onChange={this.onChangeTaskName} />
                            </Menu.Item>
                            <Menu.Item key="3">
                                <div style={{ display: this.state.displayMenu }}>
                                    <DatePicker
                                        disabledDate={this.disabledStartDate}
                                        showTime={true}
                                        format="YYYY-MM-DD HH:mm:ss"
                                        value={startValue}
                                        placeholder="Start"
                                        onChange={this.onStartChange}
                                        onOpenChange={this.handleStartOpenChange}
                                    />
                                    <DatePicker
                                        disabledDate={this.disabledEndDate}
                                        showTime={true}
                                        format="YYYY-MM-DD HH:mm:ss"
                                        value={endValue}
                                        placeholder="End"
                                        onChange={this.onEndChange}
                                        onOpenChange={this.handleEndOpenChange}
                                    />
                                </div>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Button
                                    type="primary"
                                    onClick={this.addTask}
                                    disabled={!buttonAbility}
                                >
                                    Primary
                                 </Button>
                            </Menu.Item>
                        </Menu.ItemGroup>
                    </Menu.SubMenu>
                </Menu>
            </div>
        )
    }
}
