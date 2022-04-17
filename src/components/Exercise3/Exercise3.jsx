import React, { useEffect, useState } from 'react';

const Exercise3 = () => {
  const [search, setSearch] = useState('');
  const [gif, setGif] = useState([]);
  const [error, setError] = useState(false);

  const updateName = ({ target: { value } }) => {
    setSearch(value);
  };

  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
    const abortController = new AbortController();

    let timer = setTimeout(() => {
      fetch(
        `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=BTaqkVbWbQ4xauEOt2bf6UpHJtHoqcrY`,
        {
          signal: abortController.signal,
        },
      )
        .then((res) => res.json())
        .then(({ data }) => {
          setGif(data);
        })
        .catch(() => setError(true));
    }, 500);

    return () => {
      // clear up the event listener
      clearTimeout(timer);
      abortController.abort();
    };
  }, [search]);

  const isEmpty = () => {
    return gif.length === 0;
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Exercise 3</h1>

      <input
        type='search'
        value={search}
        onChange={updateName}
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '80%',
          fontSize: '1.2rem',
          margin: '0.5rem auto',
        }}
        placeholder='Search...'
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0.5rem auto',
          flexWrap: 'wrap',
          width: '100%',
          height: '100%',
        }}>
        {!isEmpty() &&
          gif.map(
            ({
              id,
              slug,
              images: {
                original: { url },
              },
            }) => {
              return (
                <div key={id}>
                  <img src={url} alt={slug} width='100' height='100' />
                </div>
              );
            },
          )}
        {isEmpty() && (
          <p
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0.5rem auto',
              flexWrap: 'wrap',
              width: '100%',
              height: '100%',
            }}>
            Not found GIF 💔 try again!
          </p>
        )}

        {!isEmpty() && error && (
          <p
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0.5rem auto',
              flexWrap: 'wrap',
              width: '100%',
              height: '100%',
            }}>
            Sorry something was wrong at GIF 💔 try again!
          </p>
        )}
      </div>
    </div>
  );
};

export default Exercise3;
