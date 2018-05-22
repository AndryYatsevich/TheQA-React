import React from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {connect} from 'react-redux';
import {getUserCredential} from './action';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            authorization: false
        }
    }

    componentWillMount() {
        if (localStorage.getItem('token')) {
            this.props.getUserCredential();
        }
    }

    operationsystems = () => {
        console.log(this.props.userInfo.name);
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8080/app/rest/v2/entities/testersjournal$Device', true);
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

    logout = () => {
        localStorage.removeItem('token');
        this.setState({authorization: false});
    };

    addDevice = () => {
        let device = {
            name: "Sony",
            deviceOS: {
                _entityName: "testersjournal$OperationSystem",
                name: "Android"
            }
        };
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/app/rest/v2/entities/testersjournal$Device', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
        //xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(device));

    };

    authorization = (e) => {
        e.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/app/rest/v2/oauth/token', true);
        xhr.setRequestHeader('Authorization', 'Basic Y2xpZW50OnNlY3JldA==');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('grant_type=password&username=' + this.state.username + '&password=' + this.state.password);
        xhr.onreadystatechange = function () { // (3)
            if (xhr.readyState !== 4) return;

            console.log(JSON.parse(xhr.responseText).access_token);
            localStorage.setItem('token', JSON.parse(xhr.responseText).access_token);
        };
        console.log('token: ', localStorage.getItem('token'));
        setTimeout(() => {
            this.props.getUserCredential();
            this.setState({authorization: true});
        }, 1000);


        console.log('token 2: ', localStorage.getItem('token'), this.state);
        console.log('this.props: ', this);

    };


    nameChange = (e) => {

        this.setState({username: e.target.value});
    };

    passwordChange = (e) => {
        this.setState({password: e.target.value});
    };

    render() {
        const style = {
            margin: 12,
            backgroundColor: "#9dc02a"
        };
        const inputStyle = {
            color: "#9dc02a",
            borderColor: "#9dc02a"
        };
        return (
            <Grid className={'content-height'}>
                {localStorage.getItem('token') ? <MuiThemeProvider>
                        <div>
                            Hello {this.props.userInfo.name}
                            <RaisedButton type={'button'} label="Выйти" style={style}
                                          backgroundColor={'#9dc02a'}
                                          onClick={this.logout}/>
                            <RaisedButton type={'button'} label="Запросить чегонибудь" style={style}
                                          backgroundColor={'#9dc02a'}
                                          onClick={this.operationsystems}/>
                            <RaisedButton type={'button'} label="Добавить устройство" style={style}
                                          backgroundColor={'#9dc02a'}
                                          onClick={this.addDevice}/>
                        </div>
                    </MuiThemeProvider> :
                    <Row>
                        <Col xsOffset={5} xs={4}>
                            <div><img className={'img-background'} src={'./../img/general-background.png'}/></div>
                            <MuiThemeProvider>
                                <h1>Добрый день!</h1>
                                <form>
                                    <TextField
                                        hintText="Логин"
                                        floatingLabelText="Введите логин"
                                        hintStyle={inputStyle}
                                        underlineFocusStyle={inputStyle}
                                        floatingLabelFocusStyle={inputStyle}
                                        name={'username'}
                                        onChange={this.nameChange}
                                    />
                                    <TextField
                                        hintText="Пароль"
                                        floatingLabelText="Введите пароль"
                                        hintStyle={inputStyle}
                                        underlineFocusStyle={inputStyle}
                                        floatingLabelFocusStyle={inputStyle}
                                        onChange={this.passwordChange}
                                        type={'password'}
                                    />

                                    <RaisedButton type={'submit'} label="Войти в систему" style={style}
                                                  backgroundColor={'#9dc02a'}
                                                  onClick={(e) => this.authorization(e)}/>
                                    <RaisedButton type={'button'} label="Запросить чегонибудь" style={style}
                                                  backgroundColor={'#9dc02a'}
                                                  onClick={this.operationsystems}/>

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
    userInfo: state.userInfo
});

/*const mapDispatchToProps = (dispatch) => ({
    getUserCredential: () => getUserCredential(dispatch)

});*/
export default connect(mapStateToProps, {
    getUserCredential
})(Home);
