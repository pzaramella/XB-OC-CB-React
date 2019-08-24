import React from 'react';
import './App.css';
import OrderForm from './views/OrderForm'

/* Routes */
/* Nav, autentification, error bundle */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Formulario de Ordenes de Compra - CB</h3>
      </header>
      <OrderForm />
    </div>
  );
}

export default App;
