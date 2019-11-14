import { makeStyles } from "@material-ui/core";

const AppBarStyles = makeStyles({
  appBar: {
    backgroundColor: "#c38d9e",
    height: 45,
    display: "flex",
    justifyContent: "center"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    height: 45
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
    color: "black"
  },
  button: {
    width: "100px",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black"
  }
});

export default AppBarStyles;
