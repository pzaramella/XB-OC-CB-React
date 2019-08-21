import React, { Component } from 'react';
import {
    Textbox
} from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";


class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /*id: this.props.id,
            name: this.props.name,
            value: this.props.value,
            type: this.props.type,
            disabled: this.props.disabled,
            validate: this.props.validate,*/
            placeholder: `mensaje ${this.props.name}`,
            hasError: true,
            handler: this.props.test
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

        if (
            !hasError
        ) {
            alert("All validated!");
        }
    }




    render() {
        return (
            <Textbox
                id={this.props.id} // Optional.[String].Default: "".  Input ID.
                name={this.props.name} // Optional.[String].Default: "". Input name.
                type={this.props.type} // Optional.[String].Default: "text". Input type [text, password, number].
                value={this.props.value} // Optional.[String].Default: "".
                disabled={this.props.disabled} // Optional.[Bool].Default: false.
                placeholder="" // Optional.[String].Default: "".
                validate={this.props.validate || true} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                validationCallback={(res) => {
                    console.log(res);
                    this.setState({ hasError: res, validate: false })
                }
                } // Optional.[Func].Default: none. Return the validation result.
                onChange={(name, event) => {
                    console.log('name: ', name)
                    console.log('event: ', event.target)
                    this.state.handler({ name: event.target.name, value: event.target.value })
                    // console.log(e.target.value);
                }}  // Required.[Func].Default: () => {}. Will return the value.
                validationOption={{
                    name: "name", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                    check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                    required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                    // type: 'string', // Optional.[String].Default: "string". Validation type, options are ['string', 'number', 'alphanumeric', 'alpha'].
                    // showMsg: true, // Optional.[Bool].Default: true. To determin display the error message or not.
                    // min: 2, // Optional.[Number].Default: 0. Validation of min length when validationOption['type'] is string, min amount when validationOption['type'] is number.
                    // max: 10, // Optional.[Number].Default: 0. Validation of max length when validationOption['type'] is string, max amount when validationOption['type'] is number.
                    // length: 2, // Optional.[Number].Default: 0. Validation of exact length of the value.
                    // compare: '3', // Optional.[String].Default: "" Compare this value to 3 to see if they are equal.
                    // reg: /^\d{18}|\d{15}$/, // Optional.[Bool].Default: "" Custom regex.
                    // regMsg: 'failed in reg.test(${value})', // Optional.[String].Default: "" Custom regex error message.
                    // locale: 'en-US', // Optional.[String].Default: "en-US". For error message display. Current options are ['zh-CN', 'en-US']; Default is 'en-US'.
                    // msgOnError: "Your custom error message if you provide the validationOption['msgOnError']", // Optional.[String].Default: "" Show your custom error message no matter what when it has error if it is provied.
                    // msgOnSuccess: "Your custom success message if you provide the validationOption['msgOnSuccess']. Otherwise, it will not show, not even green border." // Optional.[String].Default: "". Show your custom success message no matter what when it has error if it is provied.
                    // customFunc: res => { // Optional.[Func].Default: none. Custom function. Returns true or err message
                    //   if (res != 'milk') {
                    //     return 'Name cannot be other things but milk';
                    //   }
                    //   return true;
                    // }
                }}
            />);
    }
}

export default Input; 
