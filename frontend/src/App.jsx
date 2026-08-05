import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {


  return (
    <div>
      <img src={heroImg} className="base" width="170" height="179" alt="" />
      <img src={reactLogo} className="framework" alt="React logo" />
      <img src={viteLogo} className="vite" alt="Vite logo" />

      <div>
        <h1>hello react</h1>
        <h2>hello itcp318</h2>
      </div>
    </div>











  )
}

export default App
