import React from 'react'
import { useState, useEffect } from 'react';

export const ScreenSize = () => {



const [mobileView, setMobileView] = useState(false);
const [screenSize, setScreenSize] = useState(null);

useEffect(() => {
const handleResize = () => setScreenSize(window.innerWidth);

window.addEventListener('resize', handleResize);

handleResize();

return () => window.removeEventListener('resize', handleResize);
}, []);

useEffect(() => {
if (screenSize <= 600) {
    setMobileView(true);
} else {
    setMobileView(false);
}
  }, [screenSize]);



  return mobileView
}

