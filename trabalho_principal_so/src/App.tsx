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
  const [processos, setProcessos] = useState<{key: number}[]>([{key: 1}]); {/*key 1 pois precisa de pelo menos um processo*/}

  const criarProcesso = () => {
    // setProcessos(true);
    // setProcessos((prev) => [...prev, <Processos key={prev.length} />]);
    // const novoProcesso = {key: processos[-1].key + 1};
    // const inicial = processos[0].key;
    // const novoProcesso = {key: inicial + 1};
    const novoProcesso = {key: processos.length + 1};
    setProcessos((prev) => [...prev, novoProcesso]);
  };

  const excluirProcesso = (key: number) => {
    if (processos.length > 1) {
      setProcessos((prev) => {
        const processosRestantes = prev.filter((processo) => processo.key !== key);
        
        const processosKeysAtualizadas = processosRestantes.map((processo, index) => ({
          ...processo,
          key: index + 1,
        }));
        return processosKeysAtualizadas;
      })
    }    
  };

  return (
    <>
      <Escolhas />
      <button className='addProcessos' onClick={criarProcesso}>Adicionar processo</button>
      <div className='processos'>
        {/* {processo && <Processos />} */}
        {/* {processos} */}
        {processos.map((processo) => (
          <Processos 
            key={processo.key}
            numero={processo.key}
            onDelete={() => excluirProcesso(processo.key)}
          />
        ))}
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
