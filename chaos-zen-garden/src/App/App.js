import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sizeActions } from '../store/size';
import './App.css';
import Garden from '../Garden';

function App() {
  const fullView = useSelector((state) => state.size.fullView);
  const dispatch = useDispatch();
  useEffect(() => {
      let timeoutId = null;
      const resizeListener = () => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            if(fullView) {
              dispatch(sizeActions.setSize({
                appWidth: width,
                pieceWidth: width,
                appHeight: height
              }));
            } else {
              dispatch(sizeActions.setSize({
                appWidth: width,
                pieceWidth: width >= 1000 ? width / 3 : width > 600 ? width / 2 : width,
                appHeight: height
              }));
            }
          }, 250) 
      };
      window.addEventListener('resize', resizeListener);

      return () => {
          window.removeEventListener('resize', resizeListener);
      }
  }, []);

  return (
    <div className="App">
      <Garden />
    </div>
  );
}

export default App;
