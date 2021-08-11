/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import Imagen from './Images';
import Pagination from './pagination';

function Result(props) {
  const mostrarImagenes = () => {
    const imagenes = props.imagenes || [];

    return (
      <div>
        <div className="col-12 p-5 row">
          {imagenes.map((imagen) => (
            <Imagen
              key={imagen.id}
              {...imagen}
              // averiguar por que esto funciona
            />
          ))}
        </div>
        <Pagination
          previousPage={props.previousPage}
          nextPage={props.nextPage}
        />
      </div>
    );
  };

  return <div>{mostrarImagenes()}</div>;
}

Result.propTypes = {
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  imagenes: PropTypes.arrayOf(PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
    previewURL: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
  })).isRequired,

};

export default Result;
