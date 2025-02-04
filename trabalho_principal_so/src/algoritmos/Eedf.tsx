function Eedf (processos: {key: number, tempoDeChegada: number, tempoDeExecucao: number, deadline: number, paginas: number}[], quantum: number, sobrecarga: number) {
    
    const processosCopia: {key: number; tempoDeChegada: number; tempoDeExecucao: number; deadline: number; paginas: number; deadlineRestante: number; tempoExecutado: number; estadosProcesso: string[];}[] = [];
    const processosExecutados = [];
    const matriz = [];
    let fila: number[] = [];

    for (let i = 0; i < processos.length; i++) {
        processosCopia.push({key: processos[i].key, tempoDeChegada: processos[i].tempoDeChegada, tempoDeExecucao: processos[i].tempoDeExecucao, deadline: processos[i].deadline, paginas: processos[i].paginas, deadlineRestante: processos[i].deadline, tempoExecutado: 0, estadosProcesso: []})
    }

    function isFila (i: number) {
        if (fila.includes(i)) {

        } else {
            fila.push(i)
        }
    }

    function ordenarPorDeadlineRestante () {
        const filaNova: number[] = [];
        let aux = fila.length
        while (aux != 0) {
            let menorDealine = processosCopia[fila[0]].deadlineRestante
            let value = fila[0] //0
            for (let i = 1; i < fila.length; i++) {
                if (menorDealine > processosCopia[fila[i]].deadlineRestante) {
                    menorDealine = processosCopia[fila[i]].deadlineRestante
                    value = fila[i]
                }
            }
            filaNova.push(value) //push 0
            fila.splice(fila.indexOf(value), 1) //remove da 1ª lista
            aux -= 1
        }
        fila = filaNova
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
        for (let i = 0; i < processosCopia.length; i++) {
            if (processosCopia[i].tempoDeChegada == tempoDecorrido) {
                isFila(i)
            }
            //o processo está esperando
            if ((fila.includes(i)) && (i != fila[0])) {
                // console.log("Sou o processo: " + processosCopia[i].key + " e estou esperando")
                // aux += 1
                tempoGasto += 1
                processosCopia[i].estadosProcesso.push("yellow")
                processosCopia[i].deadlineRestante -= 1
            //o processo executou
            } else if (i == fila[0]) {
                //se não estourou o quantum
                if ((qtdGreen < quantum)) {
                    // console.log("Sou o processo: " + processosCopia[i].key + " e estou executando")
                    tempoGasto += 1
                    // tempoDecorrido += 1
                    processosCopia[i].tempoExecutado += 1
                    if (processosCopia[i].deadlineRestante > 0) {
                        processosCopia[i].estadosProcesso.push("green")
                    } else {
                        processosCopia[i].estadosProcesso.push("black")
                    }
                    qtdGreen += 1
                    processosCopia[i].deadlineRestante -= 1
                //se estourou o quanto
                } else if ((qtdGreen == quantum) && ((processosCopia[i].tempoDeExecucao - processosCopia[i].tempoExecutado) > 0) && (qtdRed < sobrecarga)) {
                    processosCopia[i].estadosProcesso.push("red")
                    tempoGasto += 1
                    // tempoDecorrido += 1
                    qtdRed += 1
                    processosCopia[i].deadlineRestante -= 1
                    // console.log("Sou o processo: " + processosCopia[i].key + " e estou em sobrecarga")
                }
                //se já imprimiu todos os reds
                if (qtdRed == sobrecarga) {
                    qtdGreen = 0
                    qtdRed = 0
                    sobrecargaAcabou.push(i)
                }
                //se já acabou de executar completamente
                if (processosCopia[i].tempoDeExecucao == processosCopia[i].tempoExecutado) {                        
                    qtdGreen = 0
                    processoAcabou.push(i)
                }
            //processo não chegou
            } else if (processosCopia[i].tempoDeChegada > tempoDecorrido) {
                // console.log("Sou o processo: " + processosCopia[i].key + " e ainda não cheguei")
                // aux += 1
                processosCopia[i].estadosProcesso.push("gray")
            //o processo já executou tudo               
            } else {
                // console.log("Sou o processo: " + processosCopia[i].key + " e já executei tudo")
                processosCopia[i].estadosProcesso.push("gray")
            }                                    
        }
        if (sobrecargaAcabou.length != 0) {                   
            // fila.push(sobrecargaAcabou[0])
            // fila.shift()
            sobrecargaAcabou.shift()
        }
        if (processoAcabou.length != 0) {
            fila.shift()
            processoAcabou.shift()
        }
        tempoDecorrido += 1        
        ordenarPorDeadlineRestante()
    }

    while (processosCopia.some(p => p.tempoExecutado != p.tempoDeExecucao)) {
        Executar()
    }
    // for (let i = 0; i < 68; i++) {
    //     Executar()
    // }
    
    let tempoMedio = (tempoGasto)/(processosCopia.length)

    //add estados na matriz
    for (let i = 0; i < processosCopia.length; i++) {
        matriz.push(processosCopia[i].estadosProcesso)
        processosExecutados.push(processosCopia[i].key)
    }

    //creio que isso não ocorra mais
    // for (let i = 0; i < matriz.length; i++) {
    //     while(matriz[i].length < tempoDecorrido) { //antes era tempoDecorrido + 1
    //         // matriz[i].push("nda")
    //         matriz[i].push("gray")
    //     }
    // }

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
//tempo médio esperado: 49
const processosTeste = [
    { key: 1, tempoDeChegada: 0, tempoDeExecucao: 14, deadline: 10, paginas: 1 },
    { key: 2, tempoDeChegada: 2, tempoDeExecucao: 4, deadline: 12, paginas: 1 },
    { key: 3, tempoDeChegada: 4, tempoDeExecucao: 2, deadline: 8, paginas: 1 },
    { key: 4, tempoDeChegada: 6, tempoDeExecucao: 6, deadline: 15, paginas: 1 },
]

// console.log(Eedf(processosTeste, 1, 2).tempoMedio)
// console.log(Eedf(processosTeste, 1, 2).matriz)
// console.log(Eedf(processos1, 2, 1))

export default Eedf