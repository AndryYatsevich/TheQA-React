import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import {connect} from "react-redux";
import {getDeviceOS, getAllUsers, actionAddNewUser} from "../settings/action";
import {actionGetAllDevice, actionAddNewDevice, actionDeleteDevice, actionEditDevice} from "../../common/action";
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
        secondary: { main: '#e50909' }, // This is just green.A700 as hex.
    },
});

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: '',
            value: 0,
            showCheckboxes: false,
            editing: false
        }
    }

    componentDidMount () {
        this.props.getDeviceOS();
        this.props.actionGetAllDevice();
        this.props.getAllUsers();

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

    handleChange = (event) => {
        console.log(event, event.target.value, this.state);
        this.setState({value: event.target.value})};

    renderOsSelectedField = (array) => (array && array.map((el) => {
       return <option value={el.id}>{el.name}</option>
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

    changeLogin = (e) => {
        this.setState({login: e.target.value});
    };

    changeLastName = (e) => {
        this.setState({lastName: e.target.value});
    };

    changeFirstName = (e) => {
        this.setState({firstName: e.target.value});
    };

    changeMiddleName = (e) => {
        this.setState({middleName: e.target.value});
    };

    changePassword = (e) => {
        this.setState({password: e.target.value});
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
            this.props.actionAddNewDevice(device);

        /*  console.log(this.state, this.props.deviceOS);
          let xhr = new XMLHttpRequest();
          xhr.open('POST', 'http://localhost:8080/app/rest/v2/entities/testersjournal$Device', true);
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
          //xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify(device));*/

  };

    addUser = () => {
        let user = {
            lastName: this.state.lastName,
            login: this.state.login,
            password: this.state.password,
            screenResolution: this.state.screenResolution,
            firstName: this.state.firstName,
            middleName: this.state.middleName
        };
        this.props.actionAddNewUser(user);

        /*  console.log(this.state, this.props.deviceOS);
          let xhr = new XMLHttpRequest();
          xhr.open('POST', 'http://localhost:8080/app/rest/v2/entities/testersjournal$Device', true);
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
          //xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify(device));*/

    };

  handleClick = (event, id) => {
    console.log('-----------', event, id);
  };

    deleteDevice = (id) => {
        this.props.actionDeleteDevice(id);
    };

    editDevice = (el) => {
        this.setState({
            deviceTitle: el.name,
            description: el.description,
            screenResolution: el.screenResolution,
            value: el.deviceOs.id,
            editing: true,
            editedDeviceId: el.id
        })
    };

    acceptEditDevice = () => {
        let device = {
            description: this.state.description,
            deviceOs: {
                _entityName: "testersjournal$OperationSystem",
                id: this.state.value,
            },
            name: this.state.deviceTitle,
            screenResolution: this.state.screenResolution,
        };
        this.props.actionEditDevice(this.state.editedDeviceId, device);
        this.setState({
            editing: false,
            editedDeviceId: false
        })
    };

sortArray = (obj1, obj2) => {
        if (obj1.createTs < obj2.createTs) return 1;
        if (obj1.createTs > obj2.createTs) return -1;
    };

  renderDevicesTable = (array) => (array && array.sort(this.sortArray).map((el, key) => {

      return (<TableRow
          hover
          //onClick={event => this.handleClick(event, el.id)}
          // role={"checkbox"}
          key={key}>
          <TableCell>{el.name}</TableCell>
          <TableCell>{el.deviceOs.name} {el.description}</TableCell>
          <TableCell>{el.screenResolution}</TableCell>
          <TableCell> {el.comment}</TableCell>
          <TableCell><Button variant="contained" color='primary' onClick={() => this.editDevice(el)}>Редактировать</Button></TableCell>
          <TableCell><Button variant="contained" color='secondary' onClick={() => this.deleteDevice(el.id)}>Удалить</Button></TableCell>
      </TableRow>)
  }));

    renderUsersTable = (array) => (array && array.map((el, key) => {
        return (<TableRow
            hover
            //onClick={event => this.handleClick(event, el.id)}
            // role={"checkbox"}
            key={key}>

            <TableCell>{el.login}</TableCell>
            <TableCell>{el.lastName} {el.firstName} {el.middleName}</TableCell>
            <TableCell></TableCell>
            <TableCell> </TableCell>
            <TableCell><Button variant="contained" color='primary' onClick={() => this.editDevice(el)}>Редактировать</Button></TableCell>
            <TableCell><Button variant="contained" color='secondary' onClick={() => this.deleteDevice(el.id)}>Удалить</Button></TableCell>
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
                                          label="Login"
                                          className={inputStyle}
                                          onChange={this.changeLogin}
                                      />
                                  </div>
                                  <div>
                                      <TextField
                                          label="Фамилия"
                                          className={inputStyle}
                                          onChange={this.changeLastName}
                                      />
                                  </div>
                                  <div>
                                      <TextField
                                          label="Имя"
                                          className={inputStyle}
                                          onChange={this.changeFirstName}
                                      />
                                  </div>
                                  <div>
                                      <TextField
                                          label="Отчество"
                                          className={inputStyle}
                                          onChange={this.changeMiddleName}
                                      />
                                  </div>
                                  <div>
                                      <TextField
                                          label="Пароль"
                                          className={inputStyle}
                                          onChange={this.changePassword}
                                      />
                                  </div>
                                  <FormControl >
                                      <InputLabel htmlFor="role">Роль</InputLabel>
                                      <Select
                                          native
                                          value={this.state.value}
                                          onChange={this.handleChange}
                                          inputProps={{
                                              id: 'role',
                                          }}
                                      >
                                          <option value="" />
                                          {this.renderOsSelectedField(this.props.roles)}
                                      </Select>
                                  </FormControl>
                                  <div>
                                      <Button variant="contained" color='primary' style={style}
                                              onClick={this.addUser}>Добавить</Button>
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
                                              value={this.state.deviceTitle}
                                              onChange={this.changeDeviceTitle}
                                          />
                                      </div>
                                      <FormControl>
                                          <InputLabel htmlFor="os">Операционная система</InputLabel>
                                      <Select
                                          native
                                          value={this.state.value}
                                          onChange={this.handleChange}
                                          inputProps={{
                                              id: 'os',
                                          }}
                                      >
                                          <option value="" />
                                          {console.log('++++++++++++++++++', this.props, this.state)}
                                          {this.renderOsSelectedField(this.props.deviceOS)}
                                      </Select>
                                      </FormControl>
                                      <div>
                                          <TextField
                                              label="Версия ОС"
                                              value={this.state.description}
                                              onChange={this.changeDescription}
                                          />
                                      </div>
                                      <div>
                                          <TextField
                                              label="Разрешение экрана"
                                              value={this.state.screenResolution}
                                              onChange={this.changeScreenResolution}
                                          />
                                      </div>

                                      <div>
                                          {this.state.editing ?
                                              <Button variant="contained" color='primary' style={style} onClick={this.acceptEditDevice}>Редактировать</Button> :
                                              <Button variant="contained" color='primary' style={style} onClick={this.addDevice}>Добавить</Button>}

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
                                  <MuiThemeProvider theme={theme}>
                                      <Table
                                          style={tableStyle}>
                                          <TableHead>
                                              <TableRow>
                                                  <TableCell>Логин</TableCell>
                                                  <TableCell>ФИО</TableCell>
                                                  <TableCell>Роль</TableCell>
                                                  <TableCell>d(x_X)b</TableCell>
                                                  <TableCell></TableCell>
                                                  <TableCell></TableCell>
                                              </TableRow>
                                          </TableHead>
                                          <TableBody>
                                              { this.renderUsersTable(this.props.users)}
                                          </TableBody>
                                      </Table>
                                  </MuiThemeProvider>
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
                                                  <TableCell></TableCell>
                                                  <TableCell></TableCell>
                                              </TableRow>
                                          </TableHead>
                                          <TableBody>
                                              { this.renderDevicesTable(this.props.devices)}
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
  deviceOS: state.settings.deviceOS,
  userInfo: state.userInfo,
  devices: state.common.devices,
  roles: state.common.roles,
    users: state.settings.users
});

/*const mapDispatchToProps = (dispatch) => ({
  getUserCredential: () => getUserCredential(dispatch)

});*/
export default connect(mapStateToProps, {
    getDeviceOS,
    getAllUsers,
    actionGetAllDevice,
    actionAddNewDevice,
    actionDeleteDevice,
    actionEditDevice,
    actionAddNewUser
})(Settings);
