import { makeStyles } from "@material-ui/core";

const RegisterBarStyles = makeStyles({
  container: {
    backgroundColor: "#f2eaf9",
    position: "fixed",
    height: "170px",
    width: "100%",
    bottom: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  components: {},
  header: {},
  link: {
    textDecoration: "none",
    color: "black"
  },
  button: {
    backgroundColor: "#c38d9e",
    width: "50%",
    margin: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    "&:hover": {
      backgroundColor: "#b48292"
    }
  }
});

export default RegisterBarStyles;
