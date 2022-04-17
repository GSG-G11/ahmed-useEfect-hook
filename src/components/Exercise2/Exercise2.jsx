import React, { useEffect, useState } from 'react';

const Exercise2 = () => {
  const [text, setText] = useState('');
  const [color, setColor] = useState('white');

  const getWindowDimensions = () => {
    const { innerWidth: width } = window;
    return {
      width,
    };
  };

  const updateColor = (x, y) => {
    const { width } = getWindowDimensions();
    setText(() => `I am now on a X: ${x} and Y:${y} screen`);
    if (x > width / 2) setColor('#f5884c');
    else setColor('#00afff');
  };

  useEffect(() => {
    window.addEventListener('mousemove', ({ x, y }) => {
      updateColor(x, y);
      document.body.style.backgroundColor = color;
      document.body.style.color = 'white';
    });

    return () => {
      window.removeEventListener('mousemove', ({ x, y }) => {
        updateColor(x, y);
        document.body.style.backgroundColor = color;
        document.body.style.color = 'white';
      });
    };
  });

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Exercise 2</h1>
      <p
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          fontSize: '1.2rem',
        }}>
        {text}
      </p>
    </div>
  );
};

export default Exercise2;
