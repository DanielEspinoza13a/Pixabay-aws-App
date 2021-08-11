import React from 'react';
import PropTypes from 'prop-types';

const Imagen = (props) => {
  const {
    largeImageURL, likes, tags, previewURL, views,
  } = props;

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card">
        <img src={previewURL} alt={tags} className="card-img-top" />
        <div className="card-body">
          <p className="card-text">
            {likes}
            {' '}
            Likes
            {' '}
          </p>
          <p className="card-text">
            {views}
            {' '}
            Views
            {' '}
          </p>

          <a
            href={largeImageURL}
            target="_blank"
            className="btn btn-primary btn-block"
            rel="noreferrer"
          >
            Ver imagen
          </a>
        </div>
      </div>
    </div>
  );
};

Imagen.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  previewURL: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired,
};

export default Imagen;
