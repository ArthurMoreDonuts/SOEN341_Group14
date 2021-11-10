import React, { Component } from 'react';
import Checkbox from './checkbox';

const SELECT = ["Select as Best Answer"];

class UserBestAnswer extends Component {
    state = {
        checkboxes: SELECT.reduce(
            (options, option) => ({
                ...options,
                [option]: false
            }),
            {}
        )
    };

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        Object.keys(this.state.checkboxes)
        .filter(checkbox => this.state.checkboxes[checkbox])
        .forEach(checkbox => {
            console.log(checkbox, "was selected.");
        });
    };


    createCheckbox = option => (
        <Checkbox
            label = {option}
            isSelected = {this.state.checkboxes[option]}
            onCheckboxChange = {this.handleCheckboxChange}
            key = {option}
    />

    );

    createCheckboxes = () => SELECT.map(this.createCheckbox);

    render() {
        return(
            <div className="container">
                <div className="row mt-5">
                    <div className="col-sm-12">
                        <form onSubmit = {this.handleFormSubmit}>
                            {this.createCheckboxes()}

                            <button type = "submit" className = "btn btn-primary">
                                Select
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
    
}
    
export default UserBestAnswer;

//if author = same as user __allow to use button else button doesnt appear.