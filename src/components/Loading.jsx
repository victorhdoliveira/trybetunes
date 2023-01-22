import React, { Component } from 'react';
import ReactLoading from 'react-loading';

class Loading extends Component {
  render() {
    return (
      <span>
        <ReactLoading
          type="bars"
          color="rgb(84, 25, 122)"
          height="5%"
          width="5%"
          className="loading"
        />
      </span>
    );
  }
}

export default Loading;
