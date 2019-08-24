import React, { Component } from 'react';
import Select from 'react-select'
import "react-inputs-validation/lib/react-inputs-validation.min.css";

class Selector extends Component {
    constructor(props) {
        super(props);

        console.log(props)

        this.state = {
            /*id: this.props.id,
            name: this.props.name,
            value: this.props.value,
            type: this.props.type,
            disabled: this.props.disabled,
            validate: this.props.validate,*/
            validate: this.props.validate,
            hasError: true,
            //handler: this.props.test
        };

        this.validateForm = this.validateForm.bind(this);
    }

    toggleValidating(validate) {
        this.setState({ validate });
    }

    validateForm(e) {
        e.preventDefault();
        this.toggleValidating(true);
        const { hasError } = this.state;

        if (!hasError) {
            alert("All validated!");
        }
    }

    render() {
        return (<Select options={this.props.value} onChange={this.props.test} />)
    }
}

export default Selector;
