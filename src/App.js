import React, { Component } from 'react';
import './App.css';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({

    app: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
});

function getOutputElement() {

    let element = document.getElementById("eventOutput");
    
	if (element == null) {

		let elementDiv = document.createElement('div');
		elementDiv.setAttribute("id", "eventOutput");
		let reactDiv = document.getElementById('root');
		reactDiv.parentElement.appendChild(elementDiv);
		element = document.getElementById("eventOutput");
    }
    
	return element;
}


function updateDown(e) {
	getOutputElement().innerHTML = "Last event: mouse button " + e.buttons;
}

function upDateMove(e) {
	getOutputElement().innerHTML = "Last event: move mouse to (" + e.clientX + ", " + e.clientY + ")";
}

function updateWheel(e) {
	getOutputElement().innerHTML = "Last event: mouse wheel " + e.deltaY;
}

class App extends Component {

	constructor() {
		super();
		this.state = {
			mouseDown: null,
			mouseMove: null,
			mouseWheel: null,
		}
	}
	
	adjustCheck = (i, c) => {

		let mouseDown = this.state.mouseDown;
		let mouseMove = this.state.mouseMove;
        let mouseWheel = this.state.mouseWheel;
        
		if (i === 0)
			mouseDown = c ? (e) => {updateDown(e);} : null;
		if (i === 1)
			mouseMove = c ? (e) => {upDateMove(e);} : null;
		if (i === 2) 
			mouseWheel = c ? (e) => {updateWheel(e);} : null;
		
		this.setState({
			mouseDown: mouseDown,
			mouseMove: mouseMove,
			mouseWheel: mouseWheel,
		})
	}

	render() {

		return (
			<div className = "app" onMouseDown={this.state.mouseDown} onMouseMove={this.state.mouseMove} onWheel={this.state.mouseWheel}>
                <Paper style={{width: 500, textAlign: 'center',}}>
                    <FormControl component = "fieldset" className = "formControl">
                    <FormGroup>
                        <FormControlLabel
                            control = {
                                <Checkbox onChange={(e, c) => {this.adjustCheck(0, c)}} />
                            }
                            label="Mouse Button"
                        />
					    <FormControlLabel
                            control = {
                                <Checkbox onChange={(e, c) => {this.adjustCheck(1, c)}} />
                            }
                            label="Mouse Move"
                        />
                        <FormControlLabel
                            control = {
                                <Checkbox onChange={(e, c) => {this.adjustCheck(2, c)}} />
                            }
                            label="Mouse Wheel"
                        />
                    </FormGroup>
                    </FormControl>
                </Paper>
			</div>
		);
	}
}

export default withStyles(styles)(App);
