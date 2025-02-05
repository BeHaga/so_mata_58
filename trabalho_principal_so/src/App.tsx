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
import Sfifo from './algoritmoSubstituicao/Sfifo.tsx'
import Slru from './algoritmoSubstituicao/Slru.tsx'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function App() {
  // const [count, setCount] = useState(0);
  
  // const [processos, setProcessos] = useState<Processo[]>([]);
  // const [escolhas, setEscolhas] = useState<{escalonamento: string, paginacao: string, quantum: number, sobrecarga: number}[]>([{escalonamento: "FIFO", paginacao: "FIFO", quantum: 1, sobrecarga: 1}]);
  const [escolhas, setEscolhas] = useState<{escalonamento: string, paginacao: string, quantum: number, sobrecarga: number, delay: number}>({escalonamento: "FIFO", paginacao: "FIFO", quantum: 1, sobrecarga: 1, delay: 0.5});
  const [processos, setProcessos] = useState<{key: number, tempoDeChegada: number, tempoDeExecucao: number, deadline: number, paginas: number}[]>([{key: 1, tempoDeChegada: 0, tempoDeExecucao: 1, deadline: 0, paginas: 1}]); {/*key 1 pois precisa de pelo menos um processo*/}
  const [exibirGrafico, setExibirGrafico] = useState<boolean>(false);
  const [logica, setLogica] = useState<{tempoMedio: number, processosExecutados: number[], matriz: string[][], eixox: number[]}>()
  const [escalonadorSelecionado, setEscalonadorSelecionado] = useState('FIFO');
  const [delayTime, setDelayTime] = useState(500); //tempo sempre estará em ms
  const [colunasVisiveis, setColunasVisiveis] = useState<number[]>([])
  const [tamanhoDisco, setTamanhoDisco] = useState(0);
  const [enderecosDisco, setEnderecosDisco] = useState<JSX.Element[]>([])
  const [enderecosRam, setEnderecosRam] = useState<JSX.Element[]>([])
  const [verifiqueiRam, setVerifiqueiRam] = useState<number>(-1);
  const [ordemSubstituicao, setOrdemSubstituicao] = useState<number[]>([])

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
  }

  const resetar = () => {
    setExibirGrafico(false)    
    setProcessos([])
    setProcessos([processos[0]])
  }

  const executar = async () => {
    setOrdemSubstituicao([])
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
      setColunasVisiveis([])
      const escalonador = Eedf(processos, escolhas.quantum, escolhas.sobrecarga);
      setLogica(escalonador)
      setEscalonadorSelecionado('EDF')      
    }
    await delay(escolhas.delay * 1000)
    setExibirGrafico(true)
  }
  
  const criarDisco = () => {
    console.log("Criando o disco...")

    let novosEnderecosDisco: JSX.Element[] = []
    let aux = 0;

    for (let j = 0; j < processos.length; j++) {
      for (let k = 0; k < processos[j].paginas; k++) {
        novosEnderecosDisco.push(<Disco id={aux} nProcesso={j+1} />)
        aux += 1
      }
    }
    console.log("Disco foi criado")
    setEnderecosDisco(novosEnderecosDisco)
    return novosEnderecosDisco
  }

  const criarRam = () => {
    console.log("Criando a RAM...")

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

  function procuraGreen(linha: number, coluna: number) {
    if (!logica?.eixox || logica?.eixox.length === 0) return;
    let lin = linha
    let col = coluna
    let achei = -1
    for (let i = 0; i < lin; i++) {
      if (logica?.matriz[i][col] == "green") {
        console.log("procura Green disse que achou o processo", i+1, "dando green")
        achei = i
        break
      }
    }
    return achei
  }

  const verificarRam = (colunaIndex: number, paginasFaltantes: number) => {    
    if (!logica?.eixox || logica?.eixox.length === 0) return;
    console.log("iniciei o verificarRam")

    const processoGreen = procuraGreen(processos.length, colunaIndex)
    
    if (processoGreen === undefined || processoGreen === -1) return;

    let PaginasRestante = paginasFaltantes

    if (PaginasRestante == 0) {
      PaginasRestante = processos[processoGreen].paginas
    }

    //processo está executando, ou seja, dando green
    let tamanhoDisco = enderecosDisco.length
    
    //esse for abaixo tá dando loop se for diferente de 0
    for (let k = 0; k < tamanhoDisco; k++) {
      //percorre os slots do disco
      if ((enderecosDisco[k].props.nProcesso) == (processoGreen+1)) {
        //achamos uma página do processo que está executando dentro do disco
        let ramLivre = 0
        for (let l = 0; l < 50; l++) {
          if (enderecosRam[l].props.nProcesso == 0) {
            //estou calculando quanto de espaço tem livre na RAM
            ramLivre += 1
          }
        }

        //tem RAM livre suficiente para alocar todas as páginas do processo que está executando
        if (ramLivre >= PaginasRestante) {
          for (let l = 0; l < 50; l++) {
            if ((enderecosRam[l].props.nProcesso == 0) && (ramLivre >= PaginasRestante)) {
              //este endereço da RAM está livre
              altereiRam(l,processoGreen+1)
              altereiDisco(k,0)
              PaginasRestante -= 1
              //condição necessária para atualizar a memória pós última coluna
              if (colunaIndex+1 == logica.eixox.length) {
                setVerifiqueiRam(-1)
              }
              if (PaginasRestante == 0) {
                if (escolhas.paginacao == 'LRU') {
                  setOrdemSubstituicao(Slru(ordemSubstituicao, processoGreen+1))
                } else {                        
                  setOrdemSubstituicao(Sfifo(ordemSubstituicao, processoGreen+1))
                }
              }
              break
            } 
          }
        } else {
          //gerei todas as páginas dos processos que cabem 100% na RAM antes de substituição, mas faltou esse processo

          //ainda tem alguns espaços livres na RAM, mas não o suficiente
          for (let l = 50-ramLivre; l < 50; l++) {
            //preenchendo a ram que estava vazia com páginas do processo que está executando
            altereiRam(l,processoGreen+1)
            altereiDisco(k,0)
            PaginasRestante -= 1
          }

          //RAM está sem espaços livres         
          for (let l = 0; l < 50-ramLivre; l++) {
            //percorrendo todas as partições da ram, até a RAM que estava livre antes
            
            if ((enderecosRam[l].props.nProcesso == ordemSubstituicao[0]) && (PaginasRestante > 0)) {
              //substituindo uma página do processo que estava em 1° na ordem de substituição por uma página do processo que está executando
              altereiRam(l,processoGreen+1)
              for (let m = 0; m < enderecosDisco.length; m++) {
                //página que estava na RAM sendo realocada para o disco
                if (enderecosDisco[m].props.nProcesso == 0) {
                  altereiDisco(m, ordemSubstituicao[0])
                  // altereiDisco(k,0)
                  break
                }
              }
              for (let m = 0; m < enderecosDisco.length; m++) {
                //processo que foi alocado na RAM tem seu disco zerado
                if (enderecosDisco[m].props.nProcesso == processoGreen+1) {
                  altereiDisco(m,0)
                  break
                }
              }                  
              PaginasRestante -= 1
            }                

            if (PaginasRestante == 0) {
              if (escolhas.paginacao == 'LRU') {
                setOrdemSubstituicao(Slru(ordemSubstituicao, processoGreen+1))
              } else {                        
                setOrdemSubstituicao(Sfifo(ordemSubstituicao, processoGreen+1))
              }
              break
            } else if ((PaginasRestante > 0) && (l == 50-ramLivre-1)) {
              let achei = false
              for (let m = 0; m < enderecosRam.length; m++) {
                //processo que foi alocado na RAM tem seu disco zerado
                if (enderecosRam[m].props.nProcesso == ordemSubstituicao[0]) {    
                  achei = true
                  break
                }
              }
              if (!achei) {
                //não achei nenhuma página do 1º processo a ser substituido dentro da RAM, logo vou remover ele da fila de substituição  
                ordemSubstituicao.shift()
                //preciso continuar a verificação com as páginas de outros processos
                verificarRam(colunaIndex, PaginasRestante)
              }                  
            } else if ((PaginasRestante == 0) && (l == 50-ramLivre-1)) {
              ordemSubstituicao.shift()
            }
            if ((l == 50-ramLivre-1) && (colunaIndex+1 == logica.eixox.length)) {
              //se for a última coluna, set -1 para o useEffect exibir a adição do último green na RAM
              console.log("Encerei tudo aqui!")
              setVerifiqueiRam(-1)
            }           
          }
        } //alterações no disco e na ram 
      } //fim do if que valido que o processo que deu green tá no disco
    } //fim do for do disco
  }

  const altereiRam = (num: number, pro: number) => {
    const id = num
    const processo = pro
    enderecosRam.splice(id, 0, <Ram id={id} nProcesso={processo} />) //adiciona
    enderecosRam.splice(id+1, 1) //remove
  }

  const altereiDisco = (num: number, pro: number) => {
    const id = num
    const processo = pro
    enderecosDisco.splice(id, 0, <Disco id={id} nProcesso={processo} />) //adiciona
    enderecosDisco.splice(id+1, 1) //remove
  }

  useEffect(() => {
    if (!logica?.eixox || logica?.eixox.length === 0) return;

    const mostrarColunasComDelay = async () => {
      criarDisco()
      criarRam()
      for (let i = 0; i < logica.eixox.length; i++) {        
        await delay(escolhas.delay * 1000)
        setColunasVisiveis((prev) => [...prev, i])
        setVerifiqueiRam(i)
      }
    }

    mostrarColunasComDelay();
  }, [logica?.eixox])

  useEffect(() => {
    if (verifiqueiRam == -1) { //coloquei esse if para não criar disco e ram ao predefinir o valor de exibirGrafico no useState
      return;
    }
    verificarRam(verifiqueiRam, 0)
  }, [verifiqueiRam])

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
              {enderecosDisco.map((endereco) => (
                endereco
              ))}
            </div>
          </section>
          <section>
            <h2>RAM</h2>
            <div className='largura10'>
              {enderecosRam.map((endereco) => (
                endereco
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export default App
