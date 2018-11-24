import React from 'react';
import ReactDOM from 'react-dom'
import Popup from 'react-popup';
import './form.css'

function refreshPosition() {
    Popup.refreshPosition();
}
  
Popup.addCloseListener(function () {
window.removeEventListener('scroll', refreshPosition);
});

Popup.registerPlugin('buttonTip', function (content, target) {
    this.create({
        content: content,
        className: 'buttonTip',
        noOverlay: true,
        position: function (box) {
            let bodyRect      = document.body.getBoundingClientRect();
            let btnRect       = target.getBoundingClientRect();
            let btnOffsetTop  = btnRect.top - bodyRect.top;
            let btnOffsetLeft = btnRect.left - bodyRect.left;
            let scroll        = document.documentElement.scrollTop || document.body.scrollTop;

            box.style.top  = (btnOffsetTop - box.offsetHeight - 10) - scroll + 'px';
            box.style.left = (btnOffsetLeft + (target.offsetWidth / 2) - (box.offsetWidth / 2)) + 'px';
            box.style.margin = 0;
            box.style.opacity = 1;
        }
    });
});
 
export default class ButtonTipExample extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        name: 'Initial State'
    };      
    }
    handleClick = () => {
        Popup.plugins().buttonTip('This popup will be displayed right above this button.', this.refs.testButtonTip);
    }
    render() {
    return (
        <div>
        <button className="btn btn--big" type="button" ref="testButtonTip" onClick={this.handleClick}>Show Button Tip</button>        
        <Popup />
        </div>
    );
    }
};