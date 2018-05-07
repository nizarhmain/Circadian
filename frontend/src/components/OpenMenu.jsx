import React, { Component } from 'react'
import { Menu, Icon, Input, DatePicker, Button } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class OpenMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startValue: null,
            endValue: null    
        }
    }

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    onStartChange = (value) => {
        this.onChange('startValue', value);
    }

    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    addTask() {
        var url = '/api/tasks';
        var data = { name: this.state.taskname, startDate: this.state.startValue, deadline: this.state.endValue };

        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response) => {
            if (response.status === 200) {
                console.log(' successfully added')
                this.props._fetchAll()
            } else {
                console.log('couldnt add it for some reason')
            }
        })
    }

    onChangeTaskName = (e) => {
        this.setState({ taskname: e.target.value });
    }

    render() {
        let buttonAbility = (this.state.startValue !== null && this.state.endValue !== null && this.state.taskname !== "");
        const { startValue, endValue } = this.state;
        return (
            <div>
                <Menu
                    onClick={this.handleClick}
                    style={{
                        width: 500, display: this.state.displayMenu, position: "absolute",
                        top: this.state.top, left: this.state.left, zIndex: 1
                    }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Add a Task</span></span>}>
                        <MenuItemGroup key="g2">
                            <Menu.Item key="2">
                                <Input value={this.state.taskname}
                                    placeholder="task name"
                                    onChange={this.onChangeTaskName} />
                            </Menu.Item>
                            <Menu.Item key="3">
                                <div style={{ display: this.state.displayMenu }}>
                                    <DatePicker
                                        disabledDate={this.disabledStartDate}
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        value={startValue}
                                        placeholder="Start"
                                        onChange={this.onStartChange}
                                        onOpenChange={this.handleStartOpenChange}
                                    />
                                    <DatePicker
                                        disabledDate={this.disabledEndDate}
                                        showTime
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
                                    onClick={this.addTask.bind(this)}
                                    disabled={!buttonAbility}
                                >
                                    Primary
                                 </Button>
                            </Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
