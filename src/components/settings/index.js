import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: '',
            value: 0
        }
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
                                            />
                                        </div>
                                        <SelectField
                                            floatingLabelText="Операционная система"
                                            value={this.state.value}
                                            onChange={this.handleChange}
                                        >
                                            <MenuItem value={1} primaryText="Android"/>
                                            <MenuItem value={2} primaryText="iOS"/>
                                            <MenuItem value={3} primaryText="Windows Phone"/>
                                        </SelectField>
                                        <div>
                                            <TextField
                                                hintText="Версия ОС"
                                                floatingLabelText="Введите версию ОС"
                                                hintStyle={inputStyle}
                                                underlineFocusStyle={inputStyle}
                                                floatingLabelFocusStyle={inputStyle}
                                            />
                                        </div>

                                        <div>
                                            <RaisedButton label="Ок" style={style} backgroundColor={'#9dc02a'}
                                                          onClick={() => this.showAddComponent('device')}/>
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

export default Settings;