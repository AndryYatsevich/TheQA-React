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
import ListItem from '@material-ui/core/ListItem';
import Home from './conteiners/home';
import {connect} from 'react-redux';
import {actionGetUserInfo, actionGetAllRoles, actionGetAllTesting} from "./common/action";
import { withStyles } from '@material-ui/core/styles';
import Profile from './components/profile';
import Divider from '@material-ui/core/Divider';

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
                <ListItem button
                    onClick={this.handleClose}><Link to={`/journal`} className={'menu-item'} style={style} ><ListItemText primary="Журнал" /></Link></ListItem>
                <ListItem button
                    onClick={this.handleClose}><Link to={`/history`} className={'menu-item'}><ListItemText primary="История" /></Link></ListItem>
                <ListItem button
                    onClick={this.handleClose}><Link to={`/info`} className={'menu-item'}><ListItemText primary="Инфо" /></Link></ListItem>
                <ListItem button onClick={this.handleClose}><Link to={`/settings`} className={'menu-item'}><ListItemText primary="Настройки" /></Link></ListItem>
                {this.props.auth ? (<div>
                    <Divider />
                    <ListItem button onClick={this.props.logout}><ListItemText primary="Выйти" /></ListItem>
                </div>) : ''}

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
            openMenu: false,
            anchorEl: null,
        };
    }

       componentWillMount() {
            if (localStorage.getItem('token')) {
                this.props.actionGetUserInfo();
                this.props.actionGetAllRoles();
                this.props.actionGetAllTesting();
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

    logout = () => {
        localStorage.removeItem('token');
        this.setState({authorization: false});
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
                    <Col xsOffset={1} xs={10} className={'general-col'}>
                        <MuiThemeProvider theme={theme}>
                            <AppBar position="static" color={"primary"} className={"profile-block"}>
                                <Toolbar>
                                    <IconButton color="inherit" aria-label="Menu" onClick={this.handleToggle}>
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography variant="title" color="inherit">
                                        {localStorage.getItem('token') && (
                                            this.props.userInfo ? <div> <Profile userInfo={this.props.userInfo}/></div>: ''
                                        )}
                                    </Typography>

                                </Toolbar>
                            </AppBar>
                        </MuiThemeProvider>
                    </Col>
                    <MyDrawer2 open={this.state.open} handler={this.handleToggle} logout={this.logout} auth={this.state.authorization}/>
                </Row>
                <Row>
                    <Col xsOffset={1} xs={10}>
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
userInfo: state.common.userInfo
});

/*export default App;*/

export default connect(mapStateToProps, {
    actionGetUserInfo,
    actionGetAllRoles,
    actionGetAllTesting
})(App);
