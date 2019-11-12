import { makeStyles } from "@material-ui/core";

const AppBarStyles = makeStyles({
    appBar: {
        backgroundColor: "#c38d9e",
        height: 55,
        display: "flex",
        justifyContent: "center"
    },
    icon: {
        color: "white"
    },
    link: {
        marginLeft: 50,
        textDecoration: "none",
        color: "black"
    },
    button: {
        width: "100px",
        marginLeft: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "black"
    }
});

export default AppBarStyles;