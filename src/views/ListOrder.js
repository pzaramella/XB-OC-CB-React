import React, { Fragment } from 'react';
import MaterialTable from 'material-table';
import { Divider } from '@material-ui/core';
import { Redirect } from 'react-router-dom'

export default function ListOrders() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Surname', field: 'surname' },
            { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
            {
                title: 'Birth Place',
                field: 'birthCity',
                lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            },
        ],
        data: [
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            {
                name: 'Zerya Betül',
                surname: 'Baran',
                birthYear: 2017,
                birthCity: 34,
            },
        ],
    });

    function hola() {
        alert("Hola XD")
    }

    function renderRedirect(e) {
        //Condition for validate user y/o save cookie autentication
        return <Redirect to='/registro' />
    }

    return (
        <Fragment>
            <div>
                <MaterialTable
                    title="Listado de ordenes registradas"
                    columns={state.columns}
                    data={state.data}
                />
                <button onClick={renderRedirect}>Agregar nueva orden</button>
            </div>
        </Fragment>
    );
}