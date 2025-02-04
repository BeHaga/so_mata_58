//versão +- funcional
// tá executando 2 processos ao mesmo tempo 
//e comendo "yellows" no caso teste com sobrecarga = 1

function Eedf (processos: {key: number, tempoDeChegada: number, tempoDeExecucao: number, deadline: number, paginas: number}[], quantum: number, sobrecarga: number) {
    
    const processosCopia: {key: number; tempoDeChegada: number; tempoDeExecucao: number; deadline: number; paginas: number; deadlineCheck: number; estadosProcesso: string[];}[] = [];
    for (let i = 0; i < processos.length; i++) {
        processosCopia.push({key: processos[i].key, tempoDeChegada: processos[i].tempoDeChegada, tempoDeExecucao: processos[i].tempoDeExecucao, deadline: processos[i].deadline, paginas: processos[i].paginas, 
        deadlineCheck: ((processos[i].tempoDeChegada + processos[i].deadline)), estadosProcesso: []})
    }
    
    // usar esse vetor pra fila. Precisa ter os mesmos atributos da Cópia
    const fila: {key: number; tempoDeChegada: number; tempoDeExecucao: number; deadline: number; paginas: number; deadlineCheck: number; estadosProcesso: string[];}[] = [];
    //adicionar aqui os processos finalizados
    const processoTerminou: {key: number; tempoDeChegada: number; tempoDeExecucao: number; deadline: number; paginas: number; deadlineCheck: number; estadosProcesso: string[];}[] = [];

    const processosExecutados = []; // eixo y do gráfico
    const matriz = []; // gráfico completo

    
    let tempoDecorrido = 0; //exe + nda + sobrecarga || determina se algum processo já foi executado
    let tempoGasto = 0; //exe + esp + sobrecarga || usar pra calcular turnaround médio
    // let aux = 0; //exe + esp + sobrecarga + quantum
    // let qtdGreen = 0
    // let qtdRed = 0

    Escalonar()
    function Escalonar() {
      while (processosCopia.length > 0 || fila.length > 0) {
        //1. Adicionar os que chegaram na fila
        for (let i = processosCopia.length - 1; i >=0; i--) {
          if (processosCopia[i].tempoDeChegada <= tempoDecorrido) {
            fila.push(processosCopia[i])
            processosCopia.splice(i, 1)
          }
        }

        // se a fila estiver vazia, só avança o tempoDecorrido
        // se não estiver,  esse bloco ñ executa
        // fazer o tempoDecorrido avançar nas outras condições
        if (fila.length === 0) {
            tempoDecorrido++
            console.log("tempo decorrido:" + tempoDecorrido)
            continue
        }

        //escolher o menor deadline pra processar na marra com um loop manual
        // let processoSelecionado = fila[0];
        //     for (let i = 1; i < fila.length; i++) {
        //         if (fila[i].deadline < processoSelecionado.deadline) {
        //             processoSelecionado = fila[i];
        //         }
        //     }

        //alt pra pegar o menor, dando sort e pegando o primeiro elemento
        fila.sort((a, b) => a.deadlineCheck - b.deadlineCheck)


        let tempoExeRestante = Math.min(fila[0].tempoDeExecucao, quantum)
        console.log("ANTES DE PROCESSAR:" + tempoExeRestante)

        for (let i = 0; i < tempoExeRestante; i++) {
            if (tempoDecorrido > fila[0].deadlineCheck) {
                fila[0].estadosProcesso.push("black")

                //loop pra adicionar "yellow nos outros processos"
                for (let j = 1; j < fila.length; j++) {
                    console.log("deu black. subindo yellow para o processo " + fila[j].key)
                    fila[j].estadosProcesso.push("yellow")
                }
                fila[0].tempoDeExecucao--
                console.log("tempo do processo" + fila[0].tempoDeExecucao)
                tempoDecorrido++;
                tempoGasto++;
                console.log("tempo decorrido processo " + fila[0].key  + " é: " + tempoDecorrido)
                console.log("tempo gatsto:" + tempoGasto)
            } else {
                fila[0].estadosProcesso.push("green")

                //loop pra adicionar "yellow nos outros processos"
                for (let j = 1; j < fila.length; j++) {
                    fila[j].estadosProcesso.push("yellow")
                }
                fila[0].tempoDeExecucao--
                tempoDecorrido++;
                tempoGasto++;
                console.log("tempo decorrido:" + tempoDecorrido)
                console.log("tempo gatsto:" + tempoGasto)
            }
        }

        tempoExeRestante = 0

        //contabilizar sobrecarga || salvar processo finalizado
        //se tiver tempo restante, volta pra fila
        if (fila[0].tempoDeExecucao > 0) {
            for(let i = 0; i < sobrecarga; i++) {
                fila[0].estadosProcesso.push("red")
                console.log("deu red: " + fila[0].tempoDeExecucao)

                //loop pra adicionar "yellow nos outros processos"
                for (let j = 1; j < fila.length; j++) {
                    fila[j].estadosProcesso.push("yellow")
                }
                tempoDecorrido++;
                tempoGasto++;
                console.log("tempo decorrido:" + tempoDecorrido)
                console.log("tempo gatsto:" + tempoGasto)
            }

            processosCopia.push(fila[0])
            fila.splice(0, 1)

        } else { //se já terminou, é adicionado ao vetor de processos finalizados
            processoTerminou.push(fila[0])
            fila.splice(0, 1)
        }

      }
    }

    let tempoMedio = (tempoGasto)/(processoTerminou.length)

    //adicionar "gray" pra simbolizar o tempo antes de cada processo chegar
    processoTerminou.sort((a, b) => a.key - b.key)
    for (let i = 0; i < processoTerminou.length; i++) {
        for (let j = 0; j < processoTerminou[i].tempoDeChegada; j++){
            processoTerminou[i].estadosProcesso.unshift("gray")
        }
    }

    //add estados na matriz
    for (let i = 0; i < processoTerminou.length; i++) {
        matriz.push(processoTerminou[i].estadosProcesso)
        processosExecutados.push(processoTerminou[i].key)
    }

    //creio que isso não ocorra mais
    for (let i = 0; i < matriz.length; i++) {
        while(matriz[i].length < tempoDecorrido) { //antes era tempoDecorrido + 1
            // matriz[i].push("nda")
            matriz[i].push("gray")
        }
    }

    const eixox = []

    for (let i = 0; i < matriz[0].length; i++) {
        eixox.push(i)
    }

    return (
         {
            tempoMedio, processosExecutados, matriz, eixox
        }
    )
}

//para base de teste
//tempo médio esperado: 23
const processosTeste = [
    { key: 1, tempoDeChegada: 0, tempoDeExecucao: 14, deadline: 10, paginas: 1 },
    { key: 2, tempoDeChegada: 2, tempoDeExecucao: 4, deadline: 12, paginas: 1 },
    { key: 3, tempoDeChegada: 4, tempoDeExecucao: 2, deadline: 8, paginas: 1 },
    { key: 4, tempoDeChegada: 6, tempoDeExecucao: 6, deadline: 15, paginas: 1 },
]

// console.log(Eedf(processosTeste, 2, 1))
// console.log(Eedf(processos1, 2, 1))

export default Eedf