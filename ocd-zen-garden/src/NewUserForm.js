import React, {Component } from 'react';

class NewUserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            profilePic: '',
            firstName: '',
            lastName: '',
            dob: '',
            country: '',
            found: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(evt) {
        this.setState({[evt.target.name]: [evt.target.value]})
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.toggleLoggedIn();
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="container">
                        <div>
                            <label className="form-label" htmlFor="username">Username</label>
                            <input className="form-control" type="text" id="username" name="username" value={this.state.username} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label className="form-label" htmlFor="password">Password</label>
                            <input className="form-control" type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label className="form-label" htmlFor="confirmPassword">ConfirmPassword</label>
                            <input className="form-control" type="password" id="confirmPassword" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label className="form-label" htmlFor="profilePic">Upload Profile Picture</label>
                            <input className="form-control" type="file" id="profilePic" name="profilePic" value={this.state.profilePic} onChange={this.handleChange} />
                        </div>
                        <button type="submit">Create Account</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default NewUserForm;