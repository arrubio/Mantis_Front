import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './notfound.css';

class PageError extends Component {
  render() {
    return (
      <div className="PageError">
          <div className="card border-danger mb-3">
            <div className="card-header">404 Error</div>
            <div className="card-body text-danger">
              <h5 className="card-title">Page not found</h5>
              <p className="card-text">Looks like that page doesn't exist</p>
            </div>
          </div>
      </div>
    );
  }
}
export default PageError;