import { makeStyles } from "@material-ui/styles";

const LoginRegisterTabStyle = makeStyles({
  pageContainer: {
    height: "calc(100% - 45px)"
  },
  breakpoint: {
    height: "100%"
  },
  root: {
    height: "100%",
    display: "flex",
    justifyContent: "center"
  },
  tabBar: {
    "@media (max-width: 576px)": {
      width: "100%",
      top: "45px"
    },
    "@media (min-width: 575px && max-width: 769px)": {
      width: "50%",
      top: "45px",
      left: "auto",
      right: "auto",
    },
    "@media (min-width: 770px)": {
      width: "35%",
      top: "calc(45px + 30px)",
      left: "auto",
      right: "auto",
    }
  },
  tab: {},
  tabPanel: {
    backgroundColor: "#9173ca",
    "@media (max-width: 576px)": {
      width: "100%",
      height: "100%"
    },
    "@media (min-width: 575px && max-width: 769px)": {
      width: "50%",
      height: "85%",
      borderBottomLeftRadius: "30px",
      borderBottomRightRadius: "30px"
    },
    "@media (min-width: 770px)": {
      width: "35%",
      height: "80%",
      borderBottomLeftRadius: "30px",
      borderBottomRightRadius: "30px"
    },
    padding: 0,
    textAlign: "center"
  },
  tabPanelContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center"
  },
  typography: {
    width: "100%",
    padding: 0,
    "@media (max-width: 576px)": {
      height: "100%",
      paddingTop: "45px"
    },
    "@media (min-width: 575px && max-width: 769px)": {
      paddingTop: "calc(45px + 30px)"
    },
    "@media (min-width: 770px)": {
      paddingTop: "calc(45px + 30px)"
    }
  },
  swipeableView: {
    width: "100%"
  }
});

export default LoginRegisterTabStyle;
