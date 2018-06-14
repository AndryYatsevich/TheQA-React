import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import { MuiThemeProvider} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {changeStatusToWork} from './action';
import {actionGetAllDevice} from "../../common/action";
import Button from '@material-ui/core/Button';
import {createMuiTheme} from "@material-ui/core/styles/index";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#9dc02a",
        }, // Purple and green play nicely together.
        secondary: { main: '#e50909' }, // This is just green.A700 as hex.
    },
});

class Journal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCheckboxes: false,
            authorization: true};
    }

    componentDidMount() {
        console.log('componenDidMount');
        if (localStorage.getItem('token')){
            this.props.actionGetAllDevice();
        } else {
            this.setState({authorization: false})
        }
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
            return <Button variant="contained" color='primary' onClick={() => this.takeToWork(el)}>Взять в работу</Button>
        }
        if(el.state === 'TAKEN') {
            return <Button variant="contained" color='secondary' onClick={() => this.returnDevice(el)}>Сдать</Button>
        }
        if (el.state === 'WAIT') {
            setTimeout(() => {
               return this.acceptAdmin(el);
            },10000);
            return <div>Ожидает подтверждения администратора</div>
        }

    };
    sortArray = (obj1, obj2) => {
        if (obj1.createTs < obj2.createTs) return 1;
        if (obj1.createTs > obj2.createTs) return -1;
    };
    renderDevicesTable = (array) => (array && array.sort(this.sortArray).map((el) => {

        console.log('takoe', array);
        console.log(el.deviceOs);
        return <TableRow
            hoverable={true}

        key={el.id}>
            <TableCell>{el.name}</TableCell>
            <TableCell>{el.deviceOs.name} {el.description}</TableCell>
            <TableCell>{el.screenResolution}</TableCell>
            <TableCell>{this.renderDeviceButton(el)} </TableCell>
            <TableCell> { el.state === 'TAKEN' ? <div>{el.userName}</div> : ''} </TableCell>
            <TableCell> </TableCell>
            <TableCell> </TableCell>
            <TableCell> {el.comment}</TableCell>
        </TableRow>
    }));

    render() {
        const tableStyle = {
            backgroundColor: 'rgba(255,255,255,.8)'
        };
        return (
            <Grid fluid>
                <MuiThemeProvider theme={theme}>
                <Row>
                    <Col xs={12}>

                            <div><img className={'img-background'} src={'./../img/general-background.png'}/></div>
                        {(!this.state.authorization) ? <div>Авторизуйтесь в системе.</div> :
                            <Table
                                style={tableStyle}>
                                <TableHead
                                    displaySelectAll={this.state.showCheckboxes}
                                    adjustForCheckbox={this.state.showCheckboxes}>
                                    <TableRow>
                                        <TableCell>Устройство</TableCell>
                                        <TableCell>Версия ОС</TableCell>
                                        <TableCell>Разрешение экрана</TableCell>
                                        <TableCell>Статус</TableCell>
                                        <TableCell>Взял в работу</TableCell>
                                        <TableCell>Дата/Время</TableCell>
                                        <TableCell> </TableCell>
                                        <TableCell>Комментарий</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody
                                    displayRowCheckbox={this.state.showCheckboxes}

                                >
                                    {console.log('dasdsd', this.props)}
                                    { this.renderDevicesTable(this.props.devices)}
                                    <TableRow
                                        hoverable={true}>
                                        <TableCell>Sony Xperia ZR C5502</TableCell>
                                        <TableCell>4.4.4</TableCell>
                                        <TableCell>1280x720</TableCell>
                                        <TableCell> </TableCell>
                                        <TableCell> </TableCell>
                                        <TableCell> </TableCell>
                                        <TableCell> </TableCell>
                                        <TableCell> </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        }

                    </Col>
                </Row>
                </MuiThemeProvider>
            </Grid>


        );
    }
}

const mapStateToProps = (state) => ({
  devices: state.common.devices

});

/*const mapDispatchToProps = (dispatch) => ({
    devices: () => dispatch(getAllDevices)

});*/
export default connect(mapStateToProps, {
    actionGetAllDevice,
    changeStatusToWork
}) (Journal);