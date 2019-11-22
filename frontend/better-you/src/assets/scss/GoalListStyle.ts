import { makeStyles } from "@material-ui/core/styles";

const GoalListStyle = makeStyles({
  title: {
    color: "rgba(255, 255, 255, 0.9)",
    paddingTop: 10,
    paddingLeft: 20,
    fontWeight: "bold"
  },

  card: {
    width: 400,
    fontFamily: "verdana",
    borderRadius: 4,
    backgroundImage: "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)",
    position: "relative"
  },

  category: {
    width: 10,
    height: 100,
    backgroundColor: "#000591",
    position: "absolute"
  }
});

export default GoalListStyle;
