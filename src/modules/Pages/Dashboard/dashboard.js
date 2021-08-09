import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {decodeToken } from "react-jwt";
import './dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
          Hello! {decodeToken(localStorage.getItem('token')).name}
          <Link to="/query" className="col-form-label col-sm-3">Create a Query now!</Link>
      </div>
    );
  }
}
export default Dashboard;