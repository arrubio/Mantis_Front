import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import parse from 'html-react-parser'; 
import NewWindow from 'react-new-window'

class QueryDisplay extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {html: localStorage.getItem('query')};  
    }

    componentDidMount() 
    {        
        var target = document.getElementById("cont");
        var scripts = target.getElementsByTagName("script");
        
        var script = scripts[0];
        script.parentNode.removeChild(script);
        var newScript = document.createElement("script");
        
        if(script.type)
        {
            newScript.type = script.type;
        } 
        if (script.textContent) 
        {
            newScript.textContent = script.textContent;
        } else if (script.innerText) {
            newScript.innerText = script.innerText;
        }
        else if (script.src) {
            newScript.src = script.src;
        }
        target.insertAdjacentElement('beforeend', newScript);
    }

    render()
    {
        return (
            
            <div className="QueryDisplay">
                <div id="cont">
                    { parse(this.state.html) }
                </div>
            </div>
            
        );
    }

}
export default QueryDisplay;