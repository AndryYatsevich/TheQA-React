import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from 'react-redux';
import {getAllDevices, changeStatusToWork} from './action';
import RaisedButton from 'material-ui/RaisedButton';

class Journal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCheckboxes: false};
    }

    componentDidMount() {
        console.log('componenDidMount');
        this.props.getAllDevices();

    }

    takeToWork = (el) => {
        el.status = 1;
      console.log('взял в работу', el);
      let devices = this.props.devices.concat();
      for (let i = 0; i < devices.length; i++){
          if(el.id === devices[i].id) {
              console.log('el: ', el, 'device[i]: ', devices[i]);
              devices[i] = el;
          }
      }
      console.log(devices);
      this.props.changeStatusToWork(devices);
    };

    returnDevice =(el) => {
        el.status = 2;
      console.log(el, 'вернул');
        let devices = this.props.devices.concat();
        for (let i = 0; i < devices.length; i++){
            if(el.id === devices[i].id) {
                console.log('el: ', el, 'device[i]: ', devices[i]);
                devices[i] = el;
            }
        }
        console.log(devices);
        this.props.changeStatusToWork(devices);
    };

    acceptAdmin =(el) => {
        console.log(el);
        el.status = 0;
        console.log(el, 'вернул');
        let devices = this.props.devices.concat();
        for (let i = 0; i < devices.length; i++){
            if(el.id === devices[i].id) {
                console.log('el: ', el, 'device[i]: ', devices[i]);
                devices[i] = el;
            }
        }
        console.log(devices);
        this.props.changeStatusToWork(devices);
    };

    renderDeviceButton = (el) => {
        if (el.state === 'FREE') {
            return <RaisedButton label="Взять в работу" backgroundColor={"#9dc02a"} onClick={() => this.takeToWork(el)}/>
        }
        if(el.state === 'TAKEN') {
            return <RaisedButton label="Сдать" backgroundColor={"red"} onClick={() => this.returnDevice(el)}/>
        }
        if (el.state === 'WAIT') {
            setTimeout(() => {
               return this.acceptAdmin(el);
            },10000);
            return <div>Ожидает подтверждения администратора</div>
        }

    };

    renderDevicesTable = (array) => (array && array.map((el) => {

        console.log('takoe', array);
        return <TableRow
            hoverable={true}

        key={el.id}>
            <TableRowColumn>{el.name}</TableRowColumn>
            <TableRowColumn>{el.os}{el.description}</TableRowColumn>
            <TableRowColumn>{el.screenResolution}</TableRowColumn>
            <TableRowColumn>{this.renderDeviceButton(el)} </TableRowColumn>
            <TableRowColumn> { el.state === 'TAKEN' ? <div>{el.userName}</div> : ''} </TableRowColumn>
            <TableRowColumn> </TableRowColumn>
            <TableRowColumn> </TableRowColumn>
            <TableRowColumn> {el.comment}</TableRowColumn>
        </TableRow>
    }));

    render() {
        const tableStyle = {
            backgroundColor: 'rgba(255,255,255,.8)'
        };
        return (
            <Grid fluid>
                <MuiThemeProvider>
                <Row>
                    <Col xs={12}>

                            <div><img className={'img-background'} src={'./../img/general-background.png'}/></div>
                            <Table
                                style={tableStyle}>
                                <TableHeader
                                    displaySelectAll={this.state.showCheckboxes}
                                    adjustForCheckbox={this.state.showCheckboxes}>
                                    <TableRow>
                                        <TableHeaderColumn>Устройство</TableHeaderColumn>
                                        <TableHeaderColumn>Версия ОС</TableHeaderColumn>
                                        <TableHeaderColumn>Разрешение экрана</TableHeaderColumn>
                                        <TableHeaderColumn>Статус</TableHeaderColumn>
                                        <TableHeaderColumn>Взял в работу</TableHeaderColumn>
                                        <TableHeaderColumn>Дата/Время</TableHeaderColumn>
                                        <TableHeaderColumn> </TableHeaderColumn>
                                        <TableHeaderColumn>Комментарий</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                    displayRowCheckbox={this.state.showCheckboxes}

                                >
                                    {console.log('dasdsd', this.props)}
                                    { this.renderDevicesTable(this.props.devices)}
                                    <TableRow
                                        hoverable={true}>
                                        <TableRowColumn>Sony Xperia ZR C5502</TableRowColumn>
                                        <TableRowColumn>4.4.4</TableRowColumn>
                                        <TableRowColumn>1280x720</TableRowColumn>
                                        <TableRowColumn> </TableRowColumn>
                                        <TableRowColumn> </TableRowColumn>
                                        <TableRowColumn> </TableRowColumn>
                                        <TableRowColumn> </TableRowColumn>
                                        <TableRowColumn> </TableRowColumn>
                                    </TableRow>
                                </TableBody>
                            </Table>

                    </Col>
                </Row>
                </MuiThemeProvider>
            </Grid>


        );
    }
}

const mapStateToProps = (state) => ({
  devices: state.devices
});

/*const mapDispatchToProps = (dispatch) => ({
    devices: () => dispatch(getAllDevices)

});*/
export default connect(mapStateToProps, {
    getAllDevices,
    changeStatusToWork
}) (Journal);