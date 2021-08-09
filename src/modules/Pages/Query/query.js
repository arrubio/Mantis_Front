import React, { Component, useState } from 'react';
import './query.css';
import useQueryForm from './queryHook';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Query = () =>
{

  const [startDate, setStartDate] = useState(new Date());

  const {handleSummit, handleInputChange, errors, html, clear} = useQueryForm();

  const dateChanged = () =>
  {
      let targe = {name: "date_submitted", value: startDate};
      let event = {target: targe};

      handleInputChange(event);
  };

  return (
      <div className="Query">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="card col-md-10">
                <Form onSubmit={handleSummit}>
                  {/*<div className="form-group">
                    <label for="inputAddress">Gerente</label>
                    <input type="text" className="form-control" id="encargado" name="encargado" placeholder="John Doe" onChange={handleInputChange}/>
                  </div>*/}
                  <div className="form-group">
                    <label for="inputAddress">Nombre del proyecto</label>
                    <input type="text" className="form-control" id="proyecto" name="proyecto" placeholder="Proyecto X" onChange={handleInputChange}/>
                  </div>
                  <div className="form-group">
                    <label for="inputAddress">Fecha del proyecto</label>
                    <DatePicker
                      dateFormat="yyyy/MM/dd"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      onCalendarClose={() => dateChanged()}
                    />
                  </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary mb-3" onClick={clear}>Submit</button>
                    </div>
                </Form>
              </div>
            </div>
            {errors !== "" ? (<div className="alert alert-warning alert-dismissible fade show" role="alert">
                              <strong>Error!</strong> {errors.message}
                            </div>) : 
                                    (<div></div>)}

            {/*{html !== "" ? (<QueryDisplay html= {html}/>) : (<div> </div>)}*/}
            <div className="mb-3">
              <button className="btn btn-primary mb-3" onClick={clear}>Clear</button>
            </div>
          </div>
      </div>
  );
}
export default Query;