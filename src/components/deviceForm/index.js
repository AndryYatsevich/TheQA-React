import React from 'react';
import { MuiThemeProvider} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
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

class deviceForm extends React.Component {
    constructor () {
        super();
        this.state = {
            value: null,
            deviceTitle: null,
            description: null,
            screenResolution: null
        }
    }

    handleChange = (event) => {
        console.log(event, event.target.value, this.state);
        this.setState({value: event.target.value})};

    renderOsSelectedField = (array) => (array && array.map((el, key) => {
        return <option value={el.id} key={key}>{el.name}</option>
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

    renderOsSelectedField = (array) => (array && array.map((el, key) => {
        return <option value={el.id} key={key}>{el.name}</option>
    }));

    render () {
        const style = {
            margin: 12,
            backgroundColor: "#9dc02a"
        };
        return (<MuiThemeProvider theme={theme}>
            <div>
                <TextField
                    label="Название устройства"
                    onChange={this.props.changeDeviceTitle}
                    inputlabelprops={{
                        shrink: true,
                    }}
                />
            </div>
            <FormControl>
                <InputLabel htmlFor="os">ОC</InputLabel>
                <Select
                    native
                    value={this.state.value}
                    onChange={this.props.handleChange}
                    inputProps={{
                        id: 'os',
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                >
                    <option value="" />
                    {this.renderOsSelectedField(this.props.deviceOS)}
                </Select>
            </FormControl>
            <div>
                <TextField
                    label="Версия ОС"
                    value={this.state.description}
                    onChange={this.changeDescription}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <div>
                <TextField
                    label="Разрешение экрана"
                    value={this.state.screenResolution}
                    onChange={this.changeScreenResolution}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>

            <div>
                {this.state.editing ?
                    <Button variant="contained" color='primary' style={style} onClick={this.acceptEditDevice}>Редактировать</Button> :

                    <Button variant="contained" color='primary' style={style} onClick={this.props.addDevice}> {console.log(this.props)}Добавить</Button>}
                {this.state.editing ?
                    <Button variant="contained" color='primary' style={style}
                            onClick={this.cancelEditDevice}>Отмена</Button> :
                    <Button variant="contained" color='primary' style={style}
                            onClick={() => this.showAddComponent('empty')}>Отмена</Button>}
            </div>
        </MuiThemeProvider>)
    }

}

export default deviceForm;