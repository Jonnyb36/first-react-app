import React, { PureComponent } from 'react'
import { Col, Row, Table } from 'reactstrap';
import Datasheet from 'react-datasheet';
import Select from 'react-select'
import _ from 'lodash'
//import child components
import HalfHourlySummaryChart from './chart';
import ForecastPriceSummary from './exampleDatatable';


const columnHeaders = [
    { label: 'HH', readOnly: true, value: 'HH', width: 50 },
    { label: 'Time', readOnly: true, value: 'Time', width: 100 },
    { label: 'Price', readOnly: true, value: 'Price', width: colWidth },
    { label: 'TRIAD', readOnly: true, value: 'TRIAD', width: colWidth },
    { label: 'TAG', readOnly: true, value: 'TAG', width: colWidth }
]

const colWidth = 100;
//should default to "None"
const triadTypes = [
    { label: "None", value: "None" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" }
];


const SheetRenderer = props => {
    const { as: Tag, headerAs: Header, bodyAs: Body, rowAs: Row, cellAs: Cell,
        className, columns, selections } = props
    return (
        <Table className={className}>
            <thead className='table-header'>
                {columns.map((column, index) => <Cell className='cell' style={{ width: column.width }} key={column.label}>{column.label}</Cell>)}
            </thead>
            <tbody className='data-body'>
                {props.children}
            </tbody>
        </Table>
    )
}

const RowRenderer = props => {
    const { as: Tag, cellAs: Cell, className, row, selected, onSelectChanged } = props
    return (
        //Data followed by checkbox
        <tr className={className}>
            {props.children}
            <input
                type='checkbox'
                checked={selected}
                onChange={e => onSelectChanged(row, e.target.checked)}
                style={{ width: colWidth, height: 15 }}
            />
        </tr>
    )
}

const CellRenderer = props => {
    const {
        as: Tag, cell, row, col, columns, attributesRenderer,
        selected, editing, updated, style,
        ...rest
    } = props

    // hey, how about some custom attributes on our cell?
    const attributes = cell.attributes || {}
    // ignore default style handed to us by the component and roll our own
    attributes.style = { width: columns[col].width }
    if (col === 0) {
        attributes.title = cell.label
    }

    return (
        <Tag {...rest} {...attributes}>
            {props.children}
        </Tag>
    )
}

export default class TableAndChartContainer extends React.Component {
    constructor(props) {
        super(props);
        this.sheetRenderer = this.sheetRenderer.bind(this)
        this.rowRenderer = this.rowRenderer.bind(this)
        this.cellRenderer = this.cellRenderer.bind(this)

        this.handleSelect = this.handleSelect.bind(this)
        this.handleSelectChanged = this.handleSelectChanged.bind(this)
        this.handleCellsChanged = this.handleCellsChanged.bind(this) //for all cell changes
        this.updateCellValue = this.updateCellValue.bind(this) //for cell dropdowns only

        this.triadWarningTypes = triadTypes;

        this.state = {
            grid: this.DummyDatagrid(),
            selections: Array(48).fill(false),
            columns: columnHeaders
        };

    }

    dropDownComponent = (row, col) => {
        return (
            <Select
                autofocus
                openOnFocus
                value={this.state && this.state.grid[row][col]}
                onChange={opt => this.updateCellValue(row, col, opt['value'])}
                options={this.triadWarningTypes}
            />
        )
    }

    DummyDatagrid() {
        let rows = []
        const productsList = [];

        productsList.push(47);
        productsList.push(48);
        for (let i = 1; i <= 46; i++) {
            productsList.push(i);
        }
        const arrayLength = productsList.length;

        for (let i = 0; i < arrayLength; i++) {
            let rowInfo = [];
            rowInfo.push(
                { value: productsList[i], readOnly: true },
                { value: "00:00:00" },
                { value: i * 10 },
                { value: "None", component: this.dropDownComponent(i, 3), cellType: "dropdown", dropdownSelected: false },
            );
            rows.push(rowInfo);
        }
        return rows;
    }

    sheetRenderer(props) {
        const { columns, selections } = this.state
        return <SheetRenderer columns={columns} selections={selections} as='table' headerAs='th' bodyAs='ul' rowAs='thead' cellAs='th' {...props} />
    }

    rowRenderer(props) {
        const { selections } = this.state
        return <RowRenderer as='td' cellAs='td' selected={selections[props.row]} onSelectChanged={this.handleSelectChanged} className='data-row' {...props} />
    }

    cellRenderer(props) {
        return <CellRenderer as='td' columns={this.state.columns} {...props} />
    }

    handleSelect(e) {
        this.setState({ as: e.target.value })
    }

    handleSelectChanged(index, selected) {
        const selections = [...this.state.selections]
        selections[index] = selected
        this.setState({ selections })
    }

    updateCellValue(row, col, value) {
        const grid = this.state.grid.map(row => [...row])
        if (grid[row] && grid[row][col]) {
            grid[row][col] = { ...grid[row][col], value }
            grid[row][col]['dropdownSelected'] = true //stop cell change back to "None"
        }
        this.setState({ grid })
    }

    handleCellsChanged(changes) {
        const grid = this.state.grid.map(row => [...row])
        changes.forEach(({ cell, row, col, value }) => {
            if (grid[row] && grid[row][col] && (cell.dropdownSelected == false)) {
                grid[row][col] = { ...grid[row][col], value }
            }
            cell.dropdownSelected = false //reset dropdown flag
        })
        this.setState({ grid })
    }

    render() {
        return (
            <Row>
                <Col sm='4'>
                    <ForecastPriceSummary
                        data={this.state.grid}
                        columns={this.state.columns}
                        selections={this.state.selections}
                        className='custom-sheet'
                        sheetRenderer={this.sheetRenderer}
                        headerRenderer={this.headerRenderer}
                        bodyRenderer={this.bodyRenderer}
                        rowRenderer={this.rowRenderer}
                        cellRenderer={this.cellRenderer}
                        onCellsChanged={this.handleCellsChanged}
                        valueRenderer={(cell) => cell.value}
                    />
                </Col>
                <Col sm='8'>
                    <HalfHourlySummaryChart
                        data={this.state.grid}
                        columns={this.state.columns}
                        selections={this.state.selections}
                    />
                </Col>
            </Row>
        );
    }
}

