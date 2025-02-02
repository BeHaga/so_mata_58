import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import Processos from './components/processos/processos.tsx'
import Escolhas from './components/escolhas/escolhas.tsx'
import Quadrado from './components/quadrado/quadrado.tsx'
import Ram from './components/ram/ram.tsx'
import Disco from './components/disco/disco.tsx'
import Efifo from './algoritmos/Efifo.tsx'
import Esjf from './algoritmos/Esjf.tsx'
import Err from './algoritmos/Err.tsx'
import Eedf from './algoritmos/Eedf.tsx'

// interface Processo {
//   id: string;
//   component: JSX.Element;
// }

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function App() {
  // const [count, setCount] = useState(0);
  
  // const [processos, setProcessos] = useState<Processo[]>([]);
  // const [escolhas, setEscolhas] = useState<{escalonamento: string, paginacao: string, quantum: number, sobrecarga: number}[]>([{escalonamento: "FIFO", paginacao: "FIFO", quantum: 1, sobrecarga: 1}]);
  const [escolhas, setEscolhas] = useState<{escalonamento: string, paginacao: string, quantum: number, sobrecarga: number, delay: number}>({escalonamento: "FIFO", paginacao: "FIFO", quantum: 1, sobrecarga: 1, delay: 0.5});
  const [processos, setProcessos] = useState<{key: number, tempoDeChegada: number, tempoDeExecucao: number, deadline: number, paginas: number}[]>([{key: 1, tempoDeChegada: 0, tempoDeExecucao: 1, deadline: 0, paginas: 1}]); {/*key 1 pois precisa de pelo menos um processo*/}
  const [exibirGrafico, setExibirGrafico] = useState(false);
  const [logica, setLogica] = useState<{tempoMedio: number, processosExecutados: number[], matriz: string[][], eixox: number[]}>()
  const [escalonadorSelecionado, setEscalonadorSelecionado] = useState('FIFO');
  const [delayTime, setDelayTime] = useState(500); //tempo sempre estará em ms
  const [colunasVisiveis, setColunasVisiveis] = useState<number[]>([])

  const criarProcesso = () => {
    // setProcessos(true);
    // setProcessos((prev) => [...prev, <Processos key={prev.length} />]);
    // const novoProcesso = {key: processos[-1].key + 1};
    // const inicial = processos[0].key;
    // const novoProcesso = {key: inicial + 1};
    const novoProcesso = {key: processos.length + 1, tempoDeChegada: 0, tempoDeExecucao: 1, deadline: 0, paginas: 1};
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

  const atualizarProcesso = (key: number, updatedValues: Partial<typeof processos[0]>) => {
    setProcessos((prev) => 
      prev.map((p) => (p.key == key ? { ...p, ...updatedValues } : p))
    )
  }

  const atualizarEscolha = (updatedValues: Partial<typeof escolhas>) => {
    setEscolhas((prevEscolhas) => {
      const novasEscolhas = { ...prevEscolhas, ...updatedValues };
      return novasEscolhas;
    })
    // setEscolhas((escolhas) => ({ ...escolhas, ...updatedValues}))
  }

  const resetar = () => {
    setExibirGrafico(false)    
    setProcessos([])
    setProcessos([processos[0]])
    // setProcessos([{key: 1, tempoDeChegada: 0, tempoDeExecucao: 1, deadline: 0, paginas: 1}])
    // setOrdemChegada([]);
  }

  const executar = async () => {
    if (escolhas.escalonamento === 'FIFO') {
      setColunasVisiveis([])
      const escalonador = Efifo(processos);
      setLogica(escalonador)
      setEscalonadorSelecionado('FIFO')
    } else if (escolhas.escalonamento === 'SJF') {
      setColunasVisiveis([])
      const escalonador = Esjf(processos);
      setLogica(escalonador)
      setEscalonadorSelecionado('SJF')
    } else if (escolhas.escalonamento === 'RR') {
      setColunasVisiveis([])
      const escalonador = Err(processos, escolhas.quantum, escolhas.sobrecarga);
      setLogica(escalonador)
      setEscalonadorSelecionado('RR')
    } else if (escolhas.escalonamento === 'EDF') {
      // setColunasVisiveis([])
      // const escalonador = Eedf(processos, escolhas.quantum, escolhas.sobrecarga);
      // setLogica(escalonador)
      // setEscalonadorSelecionado('EDF')      
    }
    await delay(escolhas.delay * 1000)
    setExibirGrafico(true)
  }

  const criarRam = () => {
    const enderecosRam = []
    for (let i = 0; i < 50; i++) {
      enderecosRam.push(<Ram id={i} />)
    }
    return enderecosRam
  }

  const criarDisco = () => {
    const enderecosDisco = []
    for (let i = 0; i < 150; i++) {
      enderecosDisco.push(<Disco id={i} />)
    }
    return enderecosDisco
  }

  useEffect(() => {
    if (!logica?.eixox || logica?.eixox.length === 0) return;

    const mostrarColunasComDelay = async () => {
      for (let i = 0; i < logica.eixox.length; i++) {        
        await delay(escolhas.delay * 1000)
        setColunasVisiveis((prev) => [...prev, i])
      }
    }

    mostrarColunasComDelay();
  }, [logica?.eixox, escolhas.delay])

  return (
    <>          
      <Escolhas 
        escalonamento={escolhas.escalonamento}
        paginacao={escolhas.paginacao}
        quantum={escolhas.quantum}
        sobrecarga={escolhas.sobrecarga}
        delay={escolhas.delay}
        onUpdate={(updatedValues) => atualizarEscolha(updatedValues)}
      />
      <hr />
      <div className='botoes'>
        {!exibirGrafico && (<button className='addProcessos' onClick={criarProcesso}>Adicionar processo</button>)}        
        <button className='botaoExecutar' onClick={executar}>Executar</button>
        <button className='botaoResetarProcessos' onClick={resetar}>Resetar processos</button>
      </div>
      <hr />
      {exibirGrafico && (
        <section className='graficoGantt'>
          <h2>Gráfico de Gantt do algoritmo {escalonadorSelecionado}</h2>
          <h2>Turnaround do algoritmo {escalonadorSelecionado}: {logica?.tempoMedio}</h2>
            <div>
              <div className="container">
                {/*números dos processos em ordem crescente*/}
                <div className="colunaGrafico">
                  {logica?.processosExecutados.map((processo, index) => (
                    <div key={index}>{processo}</div>
                  ))}
                </div>

                {/*colunas dos quadrados e eixo-x*/}
                {logica?.eixox.map((_, colunaIndex) => (
                  colunasVisiveis.includes(colunaIndex) && (
                    <div className="colunaGrafico" key={colunaIndex}>
                    {logica?.matriz.map((linha, linhaIndex) => (
                      <Quadrado key={linhaIndex} color={linha[colunaIndex]} />
                    ))}
                    <div>{logica?.eixox[colunaIndex]}</div>
                  </div>
                  )                  
                ))}
              </div>
            </div>
        </section>
      )}
      {exibirGrafico && (
        <hr />
      )}
      <div className='processos'>
        {/* {processo && <Processos />} */}
        {/* {processos} */}
        {processos.map((processo) => (
          <Processos 
            key={processo.key}
            numero={processo.key}
            tempoDeChegada={processo.tempoDeChegada}
            tempoDeExecucao={processo.tempoDeExecucao}
            deadline={processo.deadline}
            paginas={processo.paginas}
            onDelete={() => excluirProcesso(processo.key)}
            onUpdate={(updatedValues) => atualizarProcesso(processo.key, updatedValues)}
          />
        ))}
      </div>      
      <hr />
      <div className='paginacao'>
        <section>
          <h2>RAM</h2>
          <div className='largura10'>
            {criarRam()}
          </div>
        </section>
        <section>
          <h2>DISCO</h2>
          <div className='largura10'>
            {criarDisco()}
          </div>
        </section>
      </div>
    </>
  )
}

export default App
