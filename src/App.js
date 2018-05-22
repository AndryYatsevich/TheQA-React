import React, { Component } from 'react';
import logo from './logo.svg';
import {Link} from 'react-router-dom';
import {Grid, Row, Col} from 'react-flexbox-grid';
import './App.css';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            route: window.location.hash.substr(1)};
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({
                route: window.location.hash.substr(1)
            })
        })
    }

    handleToggle = (event, open) => {
        console.log(event.type, open);
        this.setState({open: !this.state.open});
    };
    handleClose = () => this.setState({open: false});
  render() {
      let style ={
          backgroundColor: "#9dc02a"
      };
    return (
          <Grid fluid className={"general-grid"}>
              <Row>
                  <Col xs={12} className={'general-col'}>
                      <MuiThemeProvider>
                      <AppBar
                          title="TheQA"
                          iconClassNameRight="muidocs-icon-navigation-expand-more"
                          style={style}
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
                      <Link to={`/journal`} className={'menu-item'}><MenuItem onClick={this.handleClose}>Журнал</MenuItem></Link>
                      <Link to={`/history`} className={'menu-item'}><MenuItem onClick={this.handleClose}>История</MenuItem></Link>
                      <Link to={`/info`} className={'menu-item'}><MenuItem onClick={this.handleClose}>Инфо</MenuItem></Link>
                      <Link to={`/settings`} className={'menu-item'}><MenuItem onClick={this.handleClose}>Настройки</MenuItem></Link>
                  </Drawer>
                  </MuiThemeProvider>
              </Row>
              <Row>
                  <Col xs={12}>
                      {this.props.children}
                  </Col>
              </Row>
          </Grid>
    );
  }
}

export default App;
