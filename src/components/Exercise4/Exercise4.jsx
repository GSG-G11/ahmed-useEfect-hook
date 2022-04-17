import React, { useEffect, useState } from 'react';

const Exercise4 = () => {
  const [search, setSearch] = useState('');
  const [robot, setRobot] = useState('');
  const [error, setError] = useState(false);

  const updateSearch = ({ target: { value } }) => {
    setSearch(value);
  };

  useEffect(() => {
    const abortController = new AbortController();
    let timer = setTimeout(() => {
      fetch(`https://api.codetabs.com/v1/proxy/?quest=https://robohash.org/${search}`, {
        signal: abortController.signal,
      })
        .then((res) => {
          setRobot(res.url);
          setError(false);
        })
        .catch(() => setError(true));
    }, 500);
    return () => {
      // clear up the event listener
      clearTimeout(timer);
      abortController.abort();
    };
  }, [search]);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Exercise 4</h1>
      <input
        type='search'
        value={search}
        onChange={updateSearch}
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '80%',
          fontSize: '1.2rem',
          margin: '0.5rem auto',
        }}
        placeholder='Search...'
      />
      {error && !robot && (
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
          Something went wrong at Robot 💔 try again!
        </p>
      )}
      {!error && robot && (
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
          {robot !== 'https://robohash.org/' ? (
            <img src={robot} alt={robot} width='100' height='100' />
          ) : (
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
              Not found Robot 💔 try again!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Exercise4;
