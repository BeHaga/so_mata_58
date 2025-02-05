function Err (processos: {key: number, tempoDeChegada: number, tempoDeExecucao: number, deadline: number, paginas: number}[], quantum: number, sobrecarga: number) {
    const processosIniciais: {key: number; tempoDeChegada: number; tempoDeExecucao: number; deadline: number; paginas: number; tempoExecutado: number; estadosProcesso: string[];}[] = [];
    const processosExecutados = [];
    const matriz = [];
    const fila: number[] = [];

    for (let i = 0; i < processos.length; i++) {
        processosIniciais.push({key: processos[i].key, tempoDeChegada: processos[i].tempoDeChegada, tempoDeExecucao: processos[i].tempoDeExecucao, deadline: processos[i].deadline, paginas: processos[i].paginas, tempoExecutado: 0, estadosProcesso: []})
    }

    function isFila (i: number) {
        if (fila.includes(i)) {

        } else {
            fila.push(i)
        }
    }

    let tempoDecorrido = 0; //exe + nda + sobrecarga || determina se algum processo já foi executado
    let tempoGasto = 0; //exe + esp + sobrecarga

    // let aux = 0; //exe + esp + sobrecarga + quantum
    let qtdGreen = 0
    let qtdRed = 0

    // uso ela caso alguma variavel chegue durante a execucao do red
    let sobrecargaAcabou: number[] = [];

    let processoAcabou: number[] = [];
    
    Executar()
    function Executar () {
        for (let i = 0; i < processosIniciais.length; i++) {
            if (processosIniciais[i].tempoDeChegada == tempoDecorrido) {
                isFila(i)
            }
            //o processo está esperando
            if ((fila.includes(i)) && (i != fila[0])) {
                console.log("Sou o processo: " + processosIniciais[i].key + " e estou esperando")
                // aux += 1
                tempoGasto += 1
                processosIniciais[i].estadosProcesso.push("yellow")
            //o processo executou
            } else if (i == fila[0]) {
                //se não estourou o quantum
                if ((qtdGreen < quantum)) {
                    console.log("Sou o processo: " + processosIniciais[i].key + " e estou executando")
                    tempoGasto += 1
                    // tempoDecorrido += 1
                    processosIniciais[i].tempoExecutado += 1
                    processosIniciais[i].estadosProcesso.push("green")
                    qtdGreen += 1
                //se estourou o quanto
                } else if ((qtdGreen == quantum) && ((processosIniciais[i].tempoDeExecucao - processosIniciais[i].tempoExecutado) > 0) && (qtdRed < sobrecarga)) {
                    processosIniciais[i].estadosProcesso.push("red")
                    tempoGasto += 1
                    // tempoDecorrido += 1
                    qtdRed += 1
                    console.log("Sou o processo: " + processosIniciais[i].key + " e estou em sobrecarga")
                }
                //se já imprimiu todos os reds
                if (qtdRed == sobrecarga) {
                    qtdGreen = 0
                    qtdRed = 0
                    sobrecargaAcabou.push(i)
                }
                //se já acabou de executar completamente
                if (processosIniciais[i].tempoDeExecucao == processosIniciais[i].tempoExecutado) {                        
                    qtdGreen = 0
                    processoAcabou.push(i)
                }
            //processo não chegou
            } else if (processosIniciais[i].tempoDeChegada > tempoDecorrido) {
                console.log("Sou o processo: " + processosIniciais[i].key + " e ainda não cheguei")
                // aux += 1
                processosIniciais[i].estadosProcesso.push("gray")
            //o processo já executou tudo               
            } else {
                console.log("Sou o processo: " + processosIniciais[i].key + " e já executei tudo")
                processosIniciais[i].estadosProcesso.push("gray")
            }                        
        }
        console.log("a fila está assim:", fila)
        if (sobrecargaAcabou.length != 0) {  
            //se acabou a sobrecarga, verifica se algum processo chegou
            // tempoDecorrido += 1
            for (let i = 0; i < processosIniciais.length; i++) {
                console.log("tempo decorrido +1:", tempoDecorrido+1)
                if (processosIniciais[i].tempoDeChegada == tempoDecorrido+1) {
                    isFila(i)
                    console.log("a fila está assim:", fila)
                }
            }
            fila.push(sobrecargaAcabou[0])
            fila.shift()
            console.log("a fila está assim:", fila)
            sobrecargaAcabou.shift()
            // Executar()
        }
        if (processoAcabou.length != 0) {
            fila.shift()
            processoAcabou.shift()
        }
        tempoDecorrido += 1
    }

    while (processosIniciais.some(p => p.tempoExecutado != p.tempoDeExecucao)) {
        Executar()
    }
    
    let tempoMedio = (tempoGasto)/(processosIniciais.length)

    //add estados na matriz
    for (let i = 0; i < processosIniciais.length; i++) {
        matriz.push(processosIniciais[i].estadosProcesso)
        processosExecutados.push(processosIniciais[i].key)
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

///para base de teste
//25.4
const processos1 = [
    { key: 1, tempoDeChegada: 0, tempoDeExecucao: 14, deadline: 0, paginas: 1 },
    { key: 2, tempoDeChegada: 2, tempoDeExecucao: 4, deadline: 0, paginas: 1 },
    { key: 3, tempoDeChegada: 4, tempoDeExecucao: 2, deadline: 0, paginas: 1 },
    { key: 4, tempoDeChegada: 6, tempoDeExecucao: 6, deadline: 0, paginas: 1 },
    { key: 5, tempoDeChegada: 8, tempoDeExecucao: 8, deadline: 0, paginas: 1 }
];

const processos2 = [
    { key: 1, tempoDeChegada: 0, tempoDeExecucao: 5, deadline: 0, paginas: 1 },
    { key: 2, tempoDeChegada: 2, tempoDeExecucao: 9, deadline: 0, paginas: 1 },
    { key: 3, tempoDeChegada: 4, tempoDeExecucao: 3, deadline: 0, paginas: 1 },
    { key: 4, tempoDeChegada: 6, tempoDeExecucao: 7, deadline: 0, paginas: 1 },
    { key: 5, tempoDeChegada: 8, tempoDeExecucao: 12, deadline: 0, paginas: 1 }
];

const processos3 = [
    { key: 1, tempoDeChegada: 0, tempoDeExecucao: 5, deadline: 0, paginas: 1 },
    { key: 2, tempoDeChegada: 2, tempoDeExecucao: 3, deadline: 0, paginas: 1 },
    { key: 3, tempoDeChegada: 4, tempoDeExecucao: 2, deadline: 0, paginas: 1 },
    { key: 4, tempoDeChegada: 6, tempoDeExecucao: 6, deadline: 0, paginas: 1 },
    { key: 5, tempoDeChegada: 8, tempoDeExecucao: 10, deadline: 0, paginas: 1 }
];
//13
const processos4 = [
  { key: 1, tempoDeChegada: 0, tempoDeExecucao: 8, deadline: 0, paginas: 1 },
  { key: 2, tempoDeChegada: 6, tempoDeExecucao: 4, deadline: 0, paginas: 1 },
  { key: 3, tempoDeChegada: 12, tempoDeExecucao: 2, deadline: 0, paginas: 1 },
  { key: 4, tempoDeChegada: 12, tempoDeExecucao: 7, deadline: 0, paginas: 1 },
];
//18.5
const processos5 = [
    { key: 1, tempoDeChegada: 0, tempoDeExecucao: 14, deadline: 0, paginas: 1 },
    { key: 2, tempoDeChegada: 2, tempoDeExecucao: 4, deadline: 0, paginas: 1 },
    { key: 3, tempoDeChegada: 4, tempoDeExecucao: 2, deadline: 0, paginas: 1 },
    { key: 4, tempoDeChegada: 6, tempoDeExecucao: 6, deadline: 0, paginas: 1 }
];

console.log(Err(processos5, 2, 1));
// console.log(Err(processos4, 2, 1));

// console.log(Err(processos1, 2, 1))
// console.log(Err(processos2, 2, 1))
// console.log(Err(processos3, 2, 1))

export default Err