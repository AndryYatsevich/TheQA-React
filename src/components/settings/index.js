import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {connect} from "react-redux";
import {getDeviceOS} from "../settings/action";

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: '',
            value: 0
        }
    }

    componentDidMount () {
        this.props.getDeviceOS();
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
       return <MenuItem value={el.id} primaryText={el.name}/>
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
                <Row>
                    <Col xs={4}>

                        <div><img className={'img-background'} src={'./../img/general-background.png'}/></div>
                        <div>
                            <MuiThemeProvider>
                                <RaisedButton label="Добавить устройство" style={style} backgroundColor={'#9dc02a'}
                                              onClick={() => this.showAddComponent('device')}/>
                            </MuiThemeProvider>
                        </div>
                        <div>
                            <MuiThemeProvider>
                                <RaisedButton label="Добавить пользователя" style={style} backgroundColor={'#9dc02a'}
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
                                    <SelectField
                                        floatingLabelText="Роль"
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        selectedMenuItemStyle={inputStyle}
                                    >
                                        <MenuItem value={1} primaryText="Тестировщик"/>
                                        <MenuItem value={2} primaryText="Team Lead"/>
                                        <MenuItem value={3} primaryText="Admin"/>
                                    </SelectField>
                                    <div>
                                        <RaisedButton label="Ок" style={style} backgroundColor={'#9dc02a'}
                                                      onClick={() => this.showAddComponent('user')}/>
                                        <RaisedButton label="Отмена" style={style} backgroundColor={'#9dc02a'}
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
                                        <SelectField
                                            floatingLabelText="Операционная система"
                                            value={this.state.value}
                                            onChange={this.handleChange}
                                        >
                                            {console.log('++++++++++++++++++', this.props, this.state)}
                                            {this.renderOsSelectedField(this.props.deviceOS)}
                                        </SelectField>
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

                                            <RaisedButton label="Ок" style={style} backgroundColor={'#9dc02a'}
                                                          onClick={this.addDevice}/>
                                            <RaisedButton label="Отмена" style={style} backgroundColor={'#9dc02a'}
                                                          onClick={() => this.showAddComponent('empty')}/>
                                        </div>
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
    userInfo: state.userInfo
});

/*const mapDispatchToProps = (dispatch) => ({
    getUserCredential: () => getUserCredential(dispatch)

});*/
export default connect(mapStateToProps, {
    getDeviceOS
})(Settings);
