import React from 'react';
import Plot from 'react-plotly.js';

const HH = 10; //example HH
const strDate = '16/10/18';

//create a chart
export default class HalfHourlySummaryChart extends React.Component {
    render() {

        let colX = this.props.data.map(x => x[0]['value']);
        let colY = this.props.data.map(x => x[2]['value']);


        return (
            <Plot
                data={[
                    //historic price line
                    {
                        x: colX,
                        y: colY,
                        type: 'scatter',
                        mode: 'lines+points',
                        marker: { color: 'red' },
                        name: "Historic",
                    },
                    //forecast price line
                    {
                        type: 'scatter',
                        x: [10, 11, 12, 13, 14, 15],
                        y: [11, 11, 12, 12, 6, 10],
                        name: "Forecast"
                    },
                ]}
                layout={{
                    //width: 320,
                    //height: 240,
                    title: 'Price Forecast for hh' + HH + ' for ' + strDate,
                    xaxis: { title: 'Half Hour' },
                    yaxis: { title: 'Price £/MWh' },
                    //add a line to represent break between historic and forecast prices
                    shapes: [{
                        x0: HH,
                        x1: HH,
                        y0: 0,
                        y1: 1,
                        xref: 'x',
                        yref: 'paper',
                        line: { color: 'black', width: 1, dash: 'longdash' }
                    },
                    //historic shaded region
                    {
                        type: 'rect',
                        xref: 'x',
                        yref: 'paper',
                        x0: 1,
                        y0: 0,
                        x1: HH,
                        y1: 1,
                        fillcolor: '#d3d3d3',
                        opacity: 0.2,
                        line: {
                            width: 0
                        }
                    }]
                }}
            />
        );
    }
}
