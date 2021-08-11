import { useState, useEffect, useCallback } from 'react';

const state = {
  termino: null,
  imagenes: [],
  pagina: 1,
};

const Fetching = () => {
  const [estado, updateEstado] = useState(state);

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
};

export default Fetching;
