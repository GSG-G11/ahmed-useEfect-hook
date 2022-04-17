import React, { useEffect, useState } from 'react';

import Sweat from 'sweetalert2';

const Exercise5 = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(`https://jsonplaceholder.typicode.com/users`, {
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((users) => {
        setIsLoading(false);
        setUsers(users);
        setError(false);
      })
      .catch(() => setError(true));

    return () => {
      // clear up the event listener
      abortController.abort();
    };
  }, []);

  const loadingRender = () => {
    return isLoading && !error && <p>Loading...</p>;
  };
  const errorRender = () => {
    return !users && error && <p>Sorry Something Was Wrong</p>;
  };

  const deleteUser = (id) => {
    Sweat.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers((prevues) =>
          prevues.filter(({ id: personId }) => personId !== id),
        );
        Sweat.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  };

  const updateUser = (userId) => {
    Sweat.fire({
      title: 'Update Your username',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Update',
      showLoaderOnConfirm: true,
      preConfirm: (username) => {
        if (username.trim() !== '') {
          setUsers((prevues) =>
            prevues.map((person) =>
              person.id === userId
                ? { ...person, name: username.trim() }
                : person,
            ),
          );
        }
      },
    });
  };

  const hasUsers = () => {
    return users.length > 0;
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Exercise 5</h1>
      {loadingRender()}
      {errorRender()}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          margin: '0.5rem auto',
          gap: '30px',
          width: '90%',
          height: '100%',
        }}>
        {!error &&
          !isLoading &&
          hasUsers() &&
          users.map(({ id, name }) => {
            return (
              <div
                key={id}
                style={{
                  padding: '0.5rem 1.2rem',
                  background: '#2a2a2a',
                  color: 'white',
                  margin: '0.5rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  borderRadius: '8px',
                }}>
                <h3>{name}</h3>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.8rem',
                    marginTop: 'auto',
                  }}>
                  <button
                    style={{ color: 'white', background: '#f5884c' }}
                    onClick={() => deleteUser(id)}>
                    Delete
                  </button>
                  <button
                    style={{ color: 'white', background: '#00afff' }}
                    onClick={() => updateUser(id)}>
                    Edit
                  </button>
                </div>
              </div>
            );
          })}

        {!error && !isLoading && !hasUsers() && (
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
            Not found Users 💔 try again!
          </p>
        )}
      </div>
    </div>
  );
};

export default Exercise5;
