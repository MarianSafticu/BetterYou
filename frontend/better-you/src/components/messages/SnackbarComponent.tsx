import React, { Component, SyntheticEvent } from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

interface SnackbarProps {
  message: string;
}

interface SnackbarState {
  isOpen: boolean;
}

export default class SnackbarComponent extends Component<
  SnackbarProps,
  SnackbarState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpen: this.props.message.length > 0
    };
  }

  handleClose(event: SyntheticEvent | MouseEvent, reason?: string) {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      isOpen: false
    });
  }

  render() {
    return (
      <Snackbar
        open={this.state.isOpen}
        message={this.props.message}
        autoHideDuration={5000}
        onClose={this.handleClose.bind(this)}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
        }}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            onClick={this.handleClose.bind(this)}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  }
}
