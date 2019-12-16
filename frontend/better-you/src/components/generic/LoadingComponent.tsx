import React from 'react';
import Loadable from 'react-loadable';
import { BeatLoader } from 'react-spinners';

var loaderStyle = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export default class LoadingComponent extends React.Component<Loadable.LoadingComponentProps> {
  render() {
    return (
      <div style={loaderStyle}>
        {this.props.error ? (
          <div>
            Error!
          </div>
        ) : this.props.timedOut ? (
          <div>
            It's taking too long! Please check your internet connection!
          </div>    
        ) : this.props.pastDelay ? (
          < BeatLoader />
        ) : (
          <></>
        )
        }
      </div>
    );
  }
}
