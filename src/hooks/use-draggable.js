import {useEffect, useState} from 'react'

export default function useDraggable(id) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handle = document.getElementById('handle');
    // when mousedown
    handle.addEventListener('mousedown', function (e) {
      // prevents event bubbling
      e.preventDefault();
      handle.style.pointerEvents = 'none';

      // while mousedown, listen for mousemove
      document.body.addEventListener('mousemove', move);
      // when mouseup, remove mousemove
      document.body.addEventListener('mouseup', () => {
        document.body.removeEventListener('mousemove', move);
        handle.style.pointerEvents = 'initial';
      });
    });
    return () => {
      // clean up all the event listeners
      document.body.removeEventListener('mousedown', move);
      document.body.removeEventListener('mouseup', move);
      document.body.removeEventListener('mousemove', move);
    };
  }, []);

  function move(e) {
    const pos = {
      // x and y position of the mouse
      x: e.clientX,
      y: e.clientY,
    };
    // setPosition to current position of the mouse
    setPosition(pos);
  }

  return {
    position
  }

}

