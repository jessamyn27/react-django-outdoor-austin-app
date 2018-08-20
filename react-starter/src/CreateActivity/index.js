import React, { Component } from 'react';

class CreateActivity extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
        }
    }
    updateActivity = (e) => {
        this.setState({[e.currentTarget.name]: e.currentTarget.value});
    }

    render() {
        console.log(this.props, ' this is props');

        return (
            <form onSubmit={this.props.addActivity.bind(this, this.state)}>
                <label>
                    Activity Name:
                    <input type="text" name="name" onChange={this.updateActivity}/>
                </label>
                <input type="submit"/>
            </form>
        )
    }
}

export default CreateActivity;
