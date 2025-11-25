import React from 'react';
//import Plot from 'react-plotly.js';
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import Select from 'react-select'
import { Fruits } from './Data'
import { GetRepartition } from './Firebase.js';
const Plot = createPlotlyComponent(Plotly);

export class ChartQuartiers extends React.Component {

    constructor(props) {
        super(props);
        this.fruits_select = Fruits.map((fruit) => (
            { value: fruit.id, label: fruit.name + " " + fruit.emoji }
        ));
        this.fruit_to_idx = {}
        for(let i = 0; i < this.fruits_select.length; i++) {
            this.fruit_to_idx[this.fruits_select[i].value] = i;
        }
        this.state = {}
    }

    callDb() {
        if(this.removeDbListener)
            this.removeDbListener();
        this.removeDbListener = GetRepartition(this.state.fruit_id, this.parseDbData.bind(this));
    }

    componentDidMount() {
        this.setFruit("cle");
    }

    componentWillUnmount() {
        if(this.removeDbListener)
            this.removeDbListener();
    }

    parseDbData(ds) {
        let map = {}
        ds.forEach((subdata) => {
            let val = subdata.val();
            let q = val.quartiers;
            if (!(q in map))
                map[q] = 1;
            else
                map[q]++;
        });
        // find min / max
        let min = Math.min(...Object.keys(map));
        let max = Math.max(...Object.keys(map));
        let data_x = [];
        let data_y = [];
        for (let x = min; x <= max; x++) {
            data_x.push(x);
            if (x in map)
                data_y.push(map[x]);
            else
                data_y.push(0);
        }
        this.setState({data: [data_x, data_y]});
    }

    setFruit(fruit_id) {
        if(this.state.fruit_id !== fruit_id) {
            this.setState({fruit_id: fruit_id, data: undefined});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.data === undefined) {
            this.callDb();
        }
    }

    render() {
        var f = Fruits.find(f => f.id === this.state.fruit_id);
        if(f === undefined || this.state.data === undefined) {
            return (<></>)
        }
        let data_x = this.state.data[0];
        let data_y = this.state.data[1];

        const styles = {
            menu: (base) => ({
                ...base,
                minWidth: "100%",
            })
        };

        let select = (<Select aria-label="Floating label select example"
            required
            isSearchable={false}
            name="fruit_id"
            styles={styles}
            options={this.fruits_select}
            onChange={(e) => { this.setFruit(e.value); }}
            defaultValue={this.fruits_select[this.fruit_to_idx[this.state.fruit_id]]}
            />)

        return (
            <>
                <h3 className="center">Répartition de quartiers</h3>
                {select}
                <Plot className="center"
                    data={
                        [
                            { type: 'bar', x: data_x, y: data_y,
                                marker: {
                                    color: 'rgba(222,45,38,0.8)' 
                                }
                            }
                        ]}
                    layout={{
                        width: 350,
                        height: 350,
                        margin: {r:0, t:0},
                        xaxis: {
                            dtick: 1,
                            title: "quartiers"
                        },
                        yaxis: {
                            title: "fruits",
                            tickmode: "auto"
                        }
                    }}
                    useResizeHandler={true}
                    config={{
                        'displayModeBar': false
                    }}
                    style={{ width: "100%", height: "100%" }}
                />
            </>
        );
    }
}
