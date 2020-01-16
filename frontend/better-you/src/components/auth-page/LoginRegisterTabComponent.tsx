import React from "react";
import "../../assets/scss/auth-page/LoginRegisterTabStyle.scss";
import LoginRegisterTabStyle from "../../assets/scss/auth-page/LoginRegisterTabStyle";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import TabPane from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LoginComponent from "./LoginComponent";
import { Breakpoint } from "react-socks";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import { useHistory, Redirect } from "react-router-dom";
import RegisterComponent from "./RegisterComponent";
import { useSelector } from "react-redux";
import AppState from "../../redux/store/store";
import UserDTO from "../../models/UserDTO";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const classes = LoginRegisterTabStyle();
  const { children, value, index, ...other } = props;

  return (
    <Typography
      className={classes.typography}
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <div className={classes.tabPanelContainer}>
        <Box className={classes.tabPanel} p={2}>
          {children}
        </Box>
      </div>
    </Typography>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

function a11yPropsMobile(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

interface LoginRegisterTabComponentProps {
  isRegister: boolean;
}

export default function LoginRegisterTabComponent(
  props: LoginRegisterTabComponentProps
) {
  let history = useHistory();
  const classes = LoginRegisterTabStyle();
  const theme = useTheme();
  const [value, setValue] = React.useState(props.isRegister ? 1 : 0);
  const authenticatedUser: UserDTO | undefined = useSelector(
    (state: AppState) => state.userInfo
  );
  let redirect: boolean = false;
  if (authenticatedUser) {
    redirect = authenticatedUser.isAuthenticated;
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (newValue === 0) history.push("/login");
    else history.push("/register");
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    if (index === 0) history.push("/login");
    else history.push("/register");
    setValue(index);
  };

  if (redirect) {
    return (
      <div className={classes.pageContainer}>
        <Redirect to="/dashboard" />
      </div>
    );
  } else {
    return (
      <div className={classes.pageContainer}>
        <Breakpoint medium up className={classes.breakpoint}>
          <div className={classes.root}>
            <div className={classes.authContainer}>
              <AppBar className={classes.tabBar}>
                <Tabs centered value={value} onChange={handleChange}>
                  <TabPane
                    className={classes.tab}
                    label="Login"
                    {...a11yProps(0)}
                  />
                  <TabPane
                    className={classes.tab}
                    label="Register"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <LoginComponent />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <RegisterComponent />
              </TabPanel>
            </div>
          </div>
        </Breakpoint>

        <Breakpoint small down className={classes.breakpoint}>
          <div className={classes.root}>
            <div className={classes.authContainer}>
              <AppBar className={classes.tabBar}>
                <Tabs
                  variant="fullWidth"
                  centered
                  value={value}
                  onChange={handleChange}
                >
                  <TabPane
                    className={classes.tab}
                    label="Login"
                    {...a11yPropsMobile(0)}
                  />
                  <TabPane
                    className={classes.tab}
                    label="Register"
                    {...a11yPropsMobile(1)}
                  />
                </Tabs>
              </AppBar>
              <SwipeableViews
                className={classes.swipeableView}
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <LoginComponent />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <RegisterComponent />
                </TabPanel>
              </SwipeableViews>
            </div>
          </div>
        </Breakpoint>
      </div>
    );
  }
}