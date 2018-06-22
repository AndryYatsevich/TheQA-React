import React from 'react';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {connect} from 'react-redux';
import {getUserInfo} from './action';
import services from '../../common/services';
import {actionUserAuth} from '../../common/action';
import {createMuiTheme} from "@material-ui/core/styles/index";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#9dc02a",
            }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            authorization: false
        }
    }


    operationsystems = () => {
        console.log(this.props.userInfo.name);
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/app/rest/v2/entities/testersjournal$Device?view=device-with-all', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();
        xhr.onprogress = function(event) {
           console.log( 'Получено с сервера ' + event.loaded + ' байт из ' + event.total );
        };

        xhr.onreadystatechange = function () { // (3)
            if (xhr.readyState !== 4) return;

            console.log(xhr.responseText);


            if (xhr.status !== 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                alert(xhr.responseText);

            }
        };
    };

    logout = () => {
        localStorage.removeItem('token');
        this.setState({authorization: false});
    };

    addDevice = () => {
        let device = {
            name: "Азазяшка",
            password: "takoe"
        };
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/app/rest/v2/entities/sec$User', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
        //xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(device));

    };

    changeDevice = () => {
        let device = {
            name: "Азазяшка"
        };
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/app/rest/v2/entities/sec$User', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
        //xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
    };

    deleteDevice = () => {
        let device = {
            name: "Азазяшка"
        };
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/app/rest/v2/entities/testersjournal$Testing', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
        //xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
    };

    getRole = () => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/app/rest/api/getUserInfo', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();
        xhr.onreadystatechange = function () { // (3)
            if (xhr.readyState !== 4) return;

            console.log(xhr.responseText);


            if (xhr.status !== 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                alert(xhr.responseText);

            }
        };
    };

    getAllUsers = () => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/app/rest/api/getUsersWithRoles', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();
        xhr.onreadystatechange = function () { // (3)
            if (xhr.readyState !== 4) return;

            console.log(xhr.responseText);


            if (xhr.status !== 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                alert(xhr.responseText);

            }
        };
    };

    getAllRoles = () => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/app/rest/v2/entities/sec$Role', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send();
        xhr.onreadystatechange = function () { // (3)
            if (xhr.readyState !== 4) return;

            console.log(xhr.responseText);


            if (xhr.status !== 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                alert(xhr.responseText);

            }
        };
    };

  authorization = (e) => {
        e.preventDefault();
        console.log('----------------------', services);
       // async function() {}
      this.props.actionUserAuth(this.state.username, this.state.password);
        //services.userAuth(this.state.username, this.state.password);

        /* let xhr = new XMLHttpRequest();
         xhr.open('POST', 'http://localhost:8080/app/rest/v2/oauth/token', true);
         xhr.setRequestHeader('Authorization', 'Basic Y2xpZW50MzE0OkhYYTM1VA==');
         xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
         xhr.send('grant_type=password&username=' + this.state.username + '&password=' + this.state.password);
         xhr.onreadystatechange = function () { // (3)
             if (xhr.readyState !== 4) return;

             console.log(JSON.parse(xhr.responseText).access_token, xhr.responseText);
             localStorage.setItem('token', JSON.parse(xhr.responseText).access_token);
         };
         console.log('token: ', localStorage.getItem('token'));
         setTimeout(() => {

             this.setState({authorization: true});
         }, 2000);


         console.log('token 2: ', localStorage.getItem('token'), this.state);
         console.log('this.props: ', this);*/

    };


    nameChange = (e) => {

        this.setState({username: e.target.value});
    };

    passwordChange = (e) => {
        this.setState({password: e.target.value});
    };

    render() {
        const style = {
            margin: 12
        };
        const inputStyle = {
            color: "#9dc02a",
            borderColor: "#9dc02a"
        };
        return (
            <Grid className={'content-height'}>
                {localStorage.getItem('token') ? <MuiThemeProvider theme={theme}>
                        <div style={style}>
                            {console.log(this.props.userInfo)}
                            Hello {this.props.userInfo && this.props.userInfo.name}
                            <Button variant="contained" color='primary' style={style}
                                    onClick={this.logout}>Выйти</Button>
                            <Button variant="contained" color='primary' style={style}
                                    onClick={this.operationsystems}>Запросить чегонибудь</Button>
                            <Button variant="contained" color='primary' style={style}
                                    onClick={this.addDevice}>Добавить устройство</Button>
                            <Button variant="contained" color='primary' style={style}
                                    onClick={this.getRole}>Получить роли</Button>
                            <Button variant="contained" color='primary'
                                    onClick={this.changeDevice}>Изменить чего-нибудь</Button>
                            <Button variant="contained" color='primary' style={style}
                                    onClick={this.deleteDevice}>Удалить чего-нибудь</Button>
                            <Button variant="contained" color='primary' style={style}
                                    onClick={this.getAllUsers}>Запросить всех пользователей</Button>
                            <Button variant="contained" color='primary' style={style}
                                    onClick={this.getAllRoles}>Запросить всех ролей</Button>
                        </div>
                    </MuiThemeProvider> :
                    <Row>
                        <Col xsOffset={5} xs={4}>
                            <div><img className={'img-background'} src={'./../img/general-background.png'}/></div>
                            <MuiThemeProvider theme={theme}>
                                <h1>Добрый день!</h1>
                                <form>
                                    <TextField
                                        label="Логин"
                                        autoComplete="off"
                                        className={inputStyle}
                                        name={'username'}
                                        onChange={this.nameChange}
                                    />
                                    <TextField
                                        label="Пароль"
                                        floatingLabelText="Введите пароль"
                                        className={inputStyle}
                                        onChange={this.passwordChange}
                                        type={'password'}
                                    />

                                    <Button variant="contained" color='primary' style={style}
                                            onClick={(e) => this.authorization(e)}>Войти в систему</Button>
                                    <Button variant="contained" color='primary' style={style}
                                            onClick={this.operationsystems}>Запросить чегонибудь</Button>

                                </form>
                            </MuiThemeProvider>
                        </Col>
                    </Row>}
            </Grid>

        );
    }
}

const mapStateToProps = (state) => ({
    devices: state.devices,
    userInfo: state.common.userInfo
});

/*const mapDispatchToProps = (dispatch) => ({
    getUserCredential: () => getUserCredential(dispatch)

});*/
export default connect(mapStateToProps, {
    getUserInfo,
    actionUserAuth
})(Home);
