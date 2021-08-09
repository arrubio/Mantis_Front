import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import useLoginForm from '../Login/loginHook';
import { useBetween } from 'use-between';
import useLogin from '../Login/loginBetween';

const NavBar = () =>
{

  const {login} = useBetween(useLogin);
  const {logout} = useLoginForm();

      return (
        <div className="NavBar">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="nav-link">
                  <Link to="/" className="link">Home</Link>
                </div>
              <div className="row" id="navbarNavAltMarkup">
                <div className="navbar-nav">

                  {login === "true" ? (<div className="row" className="navbar-nav">
                                            <div className="nav-link">
                                              <Link to="/dashboard" className="link">Dashboard</Link>
                                            </div>
                                            <div className="nav-link">
                                              <Link to="/query" className="link">Create a Query</Link>
                                            </div>
                                            <div className="nav-link">
                                              <button className="link" onClick={logout}> Log Out </button>
                                            </div>
                                          </div>)
                                        :(<div className="row" className="navbar-nav">
                                            <div className="nav-link">
                                              <Link to="/login" className="link">Login</Link>
                                            </div>
                                            <div className="nav-link">
                                              <Link to="/sign_in" className="link">Sign In</Link>
                                            </div>
                                        </div>)}

                </div>
              </div>
            </div>
          </nav>
          
        </div>
      );

}
export default NavBar;
