import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

class ColorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paletteName: '',
            colorCount: props.colorCount,
            countArr: Array(props.colorCount).fill(null),
            base: '', 
            border: '',
            auxBackground: '',
            aux1: '',
            aux2: '',
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleColorCountChange = evt => {
        this.setState({colorCount: evt.target.value, countArr: Array(+evt.target.value).fill(null)});
    }

    handleChange(evt) {
        this.setState({[evt.target.name]: [evt.target.value]})
    }
    
    render() {
        return (
            <div>
                <form>
                    <div>
                        <label className="form-label" htmlFor="paletteName">Name your Palette!</label>
                        <input type="text" value={this.state.paletteName} className="form-control" id ="paletteName" name="paletteName" onChange={this.handleChange}/>
                    </div>
                    {!this.props.monochrome ? 
                    <div>
                        <label className="form-label" htmlFor="colorCount">How many colors do you want to include?</label>
                        <input type="number" min="1" max="7" value={this.state.colorCount} className="form-control" id ="colorCount" name="colorCount" onChange={this.handleColorCountChange}/>
                    </div>
                    :
                    null}
                        <div>
                            <label className="form-label" htmlFor="base">Select a background color</label>
                            <input type="color" value={this.state.base} className="form-control" id ="base" name="base" onChange={this.handleChange}/>
                        </div>
                        <div>
                            <label className="form-label" htmlFor="border">Select a border color</label>
                            <input type="color" value={this.state.border} className="form-control" id ="border" name="border" onChange={this.handleChange}/>
                        </div>
                        <div>
                            <label className="form-label" htmlFor="aux1">Select a button color</label>
                            <input type="color" value={this.state.aux1} className="form-control" id ="aux1" name="aux1" onChange={this.handleChange}/>
                        </div>
                        <div>
                            <label className="form-label" htmlFor="aux2">Select a button text color</label>
                            <input type="color" value={this.state.aux2} className="form-control" id ="aux2" name="aux2" onChange={this.handleChange}/>
                        </div>
                        {/* {Array(this.state.colorCount).fill(null).map((color, idx) => { */}
                        {this.state.countArr.map((color, idx) => {
                            return (
                                <div key={uuidv4()}>
                                    <label className="form-label" htmlFor={`${idx + 1}`}>Select a color</label>
                                    <input type="color" value={this.state[idx + 1]} className="form-control" id ={`${idx + 1}`} name={`${idx + 1}`} onChange={this.handleChange}/>
                                </div>
                            )
                        })}
                </form>
            </div>
        )
    }
}

export default ColorForm;