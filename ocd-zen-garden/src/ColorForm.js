import React, { Component } from 'react';

class ColorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorCount: props.numColors,
            base: '',
            border: '',
            colors: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.setState({[evt.target.name]: [evt.target.value]})
    }
    
    render() {
        return (
            <div>
                <form>
                    <div>
                        <label className="form-label" htmlFor="colorCount">Number of Colors</label>
                        <input type="number" min="1" max="7" value={this.state.colorCount} className="form-control" id ="colorCount" name="colorCount" onChange={this.handleChange}/>
                    </div>
                </form>
            </div>
        )
    }
}

export default ColorForm;