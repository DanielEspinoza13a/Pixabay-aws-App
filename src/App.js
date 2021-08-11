import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Buscador from './components/Buscador';
import Result from './components/Result';
import { Account } from './AWS-Components/Accounts';
import SignUp from './AWS-Components/SignUp';
import Login from './AWS-Components/Login';
import Status from './AWS-Components/Status';
import Settings from './AWS-Components/Settings';
import ForgotPassword from './AWS-Components/ForgotPassword';

const state = {
  termino: null,
  imagenes: [],
  pagina: 1,
};

function App() {
  const [estado, updateEstado] = useState(state);

  const previousPage = () => {
    updateEstado((prev) => ({ ...prev, pagina: prev.pagina - 1 }));
  };

  const nextPage = () => {
    updateEstado((prev) => ({ ...prev, pagina: prev.pagina + 1 }));
  };

  const url = `https://pixabay.com/api/?key=22497808-addbeb967cf87c35248836e01&q=${estado.termino}&per_page=20&page=${estado.pagina}`;

  const fetchingUrl = useCallback(async () => {
    const data = await fetch(url);
    const dataJson = await data.json();

    updateEstado((prev) => ({ ...prev, imagenes: dataJson.hits }));
  }, [url]);

  useEffect(() => {
    if (!estado.termino) return;

    fetchingUrl();
  }, [estado.termino, estado.pagina, fetchingUrl]);

  return (

    // eslint-disable-next-line react/jsx-filename-extension
    <div className="App container">

      <div className="jumbotron">
        <p className="lead text-center"> Buscador de imagenes </p>

        <Buscador
          datosBusqueda={(termino) => updateEstado((prev) => ({ ...prev, termino }))}
        />

      </div>

      <Account>
        <Status />
        <SignUp />
        <Login />
        <ForgotPassword />
        <Settings />
      </Account>

      <Result
        imagenes={estado.imagenes}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </div>
  );
}

export default App;
