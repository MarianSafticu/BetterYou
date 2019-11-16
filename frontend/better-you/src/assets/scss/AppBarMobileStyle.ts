import { makeStyles } from "@material-ui/core";

const AppBarMobileStyles = makeStyles({
  appBar: {
    backgroundColor: "#c38d9e",
    height: 55,
    display: "flex",
    justifyContent: "center"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  drawerList: {
    backgroundColor: "#f2eaf9",
    width: "150px"
  },
  links: {
    height: "38px",
    display: "flex",
    alignItems: "center"
  },
  iconContainer: {
    height: "100%",
    width: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    color: "white"
  },
  link: {
    textDecoration: "none",
    color: "black",
    width: "100%",
    textAlign: "center"
  },
  button: {
    width: "100px",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black"
  }
});

export default AppBarMobileStyles;
