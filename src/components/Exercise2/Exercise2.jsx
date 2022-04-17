import React, { useEffect, useState } from 'react';

const Exercise2 = () => {
  const [text, setText] = useState('');

  const getWindowDimensions = () => {
    const { innerWidth: width } = window;
    return {
      width,
    };
  };

  useEffect(() => {
    window.addEventListener('mousemove', ({ x, y }) => {
      const { width } = getWindowDimensions();

      setText(() => `I am now on a X: ${x} and Y:${y} screen`);

      document.body.style.color = 'white';
      // if mouseX is bigger than the half then apply #f5884c color
      if (x > width / 2) document.body.style.backgroundColor = '#f5884c';
      else document.body.style.backgroundColor = '#00afff';
    });

    return () => {
      window.removeEventListener('mousemove', ({ x, y }) => {
        const { width } = getWindowDimensions();

        setText(() => `I am now on a X: ${x} and Y:${y} screen`);

        document.body.style.color = 'white';
        // if mouseX is bigger than the half then apply #f5884c color
        if (x > width / 2) document.body.style.backgroundColor = '#f5884c';
        else document.body.style.backgroundColor = '#00afff';
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
