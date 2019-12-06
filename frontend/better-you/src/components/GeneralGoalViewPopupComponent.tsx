import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import GeneralGoalViewItemComponent from './GeneralGoalViewItemComponent';
import { Goal } from '../models/Goal';
import "../assets/scss/GeneralGoalPopupStyle.scss"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        typography: {
            padding: theme.spacing(2),
            backgroundColor: "#{$color1}"
        },
        popup:{
            backgroundColor: "rgba(0,0,0,0.6)",
        }
    }),
);

interface IProps{
    open: boolean,
    goal?: Goal,
    selfDistructFunction?: Function
}

export default function GeneratGoalPopupComponent(props:IProps) {
    const classes = useStyles();
    const [isOpen, setIsOpen] = React.useState<boolean>(props.open);
    if(isOpen !== props.open)
        setIsOpen(props.open);

    const handleClose = () => {
        if(props.selfDistructFunction !== undefined)
            props.selfDistructFunction();
        setIsOpen(false);
    };

    return (
        <div>
            <Popover
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                anchorEl={null}
                className="genera-popup"
            >
            <div className="general-popup-container">
                <GeneralGoalViewItemComponent onFinnishAction={handleClose} goal={props.goal}/>
            </div>
            </Popover>
        </div>
    );
}