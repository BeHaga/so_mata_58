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
  const [tamanhoDisco, setTamanhoDisco] = useState(0);
  const [enderecosDisco, setEnderecosDisco] = useState<JSX.Element[]>([])
  const [enderecosRam, setEnderecosRam] = useState<JSX.Element[]>([])

  const criarProcesso = () => {
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

  // const enderecosDisco: JSX.Element[] = []
  // let tamanhoDisco = 0
  
  const criarDisco = () => {
    console.log("Criando o disco")

    let novosEnderecosDisco: JSX.Element[] = []
    let aux = 0;

    for (let j = 0; j < processos.length; j++) {
      for (let k = 0; k < processos[j].paginas; k++) {
        novosEnderecosDisco.push(<Disco id={aux} nProcesso={j+1} />)
        aux += 1
      }
    }

    for (let i = 0; i < novosEnderecosDisco.length; i++) {
      console.log("Na partição :" + i + " está página do processo: " + novosEnderecosDisco[i].props.nProcesso)
    }

    console.log("tamanho do disco antes do preenchimento: " + novosEnderecosDisco.length)

    for (let i = novosEnderecosDisco.length; i < 150; i++) {
      novosEnderecosDisco.push(<Disco id={i} nProcesso={0} />)
    }
    console.log("tamanho final do disco é: " + novosEnderecosDisco.length)
    setEnderecosDisco(novosEnderecosDisco)
    // setTamanhoDisco(novosEnderecosDisco.length)
    return novosEnderecosDisco
  }

  useEffect(() => {
    criarDisco()
    criarRam()
  }, [exibirGrafico, executar])
  // }, [exibirGrafico])

  const criarRam = () => {
    console.log("Criando a RAM")

    let novosEnderecosRam: JSX.Element[] = []

    if (novosEnderecosRam.length == 0) {
      for (let i = 0; i < 50; i++) {
        novosEnderecosRam.push(<Ram id={i} nProcesso={0} />)
      }
    }
    console.log("RAM foi criada")
    setEnderecosRam(novosEnderecosRam)
    return novosEnderecosRam
  }  

  // const enderecosRam: JSX.Element[] = []
  // if (enderecosRam.length == 0) {
  //   for (let i = 0; i < 50; i++) {
  //     enderecosRam.push(<Ram id={i} nProcesso={0} />)
  //   }
  // }
  // const criarRam = () => {
  //   console.log("RAM foi criada")
  //   return enderecosRam
  // }

  let ultimaColuna = 0

  const verificarRam = (colunaIndex: number) => {    
    if (!logica?.eixox || logica?.eixox.length === 0) return;

    console.log("Estamos verificando sua RAM")
    console.log("valor da ultima coluna:" + ultimaColuna)
    console.log("valor da coluna index:" + colunaIndex)
    console.log("lembrando que ultimaColuna tem que ser < colunaIndex")
    
    // // for (let i = 0; i < logica?.eixox.length; i++) {
    // for (let i = ultimaColuna; i < colunaIndex+1; i++) {
    //   console.log("estou na unidade de tempo" + i)
    //   //percorre todas as u.t.
    //   for (let j = 0; j < processos.length; j++) {
    //     //percorre todos os processos
    //     if (logica?.matriz[j][i] == "green") {
    //       //processo está executando
    //       console.log("quem deu green dessa vez foi o processo:" + (j+1))
    //       // tamanhoDisco = enderecosDisco.length
    //       let tamanhoDisco = enderecosDisco.length
    //       console.log("tamanho do disco é: " + tamanhoDisco)
    //       //esse for abaixo tá dando loop se for diferente de 0
    //       for (let k = 0; k < tamanhoDisco; k++) {
    //         //percorre os slots do disco
    //         // console.log(enderecosDisco[k].props.nProcesso)
    //         console.log(enderecosDisco[0])
    //         // console.log("o valor de k é:" + k)
    //         // console.log("o valor no slot k é:" + enderecosDisco[1].props.nProcesso)
    //         if ((enderecosDisco[k].props.nProcesso) == (j+1)) {
    //           //achamos o processo que está executando dentro do disco
    //           console.log("o green está armazenado no slot: " + k + " do disco")
    //           for (let l = 0; l < 50; l++) {
    //             if (enderecosRam[l].props.nProcesso == 0) {
    //               //esta livre
    //               enderecosRam.splice(l, 0, (<Ram id={l} nProcesso={j+1} />)) //adiciona
    //               enderecosRam.splice(l+1, 1) //remove
    //               enderecosDisco.splice(k, 0, (<Disco id={k} nProcesso={0} />)) //adiciona
    //               enderecosDisco.splice(k+1, 1) //remove
    //               console.log("Estamos tentando manipular sua RAM")
    //               break
    //             }
    //           }
    //         }

    //       }
    //     }
    //   }
    // }
    ultimaColuna += 1
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

  useEffect(() => {
    {exibirGrafico && logica?.eixox.map((_, colunaIndex) => (
      colunasVisiveis.includes(colunaIndex) && verificarRam(colunaIndex)
  ))}
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
      {exibirGrafico && (
        <div className='paginacao'>
          <section>
            <h2>DISCO</h2>
            <div className='largura10'>
              {/* {criarDisco()} */}
              {enderecosDisco.map((endereco) => (
                endereco
              ))}
            </div>
          </section>
          <section>
            <h2>RAM</h2>
            <div className='largura10'>
              {/* {criarRam()} */}
              {enderecosRam.map((endereco) => (
                endereco
              ))}
            </div>
            {/* {logica?.eixox.map((_, colunaIndex) => (
                colunasVisiveis.includes(colunaIndex) && (                  
                  <div className='largura10' key={colunaIndex}>
                    {verificarRam(colunaIndex)}
                  </div>
                )                
            ))} */}
          </section>
        </div>
      )}
    </>
  )
}

export default App
