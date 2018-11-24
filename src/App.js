import React from 'react';
import Game from './components/game/game';
//import ForecastPriceSummary from './components/exampleDatatable'
//import HalfHourlySummaryChart from './components/chart'
import TableAndChartContainer from './components/datatableAndChart'
import { Row, Col } from 'reactstrap'
import FormButton from './components/formButton'
import EditableFormButton from './components/promptPopUp'
import ButtonTipExample from './components/buttonTips'
// ========================================

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs='6'>
            <FormButton/>
          </Col>
          <Col xs='6'>
            <EditableFormButton/>
          </Col>
          <Col xs='6'>
            <ButtonTipExample/>
          </Col>
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


