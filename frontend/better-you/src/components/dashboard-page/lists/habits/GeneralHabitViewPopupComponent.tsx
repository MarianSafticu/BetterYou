import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import GeneralHabitViewItemComponent from "./GeneralHabitViewItemComponent";
import Habit from "../../../../models/Habit";
import "../../../../assets/scss/dashboard-page/GeneralGoalPopupStyle.scss";

interface IProps {
  open: boolean;
  habit?: Habit;
  selfDistructFunction?: Function;
  isDefaultHabit?: boolean;
}

export default function GeneratHabitPopupComponent(props: IProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(props.open);
  if (isOpen !== props.open) setIsOpen(props.open);

  const handleClose = () => {
    if (props.selfDistructFunction !== undefined) props.selfDistructFunction();
    setIsOpen(false);
  };

  return (
    <div>
      <Popover
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        anchorEl={null}
        className="genera-popup"
      >
        <div className="general-popup-container">
          <GeneralHabitViewItemComponent
            onFinnishAction={handleClose}
            habit={props.habit}
            isDefaultHabit={props.isDefaultHabit}
          />
        </div>
      </Popover>
    </div>
  );
}
