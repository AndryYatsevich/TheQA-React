import React, {Component} from 'react';
import logo from './logo.svg';
import {Link} from 'react-router-dom';
import {Grid, Row, Col} from 'react-flexbox-grid';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiThemeProvider} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Home from './components/home';
import {connect} from 'react-redux';
import {actionGetUserInfo} from "./common/action";



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            route: window.location.hash.substr(1),
            authorization: true
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

    handleToggle = (event, open) => {
        console.log(event.type, open);
        this.setState({open: !this.state.open});
    };
    handleClose = () => this.setState({open: false});

    render() {
        const styles = {
            root: {
                flexGrow: 1,
            },
            flex: {
                flex: 1,
            },
            menuButton: {
                marginLeft: -12,
                marginRight: 20,
            },
            colorDefault: {
                backgroundColor: "#9dc02a"
            }
        };
        return (
            <Grid fluid className={"general-grid"}>
                <Row>
                    <Col xs={12} className={'general-col'}>
                        <MuiThemeProvider>
                            <AppBar position="static" >
                                <Toolbar>
                                    <IconButton color="inherit" aria-label="Menu">
                                        <MenuIcon />
                                    </IconButton>
                                    <Typography variant="title" color="inherit">
                                        Title
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <AppBar
                                title="TheQA"
                                iconClassNameRight="muidocs-icon-navigation-expand-more"
                                style={styles}
                                onLeftIconButtonClick={this.handleToggle}
                            />

                        </MuiThemeProvider>
                    </Col>
                    <MuiThemeProvider>
                        <Drawer docked={false}
                                width={200}
                                open={this.state.open}
                                onRequestChange={(open) => this.setState({open})}
                        >
                            <Link to={`/journal`} className={'menu-item'}><List
                                onClick={this.handleClose}>Журнал</List></Link>
                            <Link to={`/history`} className={'menu-item'}><List
                                onClick={this.handleClose}>История</List></Link>
                            <Link to={`/info`} className={'menu-item'}><List
                                onClick={this.handleClose}>Инфо</List></Link>
                            <Link to={`/settings`} className={'menu-item'}><List onClick={this.handleClose}>Настройки</List></Link>
                        </Drawer>
                    </MuiThemeProvider>
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
