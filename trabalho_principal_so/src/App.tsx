import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import Processos from './components/processos/processos.tsx'
import Escolhas from './components/escolhas/escolhas.tsx'

// interface Processo {
//   id: string;
//   component: JSX.Element;
// }

function App() {
  // const [count, setCount] = useState(0);
  
  // const [processos, setProcessos] = useState<Processo[]>([]);
  const [processos, setProcessos] = useState<JSX.Element[]>([]);

  const criarProcesso = () => {
    // setProcessos(true);
    setProcessos((prev) => [...prev, <Processos key={prev.length} />]);
  };

  return (
    <>
      <Escolhas></Escolhas>
      <button className='addProcessos' onClick={criarProcesso}>Adicionar processo</button>
      <div className='processos'>
        {/* {processo && <Processos />} */}
        {processos}
      </div>
      {/* <Processos></Processos> */}



      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
