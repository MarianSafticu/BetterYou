import React, { Component } from 'react';
import "../assets/scss/LoginRegisterTabStyle.scss";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPane from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LoginComponent from './LoginComponent';

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
}
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  interface IProps {
    isRegister?: boolean
  }
  
  interface IState {
    value?: number,
  }

export class LoginRegisterTabComponent extends Component<IProps, IState> {
    constructor(prop:IProps){
      super(prop);

      var aux = 0;
      if(this.props.isRegister)
        aux = 1;

      this.state = {
        value: aux
      };
    }

    handleChange = (event : any, newValue : number) => {
      //setValue(newValue);
      this.setState({
        value:newValue
      });
    };
  
    render(){
      return (
          <div className="tab-bar-background">
              <div className="spacer">
  
              </div>
              <AppBar className="tab-bar">
                  <Tabs value={this.state.value} onChange={this.handleChange}>
                      <TabPane className="upper-tab-bar" label="Login" {...a11yProps(0)} />
                      <TabPane className="upper-tab-bar" label="Register" {...a11yProps(1)} />
                  </Tabs>
              </AppBar>
              <TabPanel value={this.state.value} index={0}>
                  <LoginComponent/>
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
                  Item Two
              </TabPanel>
          </div>
      );
    }
}