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
  const [ordemSubstituicaoFifo, setOrdemSubstituicaoFifo] = useState<number[]>([])
  const [ordemSubstituicaoLru, setOrdemSubstituicaoLru] = useState<number[]>([])

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

  const verificarRam = (colunaIndex: number) => {    
    if (!logica?.eixox || logica?.eixox.length === 0) return;
    console.log("iniciei o verificarRam")

    // console.log("verifiquei RAM pela ",colunaIndex + 1, "ª vez")

    let ultimaColuna = colunaIndex
    
    // for (let i = 0; i < logica?.eixox.length; i++) {
    for (let i = ultimaColuna; i < colunaIndex+1; i++) {
      // console.log("estou na coluna de tempo " + i)
      //percorre todas as u.t.
      for (let j = 0; j < processos.length; j++) {
        let PaginasRestante = processos[j].paginas
        //percorre todos os processos
        if (logica?.matriz[j][i] == "green") {
          // console.log("identifiquei que o processo ", j+1, "deu green")
          //processo está executando
          // console.log("quem deu green dessa vez foi o processo:" + (j+1))
          // tamanhoDisco = enderecosDisco.length
          let tamanhoDisco = enderecosDisco.length
          // console.log("tamanho do disco é: " + tamanhoDisco)
          //esse for abaixo tá dando loop se for diferente de 0
          for (let k = 0; k < tamanhoDisco; k++) {
            //percorre os slots do disco
            // console.log(enderecosDisco[k].props.nProcesso)
            // console.log(enderecosDisco[0])
            // console.log("o valor de k é:" + k)
            // console.log("o valor no slot k é:" + enderecosDisco[1].props.nProcesso)
            if ((enderecosDisco[k].props.nProcesso) == (j+1)) {
              //achamos o processo que está executando dentro do disco
              // console.log("o green está armazenado no slot " + k + " do disco")
              let ramLivre = 0
              for (let l = 0; l < 50; l++) {
                if (enderecosRam[l].props.nProcesso == 0) {
                  //estou calculando quanto de espaço tem livre na RAM
                  ramLivre += 1
                }
              }
              // console.log("estou com a ram livre de", ramLivre)
              // console.log("meu processo precisa de", PaginasRestante)
              // console.log("valor k é", k)

              //1° for
              if (ramLivre >= PaginasRestante) {
                for (let l = 0; l < 50; l++) {
                  if ((enderecosRam[l].props.nProcesso == 0) && (ramLivre >= PaginasRestante)) {
                    //este endereço da RAM está livre
                    altereiRam(l,j+1)
                    // enderecosRam.splice(l, 0, (<Ram id={l} nProcesso={j+1} />)) //adiciona
                    // enderecosRam.splice(l+1, 1) //remove
                    altereiDisco(k,0)
                    // enderecosDisco.splice(k, 0, (<Disco id={k} nProcesso={0} />)) //adiciona
                    // enderecosDisco.splice(k+1, 1) //remove
                    PaginasRestante -= 1
                    //condição necessária para atualizar a memória pós última coluna
                    if (colunaIndex+1 == logica.eixox.length) {
                      // console.log("NÃO ESTÁ OCORRENDO")
                      setVerifiqueiRam(-1)
                    }
                    // console.log("valor de j+1 =", j+1)
                    if (PaginasRestante == 0) {
                      // console.log("fim do processo", j+1, "e status da OrdemSubstitucaoFifo", ordemSubstituicaoFifo)
                      setOrdemSubstituicaoFifo(Sfifo(ordemSubstituicaoFifo, j+1))
                    }
                    // console.log("array está dando", ordemSubstituicaoFifo, "no fim do for 1")
                    // console.log("Estamos tentando manipular sua RAM")
                    break
                  } 
                }
              } else {
                //gerei todas as páginas dos processos que cabem 100% na RAM antes de substituição

                //2° for
                //ainda tem alguns espaços livres na RAM, mas não o suficiente
                // console.log("estou antes de entrar no 2° for")
                for (let l = 50-ramLivre; l < 50; l++) {
                  // console.log("valor do j é", j)
                  // console.log("valor do k é", k)
                  // console.log("valor do l é", l)
                  altereiRam(l,j+1)
                  altereiDisco(k,0)
                  console.log("preenchendo a ram", l, "que estava vazia. Entrando com o", j+1)
                  PaginasRestante -= 1
                  // break
                }
                if (colunaIndex+1 == logica.eixox.length) {
                  // console.log("NÃO ESTÁ OCORRENDO")
                  setVerifiqueiRam(-1)
                  // console.log("array está dando", ordemSubstituicaoFifo, "no fim do for 2")
                }

                //3° for  
                //RAM sem espaços livres            
                // console.log("o processo", j+1, "falta alocar", PaginasRestante, "páginas")
                // console.log("estou antes de entrar no 3° for")
                
                for (let l = 0; l < 50-ramLivre; l++) {
                  //percorrendo todas as partições da ram, até a RAM que estava livre antes
                  // console.log("o próximo processo a ser substituido é o", ordemSubstituicaoFifo[0])
                  
                  if ((enderecosRam[l].props.nProcesso == ordemSubstituicaoFifo[0]) && (PaginasRestante > 0)) {
                    // console.log("Substituindo a página do processo", ordemSubstituicaoFifo[0], "por", j+1, "no slot", l)
                    // console.log(enderecosRam[l].props.nProcesso, ":", ordemSubstituicaoFifo[0])
                    // console.log("achei o endereço de RAM", l, "quem tem uma página do processo que eu quero")
                    // console.log("falta alocar", PaginasRestante, "páginas")
                    // console.log("a RAM", l, "está recebendo uma página do processo", j+1)
                    altereiRam(l,j+1)
                    // console.log("o disco", k, "está sendo redefinido para ?")
                    // altereiDisco(k,0)
                  //   console.log("valor do j é", j) //processo
                  //   console.log("valor do k é", k) //próxima página do disco a ir pra ram
                  //   console.log("valor do l é", l) //endereço da ram que tem o processo que queremos substituir
                    for (let m = 0; m < enderecosDisco.length; m++) {
                      //página que estava na RAM sendo realocada para o disco
                      if (enderecosDisco[m].props.nProcesso == 0) {                        
                        // console.log("o disco", m, "está sendo redefinido para ?")
                        // console.log("array está dando", ordemSubstituicaoFifo, "no fim do for 3")
                        altereiDisco(m, ordemSubstituicaoFifo[0])
                        altereiDisco(k,0)
                        break
                      }
                    }
                    for (let m = 0; m < enderecosDisco.length; m++) {
                      //processo que foi alocado na RAM tem seu disco zerado
                      if (enderecosDisco[m].props.nProcesso == j+1) {                        
                        // console.log("o disco", m, "está sendo redefinido para ?")
                        // console.log("array está dando", ordemSubstituicaoFifo, "no fim do for 3")
                        altereiDisco(m,0)
                        // altereiDisco(k,0)
                        break
                      }
                    }                  
                    PaginasRestante -= 1
                  //   break
                  }                

                  if (PaginasRestante == 0) {
                    setOrdemSubstituicaoFifo(Sfifo(ordemSubstituicaoFifo, j+1))
                    break
                  } else if ((PaginasRestante > 0) && (l == 50-ramLivre-1)) {
                    console.log("paginasRestantes:", PaginasRestante, "estouNaRam:", l, "meu processo atual:", j+1)
                    let achei = false
                    for (let m = 0; m < enderecosRam.length; m++) {
                      //processo que foi alocado na RAM tem seu disco zerado
                      if (enderecosRam[m].props.nProcesso == ordemSubstituicaoFifo[0]) {    
                        achei = true
                        break
                      }
                    }
                    console.log("substituir:", ordemSubstituicaoFifo[0], "achei:", achei)
                    if (!achei) { 
                      ordemSubstituicaoFifo.shift()
                      console.log("fila de ordem de substituição é:", ordemSubstituicaoFifo)
                      //após a exclusão do processo que acabou, deveria ir para o 1° if desse for
                      // mudouOrdem()
                      verificarRam(colunaIndex) //tenho que garantir que o antigo ordemSubstituicaoFifo[0]
                      //quando verifico novamente, o valor de paginas restante redefine
                    }                  
                  } else if ((PaginasRestante == 0) && (l == 50-ramLivre-1)) {
                    ordemSubstituicaoFifo.shift()
                  }                 
                }
                
                if (colunaIndex+1 == logica.eixox.length) {
                  console.log("NÃO ESTÁ OCORRENDO")
                  setVerifiqueiRam(-1)
                }
              } //alterações no disco e na ram 
            } //fim do if que valido que o processo que deu green tá no disco
          } //fim do for do disco
        } //fim do if de executado
        if (PaginasRestante == 0) {
          break
        }
      } //fim do for de processos
    } //fim do for de colunas
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
    verificarRam(verifiqueiRam)
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
