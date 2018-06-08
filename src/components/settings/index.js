import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import {connect} from "react-redux";
import {getDeviceOS} from "../settings/action";
import {getAllDevice} from "../../common/action";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {createMuiTheme} from "@material-ui/core/styles/index";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#9dc02a",
        }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },
});

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: '',
            value: 0,
            showCheckboxes: false,
        }
    }

    componentDidMount () {
        this.props.getDeviceOS();
        this.props.getAllDevice();
    }
    showAddComponent(componentTitle) {
        if (componentTitle === 'user') {
            this.setState({
                showComponent: 'user'
            });
        }
        if (componentTitle === 'device') {
            this.setState({
                showComponent: 'device'
            });
        }
        if (componentTitle === 'empty') {
            this.setState({
                showComponent: 'empty'
            });
        }
    }

    handleChange = (event, index, value) => this.setState({value});

    renderOsSelectedField = (array) => (array && array.map((el) => {
       return <MenuItem value={el.id}>{el.name}</MenuItem>
    }));

    changeDeviceTitle = (e) => {
        this.setState({deviceTitle: e.target.value});
    };

    changeDescription = (e) => {
        this.setState({description: e.target.value});
    };

    changeScreenResolution = (e) => {
        this.setState({screenResolution: e.target.value});
    };

    addDevice = () => {
        let device = {
            description: this.state.description,
            deviceOs: {
                _entityName: "testersjournal$OperationSystem",

                id: this.state.value,
            },
            name: this.state.deviceTitle,
            screenResolution: this.state.screenResolution,
            state: 'FREE'
        };
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/app/rest/v2/entities/testersjournal$Device', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
        //xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(device));

    };

    handleClick = (event, id) => {
      console.log('-----------', event, id);
    };

    renderDevicesTable = (array) => (array && array.map((el, key) => {

        console.log('takoe', array);
        console.log(el.deviceOs);
        return (<TableRow
            hover
            onClick={event => this.handleClick(event, el.id)}
            // role={"checkbox"}
            key={key}>
            <TableCell>{el.name}</TableCell>
            <TableCell>{el.deviceOs.name} {el.description}</TableCell>
            <TableCell>{el.screenResolution}</TableCell>
            <TableCell> {el.comment}</TableCell>
        </TableRow>)
    }));

    render() {
        const style = {
            margin: 12,
            backgroundColor: "#9dc02a"
        };
        const inputStyle = {
            color: "#9dc02a",
            borderColor: "#9dc02a"
        };
        const tableStyle = {
            backgroundColor: 'rgba(255,255,255,.8)'
        };
        return (
            <Grid className={'content-height'}>
                <Row>
                    <Col xs={4}>

                        <div><img className={'img-background'} src={'./../img/general-background.png'}/></div>
                        <div>
                            <MuiThemeProvider theme={theme}>
                                <Button variant="contained" color='primary' style={style}
                                        onClick={() => this.showAddComponent('device')}>Редактировать список устройств</Button>
                            </MuiThemeProvider>
                        </div>
                        <div>
                            <MuiThemeProvider theme={theme}>
                                <Button variant="contained" color='primary' style={style}
                                        onClick={() => this.showAddComponent('user')}>Добавить пользователя</Button>
                            </MuiThemeProvider>
                        </div>
                    </Col>
                    <Col xs={8}>
                        {(this.state.showComponent === 'user') ?
                            <div>
                                <MuiThemeProvider theme={theme}>
                                    <div>
                                        <TextField
                                            label="Имя"
                                            className={inputStyle}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            label="Фамилия"
                                            className={inputStyle}
                                        />
                                    </div>
                                    <FormControl>
                                    <InputLabel htmlFor="age-simple">Роль</InputLabel>
                                    <Select
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'age',
                                            id: 'age-simple',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Тестировщик</MenuItem>
                                        <MenuItem value={20}>Team Lead</MenuItem>
                                        <MenuItem value={30}>Admin</MenuItem>
                                    </Select>
                                    </FormControl>

                                    <div>
                                        <Button variant="contained" color='primary' style={style}
                                                onClick={() => this.showAddComponent('user')}>Добавить</Button>
                                        <Button variant="contained" color='primary' style={style}
                                                onClick={() => this.showAddComponent('empty')}>Отмена</Button>
                                    </div>
                                </MuiThemeProvider>
                            </div> : (this.state.showComponent === 'device') ?
                                <div>
                                    <MuiThemeProvider theme={theme}>
                                        <div>
                                            <TextField
                                                label="Название устройства"
                                                onChange={this.changeDeviceTitle}
                                            />
                                        </div>
                                        <FormControl>
                                            <InputLabel htmlFor="age-simple">Операционная система</InputLabel>
                                        <Select
                                            value={this.state.value}
                                            onChange={this.handleChange}
                                        >
                                            {console.log('++++++++++++++++++', this.props, this.state)}
                                            {this.renderOsSelectedField(this.props.deviceOS)}
                                        </Select>
                                        </FormControl>
                                        <div>
                                            <TextField
                                                label="Версия ОС"
                                                onChange={this.changeDescription}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                label="Разрешение экрана"
                                                onChange={this.changeScreenResolution}
                                            />
                                        </div>

                                        <div>

                                            <Button variant="contained" color='primary' style={style}
                                                    onClick={this.addDevice}>Добавить</Button>
                                            <Button variant="contained" color='primary' style={style}
                                                    onClick={() => this.showAddComponent('empty')}>Отмена</Button>
                                        </div>
                                    </MuiThemeProvider>
                                </div> : ''}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        {(this.state.showComponent === 'user') ?
                            <div>
                                <MuiThemeProvider theme={theme}>
                                    Список пользователей. Будет здесь, когда-нибудь, не знаю когда.
                                </MuiThemeProvider>
                            </div> : (this.state.showComponent === 'device') ?
                                <div>
                                    <MuiThemeProvider theme={theme}>
                                        <Table
                                            style={tableStyle}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Устройство</TableCell>
                                                    <TableCell>Версия ОС</TableCell>
                                                    <TableCell>Разрешение экрана</TableCell>
                                                    <TableCell>Комментарий</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {console.log('dasdsd', this.props)}
                                                { this.renderDevicesTable(this.props.devices)}
                                                <TableRow>
                                                    <TableCell>Sony Xperia ZR C5502</TableCell>
                                                    <TableCell>4.4.4</TableCell>
                                                    <TableCell>1280x720</TableCell>
                                                    <TableCell> </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </MuiThemeProvider>
                                </div> : ''}

                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    deviceOS: state.deviceOS,
    userInfo: state.userInfo,
    devices: state.common.devices
});

/*const mapDispatchToProps = (dispatch) => ({
    getUserCredential: () => getUserCredential(dispatch)

});*/
export default connect(mapStateToProps, {
    getDeviceOS,
    getAllDevice
})(Settings);
