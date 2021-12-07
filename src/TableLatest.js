import React, { Component } from 'react';
import { Table, } from 'react-bootstrap';
import { GetLatest } from './Firebase.js';
import { Fruits, Locations } from './Data.js'

export class TableLatest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entries: []
        };
    }

    parseDbData(ds) {
        let entries = [];
        ds.forEach((subdata) => {
            let val = subdata.val();
            let o = { id: subdata.key };
            let f = Fruits.find((f) => f.id === val.fruit_id);
            if (f) {
                o.fruit = f.emoji + f.name;
            }
            else {
                o.fruit = "invalid (" + val.fruit_id + ")";
            }
            o.quartiers = val.quartiers;
            let date = new Date(val.date);
            let options = {
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            };
            o.date = date.toLocaleString(undefined, options);
            let db_origin = Locations.find((l) => l.id === val.origin);
            if (!db_origin)
                o.origin = val.origin;
            else
                o.origin = db_origin.flag + db_origin.name;

            entries.push(o);
        });
        entries.reverse();

        this.setState({ entries });
    }

    componentDidMount() {
        this.removeDbListener = GetLatest(parseInt(this.props.count), this.parseDbData.bind(this));
    }

    componentWillUnmount() {
        this.removeDbListener();
    }

    render() {
        const entries = this.state.entries;
        const itemList = entries.map((d) => (
            <tr key={d.id}>
                <td>{d.date}</td>
                <td>{d.fruit}</td>
                <td>{d.quartiers}</td>
            </tr>
        ));

        return (
            <>
                <h3>Derniers ajouts</h3>
                <Table striped responsive hover size="sm" >
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Fruit</th>
                            <th>Quartiers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemList}
                    </tbody>
                </Table >
            </>);
    }
}