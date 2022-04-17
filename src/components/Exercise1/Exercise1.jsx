import React, { useState, useEffect } from 'react';

const Exercise1 = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((count) => count + 1);
  };

  useEffect(() => {
    window.addEventListener('mousedown', incrementCount);

    return () => {
      window.removeEventListener('mousedown', incrementCount);
    };
  });

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Exercise 1</h1>
      <p style={{ textAlign: 'center' }}>You clicked {count} times</p>
    </div>
  );
};

export default Exercise1;
