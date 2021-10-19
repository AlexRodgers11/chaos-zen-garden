import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { widthActions } from './store/width';
import './App.css';
import Garden from './Garden';

function App() {
  const fullView = useSelector((state) => state.fullView.fullView);
  const dispatch = useDispatch();
  useEffect(() => {
      let timeoutId = null;
      const resizeListener = () => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            if(fullView) {
              dispatch(widthActions.setWidth({
                appWidth: width,
                pieceWidth: width
              }));
            } else {
              dispatch(widthActions.setWidth({
                appWidth: width,
                pieceWidth: width >= 1000 ? width / 3 : width > 600 ? width / 2 : width
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
