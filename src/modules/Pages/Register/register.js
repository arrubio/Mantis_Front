import React, { Component, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import './register.css';
import useRegisterForm from './registerHook';
import * as Joi from "joi";
import { Link } from 'react-router-dom';

const schema = Joi.object(
  {
    email: Joi.string().email({tlds: {allow: false}}),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    repeatPassword: Joi.ref("password"),
  }
).with("password", "repeatPassword");

const SignIn = () => 
{

  const {handleSummit, handleInputChange, errors, succ} = useRegisterForm(schema);
  var err = false;

  useEffect(() =>
  {

    if(errors !== undefined || errors !== "")
    {
        err = true;
    }
    else
    {
        err = false;
    }

  }, [errors]);

    return (
      <div className="SignIn">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="card col-md-5">
                <Form onSubmit={handleSummit}>
                  <div className="mb-3 row">
                    <label for="email" className="form-label col-sm-5 col-form-label">Email address</label>
                    <div className="col-sm-7">
                    <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" onChange={handleInputChange}/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label for="password" className="col-sm-5 col-form-label">Password</label>
                    <div className="col-sm-7">
                      <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={handleInputChange}/>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label for="repeatPassword" className="col-sm-5 col-form-label">Confirm Password</label>
                    <div className="col-sm-7">
                      <input type="password" className="form-control" id="repeatPassword" name="repeatPassword" placeholder="Confirm Password" onChange={handleInputChange}/>
                    </div>
                  </div>
                  <div className="justify-content-center">
                    <button type="submit" className="btn btn-primary mb-3">Sign In</button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          {errors !== "" ? (<div className="alert alert-warning alert-dismissible fade show" role="alert">
                              <strong>Error!</strong> {errors.message} 
                            </div>) : 
                                    (<div></div>)}
          {succ !== "" ? (<div className="alert alert-success" role="alert">
                            {succ} <Link to="/login" className="alert-link"> Log in now</Link>
                          </div>) : 
                                    (<div></div>)}
      </div>

      

    );
}
export default SignIn;