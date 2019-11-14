import { makeStyles } from "@material-ui/styles";

const LoginRegisterTabStyle = makeStyles({
    root: {
        backgroundColor: "red",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        
        //margin: "auto"
    },
    tabBar: {
         width: "50%"
    },
    tab: {

    },
    tabPanel: {
        height: "100%"
        // width: "50%"
    }
});

export default LoginRegisterTabStyle;