import * as React from 'react'

import { Button, Card, Icon } from 'antd';

interface IMyState {
    iconLoading: boolean,
    duration: any
}

interface IProps {
    type: string
}

export default class Activity extends React.Component<IProps, IMyState> {

    state: IMyState = {
        iconLoading: false,
        duration: 0
    }

    toggleLoading = () => {
        const loading = this.state.iconLoading;

        const url = '/api/stats';
        const data = {
            type: this.props.type,
            duration: +new Date(Date.now()) - this.state.duration,
            date: new Date(Date.now())
        };
        if (loading) {
            // post request here
            fetch(url, {
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                method: 'POST', // or 'PUT'
            }).then((response) => {
                if (response.status === 200) {
                    console.log(' successfully added')
                } else {
                    console.log('couldnt add it for some reason')
                }
                // then put it back to normal
                this.setState({ duration: 0 })
            })

        }
        if (!loading) {
            const now = new Date(Date.now())
            this.setState({ duration: now })
        }
        this.setState({ iconLoading: !this.state.iconLoading });
    }

    renderButtons(activity: string) {
        const loading = this.state.iconLoading;
        if (!loading) {
            return (
                <Button type="primary" onClick={this.toggleLoading} >
                    Start {" " + activity + " !"}
                </Button>
            )
        } else {
            return ""
        }
    }

    renderExitButton() {
        const loading = this.state.iconLoading;
        if (loading) {
            return (
                <div>
                    <Button type="danger" onClick={this.toggleLoading}>Stop</Button>
                    <Icon type="loading" style={{ marginLeft: "20px" }} />
                </div>
            )
        } else {
            return ""
        }
    }


    render() {
        return (
            <div style={{ margin: "20px" }}>
                <Card title={this.props.type} hoverable={true}>
                    {this.renderButtons(this.props.type)}
                    {this.renderExitButton()}
                </Card>
            </div>
        )
    }
}
