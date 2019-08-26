import React, { Component } from 'react';
import Select from 'react-select/async';
import "react-inputs-validation/lib/react-inputs-validation.min.css";

class SelectWarehouse extends Component {
    render() {
        return (<Select options={this.props.warehouses} onChange={this.props.test} />)
    }
}

export default SelectWarehouse;
