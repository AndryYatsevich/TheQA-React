import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Grid, Row, Col} from 'react-flexbox-grid';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItem from '@material-ui/core/ListItem';
import Home from './components/home';
import {connect} from 'react-redux';
import {actionGetUserInfo} from "./common/action";
import { withStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: { main: "#9dc02a" }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
    },
});

class MyDrawer extends Component {
    render() {
const style = {
    width: 250
};
        const { classes, open, handler } = this.props;
        return (<Drawer  onClick={handler}
                             open={open} style={{
                                 visibility: open ? 'visible' : 'hidden'
                             }}

            ><div className={classes.list}>
                <Link to={`/journal`} className={'menu-item'} style={style} ><ListItem button
                    onClick={this.handleClose}><ListItemText primary="Журнал" /></ListItem></Link>
                <Link to={`/history`} className={'menu-item'}><ListItem button
                    onClick={this.handleClose}><ListItemText primary="История" /></ListItem></Link>
                <Link to={`/info`} className={'menu-item'}><ListItem button
                    onClick={this.handleClose}><ListItemText primary="Инфо" /></ListItem></Link>
                <Link to={`/settings`} className={'menu-item'}><ListItem button onClick={this.handleClose}><ListItemText primary="Настройки" /></ListItem></Link>
            </div>
            </Drawer>
        )
    }
}

const MyDrawer2 = withStyles({
    list: {
        width: 250,
    }})(MyDrawer);


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            route: window.location.hash.substr(1),
            authorization: true,
            openMenu: false
        };
    }

       componentWillMount() {
            if (localStorage.getItem('token')) {
                console.log('++++++++++++++++++++++++++++++++App.js++++++++++++++++++++++++++');
                console.log(localStorage.getItem('token'));
                this.props.actionGetUserInfo();
                this.setState({authorization: true})
            }else {
                this.setState({authorization: false})
            }
        }


    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({
                route: window.location.hash.substr(1)
            })
        });
    }

    componentWillReceiveProps() {
        if (localStorage.getItem('token')) {
            this.setState({authorization: true});
        }
    };

    handleToggle = () => {
        this.setState({open: !this.state.open});
    };
    // handleClose = () => this.setState({open: 'false'});

    // toggleDrawer = (side, open) => () => {
    //     this.setState({
    //         [side]: open,
    //     });
    // };
    render() {

        return (
            <Grid fluid className={"general-grid"}>
                <Row>
                    <Col xs={12} className={'general-col'}>
                        {console.log(theme, this.state)}
                        <MuiThemeProvider theme={theme}>
                            <AppBar position="static" color={"primary"}>
                                <Toolbar>
                                    <IconButton color="inherit" aria-label="Menu" onClick={this.handleToggle}>
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography variant="title" color="inherit">
                                        Title
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                        </MuiThemeProvider>
                    </Col>
                    <MyDrawer2 open={this.state.open} handler={this.handleToggle}/>
                </Row>
                <Row>
                    <Col xs={12}>
                        {(!this.state.authorization) ? <Home/> :
                            this.props.children
                        }
                    </Col>
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
userInfo: state.userInfo
});

/*export default App;*/

export default connect(mapStateToProps, {
    actionGetUserInfo
})(App);
