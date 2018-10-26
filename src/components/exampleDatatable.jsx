import React, { PureComponent } from 'react'
import Datasheet from 'react-datasheet';
//import styling
import '../../node_modules/react-datasheet/lib/react-datasheet.css';

export default class ForecastPriceSummary extends PureComponent {

    render() {
        return (
            <Datasheet
                data={this.props.data}
                className={this.props.className}
                sheetRenderer={this.props.sheetRenderer}
                rowRenderer={this.props.rowRenderer}
                cellRenderer={this.props.cellRenderer}
                onCellsChanged={this.props.onCellsChanged}
                valueRenderer={this.props.valueRenderer}
            />
        )
    }
}