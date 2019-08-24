import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import "react-inputs-validation/lib/react-inputs-validation.min.css";

class SelectWarehouse extends Component {
    render() {
        return (<AsyncSelect
            loadOptions={this.props.loadOptionsWarehouse}
            onInputChange={this.props.test}
        />)
    }
}

export default SelectWarehouse;
