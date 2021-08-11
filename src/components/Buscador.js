import React from 'react';
import PropTypes from 'prop-types';

function Buscador(props) {
  const busquedaRef = React.createRef();

  const handleData = (e) => {
    e.preventDefault();

    const termino = busquedaRef.current.value;

    props.datosBusqueda(termino);
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <form onSubmit={handleData}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            ref={busquedaRef}
            type="text"
            className="form-control
                    form-control-lg"
            placeholder="busca tu imagen. Ejemplo Futbol"
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger"
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </form>
  );
}

Buscador.propTypes = {
  datosBusqueda: PropTypes.func.isRequired,

};

export default Buscador;
