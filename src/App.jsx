import { createContext, useState } from 'react'
import './App.css'
import Router from './Router/Router'
import { Image } from '@mantine/core';
import '@mantine/charts/styles.css';
import axios from 'axios';
export const ModeContext = createContext()

function App() {
  let root = document.querySelector("#root");

  //Colors
  const [primaryColor, setPrimaryColor] = useState('#B21222');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [color, setColor] = useState('black');
  const [gcolor, setGColor] = useState('grey');

  //Mode
  const [dark, setDark] = useState(()=>{
    const saveMode=localStorage.getItem('dark');
    return saveMode=='true'?true:false
  });
  if (dark) {
    root.classList.add("dark");
  } else root.classList.remove("dark");

  //Translate
  const [en, setEn] = useState(false)
  if (en) {
    root.classList.add("en");
  } else root.classList.remove("en");

  return (
    <ModeContext.Provider value={{ primaryColor, setPrimaryColor, dark, setDark, bgColor, setBgColor, color, setColor, gcolor, setGColor, en, setEn }}>
      <Image style={{ position: 'absolute', height: '86%', top: 80 }}
        src="/assets/images/background.png" />
      <Router />
    </ModeContext.Provider>
  )
}

export default App
