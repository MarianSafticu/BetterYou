import { makeStyles } from "@material-ui/styles";

const LoginRegisterTabStyle = makeStyles({
  pageContainer: {
    "@media (orientation: portrait)": {
      "@media (max-width: 576px), (min-width: 577px) and (max-width: 991px)": {
        height: "calc(100vh - 45px)"
      }
    },
    "@media (orientation: landscape)": {
      "@media (max-width: 732px), (min-width: 733px) and (max-width: 991px)": {
        height: "calc(100vh - 45px)"
      }
    }
  },
  breakpoint: {
    "@media (orientation: portrait)": {
      "@media (max-width: 576px), (min-width: 577px) and (max-width: 991px)": {
        height: "100%"
      }
    },
    "@media (orientation: landscape)": {
      "@media (max-width: 732px), (min-width: 733px) and (max-width: 991px)": {
        height: "100%"
      }
    }
  },
  root: {
    "@media (orientation: portrait)": {
      "@media (max-width: 576px), (min-width: 577px) and (max-width: 991px)": {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }
    },
    "@media (orientation: landscape)": {
      "@media (max-width: 732px), (min-width: 733px) and (max-width: 991px)": {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }
    }
  },
  authContainer: {
    "@media (orientation: portrait)": {
      "@media (max-width: 576px)": {
        height: "100%",
        width: "100%"
      },
      "@media (min-width: 577px) and (max-width: 991px)": {
        height: "80%",
        width: "50%"
      }
    },
    "@media (orientation: landscape)": {
      "@media (max-width: 732px)": {
        height: "100%",
        width: "100%"
      },
      "@media (min-width: 733px) and (max-width: 991px)": {
        height: "100%",
        width: "50%"
      }
    },
    "@media (min-width: 992px)": {
      height: "550px",
      width: "35%",
      margin: "auto",
      paddingTop: "45px"
    }
  },
  tabBar: {
    "@media (orientation: portrait)": {
      "@media (max-width: 576px)": {
        width: "100%",
        top: "45px"
      },
      "@media (min-width: 577px) and (max-width: 991px)": {
        width: "100%",
        position: "unset"
      }
    },
    "@media (orientation: landscape)": {
      "@media (max-width: 732px)": {
        width: "100%",
        top: "45px"
      },
      "@media (min-width: 733px) and (max-width: 991px)": {
        width: "100%",
        position: "unset"
      }
    },
    "@media (min-width: 992px)": {
      position: "unset"
    }
  },
  tab: {
    backgroundColor: "#ecc169" //lighten($color6, 5%) = #ecc169
  },
  tabPanel: {
    backgroundColor: "#9173ca",
    "@media (orientation: portrait)": {
      "@media (max-width: 576px)": {
        width: "100%",
        height: "100%"
      },
      "@media (min-width: 577px) and (max-width: 991px)": {
        width: "100%",
        borderBottomLeftRadius: "30px",
        borderBottomRightRadius: "30px"
      }
    },
    "@media (orientation: landscape)": {
      "@media (max-width: 732px)": {
        width: "100%",
        height: "100%"
      },
      "@media (min-width: 733px) and (max-width: 991px)": {
        width: "100%"
      }
    },
    "@media (min-width: 992px)": {
      width: "100%",
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
    "@media (orientation: portrait)": {
      "@media (max-width: 576px)": {
        height: "calc(100% - 45px)",
        marginTop: "45px"
      },
      "@media (min-width: 577px) and (max-width: 991px)": {
        height: "calc(100% - 45px)"
      }
    },
    "@media (orientation: landscape)": {
      "@media (max-width: 732px)": {
        height: "100%",
        marginTop: "45px"
      },
      "@media (min-width: 733px) and (max-width: 991px)": {
        height: "100%"
      }
    },
    "@media (min-width: 992px)": {
      height: "calc(100% - 45px)"
    }
  },
  swipeableView: {
    height: "100%",
    width: "100%"
  }
});

export default LoginRegisterTabStyle;
