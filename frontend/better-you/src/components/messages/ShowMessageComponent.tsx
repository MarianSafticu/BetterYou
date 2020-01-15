import React, { Component } from "react";
import "../../assets/scss/messages/ShowMessageStyle.scss";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import AppState from "../../redux/store/store";
import { confirmAccountBegin } from "../../redux/actions/actions";
import { Redirect } from "react-router-dom";

interface IProps {
  type: string;
  accountConfirmed: boolean;
  confirmAccount: Function;
}

interface IState {}

class ShowMessageComponent extends Component<IProps, IState> {
  render() {
    let text: string = "";
    switch (this.props.type) {
      case "recover-account": {
        text =
          "An email has been sent to the specified address. Please check your email and click on the provided link to recover your account.";
        break;
      }
      case "confirm-account": {
        text =
          "An email has been sent to the specified address. Please check your email and click on the provided link to recover your account.";
        break;
      }
      default: {
        text = "404 error. No ideea how did you got here";
        break;
      }
    }

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let confirmationCode = params.get("code");
    console.log("url param: ", confirmationCode, this.props.accountConfirmed);

    if (this.props.accountConfirmed) {
      return <Redirect to="/login" />;
    } else {
      if (confirmationCode) {
        return (
          <div className="message-background">
            <div className="message-container">
              <p className="message-module">{text}</p>
            </div>
            <br />
            <Button
              onClick={() => {
                this.props.confirmAccount(confirmationCode);
              }}
            >
              Go to login
            </Button>
          </div>
        );
      } else {
        return (
          <div className="message-background">
            <div className="message-container">
              <p className="message-module">{text}</p>
            </div>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    accountConfirmed: state.accountConfirmed
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    confirmAccount: (confirmationCode: string) =>
      dispatch(confirmAccountBegin(confirmationCode))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowMessageComponent);
