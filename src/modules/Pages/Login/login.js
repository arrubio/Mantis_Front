import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useLoginForm from './loginHook';
import './login.css';
import { Form } from 'react-bootstrap';
import * as Joi from "joi";
import { Redirect } from 'react-router-dom';
import { useBetween } from 'use-between';
import useLogin from './loginBetween';

const schema = Joi.object(
  {
    username: Joi.string().email({tlds: {allow: false}}),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  }
);

const Login = () =>
{
  const {handleSummit, handleInputChange, errors} = useLoginForm(schema);

  const {login} = useBetween(useLogin);

  return (
      <div className="Login">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="card col-md-5">
                <Form onSubmit={handleSummit}>
                  <div className="mb-3 row">
                    <label for="email" className="form-label col-sm-5 col-form-label">Email address</label>
                    <div className="col-sm-7">
                    <input type="username" className="form-control" id="username" name="username" placeholder="name@example.com" onChange={handleInputChange}/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label for="password" className="col-sm-5 col-form-label">Password</label>
                    <div className="col-sm-7">
                      <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={handleInputChange}/>
                    </div>
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary mb-3">Log In</button>
                  </div>
                </Form>
                <div className="row mb-3">
                  <label className="col-sm-7 col-form-label">Don't have an account?</label>
                  <Link to="/sign_in" className="col-form-label col-sm-3">Sign in now</Link>
                </div>
              </div>
            </div>
            {errors !== "" ? (<div className="alert alert-warning alert-dismissible fade show" role="alert">
                              <strong>Error!</strong> {errors.message}
                            </div>) : 
                                    (<div></div>)}
            {login === "true" ? (<Redirect to= '/dashboard' />) : (<div></div>)}

          </div>
      </div>
  );
}
export default Login;