import React, { Component } from 'react'

class Error extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid error-cont container-fixed-lg sm-p-l-0 sm-p-r-0">
            <div className="error-container text-center">
              <h1 className="error-number">404</h1>
              <h2 className="semi-bold">Sorry but we couldnt find this page</h2>
            </div>
          </div>
      </div>
    );
  }
}

export default Error
