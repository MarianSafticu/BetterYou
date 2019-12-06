import React from "react";
import "../assets/scss/GoalListStyle.scss";
import Checkbox from '@material-ui/core/Checkbox';

interface IProps {
  typeRepetition: string;
}
interface IStates {
  checked: boolean;
}

class DateCheckbox extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      checked: false
    };
  }
  onChange(ev: { target: { checked: any; }; }) {
    this.setState({checked: ev.target.checked});
  }
  getWeek() {
    var d = new Date();
    if(this.props.typeRepetition == "DAILY"){
      var date = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
      return date;
    }
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    var monday = new Date(d.setDate(diff));
    var sunday = new Date(d.setDate(diff + 6));
    var date = monday.getDate() + "/" + (monday.getMonth()+1) + "/" + monday.getFullYear() + " - " 
    + sunday.getDate() + "/" + (sunday.getMonth()+1) + "/" + sunday.getFullYear();
    return date;
  };

  render() {
    return (
      <div className="typeRepetition">
        {this.getWeek()}
        <Checkbox
          checked={this.state.checked}
          onChange={this.onChange.bind(this)}
        />
      </div>
    );
  }

}

export default DateCheckbox;
