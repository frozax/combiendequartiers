import React, { Component } from 'react';
import { Table, } from 'react-bootstrap';
import { GetCount } from './Firebase.js';
import { Fruits } from './Data.js'

export class TableCount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // {fruit_id: {total, t24, quartiers}}
            data: this._genEmptyData()
        };
    }

    componentDidMount() {
        this.removeDbListener = GetCount(this.parseDbData.bind(this));
    }

    componentWillUnmount() {
        this.removeDbListener();
    }

    _genEmptyData() {
        let data = {};
        Fruits.map( fruit => data[fruit.id] = {"total": 0, "t24": 0, "quartiers": 0});
        return data;
    }

    parseDbData(ds) {
        let now = new Date();
        let data = this._genEmptyData();
        ds.forEach((subdata) => {
            let val = subdata.val();
            data[val.fruit_id].total++;
            let date_diff = now - new Date(val.date);
            const hrs = 24;
            if(date_diff < (1000 * 60 * 60 * hrs))
                data[val.fruit_id].t24++;
            data[val.fruit_id].quartiers += val.quartiers;
        });
        this.setState({ data });
    }

    render() {
        const d = this.state.data;
        const itemList = Fruits.map( fruit => (
            <tr key={fruit.id}>
                <td>{fruit.emoji + fruit.name}</td>
                <td>{d[fruit.id].total}</td>
                <td>{d[fruit.id].total > 0 ? (d[fruit.id].quartiers / d[fruit.id].total).toFixed(1) : "-"}</td>
                <td>{d[fruit.id].t24}</td>
            </tr>
        ));

        return (
            <>
                <h3>Fruits dans la base</h3>
                <Table striped responsive hover size = "sm" >
                    <thead>
                        <tr>
                            <th>Fruit</th>
                            <th>Total</th>
                            <th>Quartiers</th>
                            <th>24h</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemList}
                    </tbody>
                </Table>
            </>);
    }
}