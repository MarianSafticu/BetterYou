import { makeStyles } from "@material-ui/styles";

const LoginRegisterTabStyle = makeStyles({
  pageContainer: {
    height: "100%"
  },
  breakpoint: {
    height: "100%"
  },
  root: {
    backgroundColor: "#85dcbe",
    height: "100%",
    display: "flex",
    justifyContent: "center"
  },
  tabBar: {
    backgroundColor: "#c38d9e",
    "@media (max-width: 576px)": {
      width: "100%"
    },
    "@media (min-width: 575px && max-width: 769px)": {
      width: "50%",
      top: "50px",
      left: "auto",
      right: "auto",
      borderTopLeftRadius: "30px",
      borderTopRightRadius: "30px"
    },
    "@media (min-width: 770px)": {
      width: "35%",
      top: "50px",
      left: "auto",
      right: "auto",
      borderTopLeftRadius: "30px",
      borderTopRightRadius: "30px"
    }
  },
  tab: {},
  tabPanel: {
    backgroundColor: "#41b3a3",
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
    // height: "100%",
    padding: 0,
    "@media (max-width: 576px)": {
      paddingTop: "48px"
    },
    "@media (min-width: 575px && max-width: 769px)": {
      paddingTop: "calc(48px + 50px)"
    },
    "@media (min-width: 770px)": {
      paddingTop: "calc(48px + 50px)"
    }
  },
  swipeableView: {
    width: "100%"
  }
});

export default LoginRegisterTabStyle;
