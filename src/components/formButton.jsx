import React from 'react';
import Popup from 'react-popup';
import './form.css'

function refreshPosition() {
  Popup.refreshPosition();
}

Popup.addCloseListener(function () {
  window.removeEventListener('scroll', refreshPosition);
});

export default class FormButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: 'Initial State'
      };      
    }
    handleClick = () => {   
      Popup.alert("This is an example of a normal alert box. Pass some text with additional title or send an ID of an already created popup.");
      Popup.alert("All popups will be queued and when first in line, displayed.");   
    }
    render() {
      return (
        <div>
          <button className="btn btn--big" type="button" id="alert" onClick={this.handleClick}>Click Me</button>        
          <Popup />
        </div>
      );
    }
  };