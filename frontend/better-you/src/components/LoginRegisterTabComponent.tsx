import React, { Component } from 'react';
import "../assets/scss/LoginRegisterTabStyle.scss";
import LoginRegisterTabStyle from "../assets/scss/LoginRegisterTabStyle";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import TabPane from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LoginComponent from './LoginComponent';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  const classes = LoginRegisterTabStyle();
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
      <Box className={classes.tabPanel} p={2} style={{ padding: "0" }}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface LoginRegisterTabComponentProps {
  isRegister: boolean;
}

export default function LoginRegisterTabComponent(props: LoginRegisterTabComponentProps) {
  const classes = LoginRegisterTabStyle();
  const [value, setValue] = React.useState(props.isRegister ? 1 : 0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.tabBar}>
        <Tabs centered value={value} onChange={handleChange}>
          <TabPane className={classes.tab} label="Login" {...a11yProps(0)} />
          <TabPane className={classes.tab} label="Register" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <LoginComponent />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </div>
  );

}