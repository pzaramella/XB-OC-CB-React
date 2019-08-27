import React, {Component} from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import {Textbox} from 'react-inputs-validation'
import 'react-inputs-validation/lib/react-inputs-validation.min.css'

class Input extends Component {
  constructor(props) {
    super(props)

    this.state = {
      validate: this.props.validate,
      placeholder: `Please complete the ${this.props.name}`,
      hasError: true
    }

    this.validateForm = this.validateForm.bind(this)
  }

  toggleValidating(validate) {
    this.setState({validate})
  }

  validateForm(e) {
    e.preventDefault()
    this.toggleValidating(true)
    const {hasError} = this.state

    if (!hasError) {
      alert('All validated!')
    }
  }

  render() {
    return (
      <>
        <InputLabel htmlFor="age-simple" style={{marginBottom: '5px'}}>
          {this.props.name}
        </InputLabel>
        <div style={{marginBottom: '20px'}}>
          <Textbox
            id={this.props.id}
            name={this.props.name}
            type={this.props.type}
            value={this.props.value}
            onChange={(name, e) => {
              this.props.test(name, e)
            }}
            onBlur={e => {}}
            validationOption={{
              name: this.props.name,
              check: true,
              required: true
            }}
          />
        </div>
      </>
    )
  }
}

export default Input
