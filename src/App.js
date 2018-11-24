import React from 'react';
import Game from './components/game/game';
//import ForecastPriceSummary from './components/exampleDatatable'
//import HalfHourlySummaryChart from './components/chart'
import TableAndChartContainer from './components/datatableAndChart'
import { Row, Col } from 'reactstrap'
import FormButton from './components/formButton'
// ========================================

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Row>
        <FormButton/>
        </Row>
        <Row>
          <Game />
        </Row>
        <Row>
          <Col>
            <TableAndChartContainer />
          </Col>
        </Row>
      </div>
    )
  }
}


