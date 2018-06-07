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
       return <List value={el.id} primaryText={el.name}/>
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
                            <MuiThemeProvider>
                                <Button label="Редактировать список устройств" style={style} backgroundColor={'#9dc02a'}
                                              onClick={() => this.showAddComponent('device')}/>
                            </MuiThemeProvider>
                        </div>
                        <div>
                            <MuiThemeProvider>
                                <Button label="Добавить пользователя" style={style} backgroundColor={'#9dc02a'}
                                              onClick={() => this.showAddComponent('user')}/>
                            </MuiThemeProvider>
                        </div>
                    </Col>
                    <Col xs={8}>
                        {(this.state.showComponent === 'user') ?
                            <div>
                                <MuiThemeProvider>
                                    <div>
                                        <TextField
                                            hintText="Имя"
                                            floatingLabelText="Введите имя"
                                            hintStyle={inputStyle}
                                            underlineFocusStyle={inputStyle}
                                            floatingLabelFocusStyle={inputStyle}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            hintText="Фамилия"
                                            floatingLabelText="Введите фамилию"
                                            hintStyle={inputStyle}
                                            underlineFocusStyle={inputStyle}
                                            floatingLabelFocusStyle={inputStyle}
                                        />
                                    </div>
                                    <Select
                                        floatingLabelText="Роль"
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        selectedMenuItemStyle={inputStyle}
                                    >
                                        <List value={1} primaryText="Тестировщик"/>
                                        <List value={2} primaryText="Team Lead"/>
                                        <List value={3} primaryText="Admin"/>
                                    </Select>
                                    <div>
                                        <Button label="Ок" style={style} backgroundColor={'#9dc02a'}
                                                      onClick={() => this.showAddComponent('user')}/>
                                        <Button label="Отмена" style={style} backgroundColor={'#9dc02a'}
                                                      onClick={() => this.showAddComponent('empty')}/>
                                    </div>
                                </MuiThemeProvider>
                            </div> : (this.state.showComponent === 'device') ?
                                <div>
                                    <MuiThemeProvider>
                                        <div>
                                            <TextField
                                                hintText="Название устройства"
                                                floatingLabelText="Введите название устройства"
                                                hintStyle={inputStyle}
                                                underlineFocusStyle={inputStyle}
                                                floatingLabelFocusStyle={inputStyle}
                                                onChange={this.changeDeviceTitle}
                                            />
                                        </div>
                                        <Select
                                            floatingLabelText="Операционная система"
                                            value={this.state.value}
                                            onChange={this.handleChange}
                                        >
                                            {console.log('++++++++++++++++++', this.props, this.state)}
                                            {this.renderOsSelectedField(this.props.deviceOS)}
                                        </Select>
                                        <div>
                                            <TextField
                                                hintText="Версия ОС"
                                                floatingLabelText="Введите версию ОС"
                                                hintStyle={inputStyle}
                                                underlineFocusStyle={inputStyle}
                                                floatingLabelFocusStyle={inputStyle}
                                                onChange={this.changeDescription}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                hintText="Разрешение экрана"
                                                floatingLabelText="Введите разрешение экрана"
                                                hintStyle={inputStyle}
                                                underlineFocusStyle={inputStyle}
                                                floatingLabelFocusStyle={inputStyle}
                                                onChange={this.changeScreenResolution}
                                            />
                                        </div>

                                        <div>

                                            <Button label="Ок" style={style} backgroundColor={'#9dc02a'}
                                                          onClick={this.addDevice}/>
                                            <Button label="Отмена" style={style} backgroundColor={'#9dc02a'}
                                                          onClick={() => this.showAddComponent('empty')}/>
                                        </div>
                                    </MuiThemeProvider>
                                </div> : ''}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        {(this.state.showComponent === 'user') ?
                            <div>
                                <MuiThemeProvider>
                                    Список пользователей. Будет здесь, когда-нибудь, не знаю когда.
                                </MuiThemeProvider>
                            </div> : (this.state.showComponent === 'device') ?
                                <div>
                                    <MuiThemeProvider>
                                        <Table
                                            style={tableStyle}>
                                            <TableHead
                                                displaySelectAll={this.state.showCheckboxes}
                                                adjustForCheckbox={this.state.showCheckboxes}>
                                                <TableRow>
                                                    <TableCell>Устройство</TableCell>
                                                    <TableCell>Версия ОС</TableCell>
                                                    <TableCell>Разрешение экрана</TableCell>
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
