import * as React from 'react'

import { Col, Row } from 'antd';

import Activity from './Activity';

interface IMyState {
    stats: any,
    types: string[]
}


export default class ActivityManager extends React.Component<{}, IMyState> {

    state: IMyState = {
        stats: [],
        types: [],
    }

    componentDidMount() {
        this.fetchAllStats()
    }

    fetchAllStats(): void {
        fetch('/api/stats').then(r => r.json())
            .then(stats => this.setState({ stats: stats.stats, types: stats.types }))
            .catch(e => console.log(e))
    }



    render() {
        return (
            <Row gutter={8}>
                {
                    this.state.types.map((element: string) =>
                        <Col key={element+1} sm={{ span: 8 }} lg={{ span: 4 }}>
                            <Activity type={element} />
                        </Col>
                    )
                }
            </Row>
        )
    }
}
