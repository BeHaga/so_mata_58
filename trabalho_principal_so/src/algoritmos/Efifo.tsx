function Efifo (processos: {key: number, tempoDeChegada: number, tempoDeExecucao: number, deadline: number, paginas: number}[]) {
    const ordemChegada = []
    const processosIniciais = [...processos]

    while (processosIniciais.length > 0) {
        let chegouPrimeiro = processosIniciais[0];
        let indice = 0;

        for (let i = 1; i < processosIniciais.length; i++) {
            if (processosIniciais[i].tempoDeChegada < chegouPrimeiro.tempoDeChegada) {
                chegouPrimeiro = processosIniciais[i];
                indice = i;
            }
        }
        ordemChegada.push(chegouPrimeiro)
        processosIniciais.splice(indice, 1)
    }

    const matriz = []

    // tempoDecorrido = eixo x do gráfico
    // tempoExecutado = tempoDeExecucao do processo a cada u.t.

    let tempoDecorrido = 0 //exe + nda
    let tempoGasto = 0 //exe + esp
    for (let i = 0; i < ordemChegada.length; i++) {
        let tempoExecutado = 0 //exe
        let estadosProcessos = []
        let aux = 0 //exe + esp + nda
        while (tempoExecutado < ordemChegada[i].tempoDeExecucao) {
            if ((aux < tempoDecorrido) && (ordemChegada[i].tempoDeChegada <= aux)) {
                aux += 1
                tempoGasto += 1
                estadosProcessos.push("esp")
            } else if ((aux == tempoDecorrido) && (ordemChegada[i].tempoDeChegada <= aux)) {
                aux += 1
                tempoGasto += 1
                tempoExecutado += 1
                tempoDecorrido += 1
                estadosProcessos.push("exe")
            } else if (aux < tempoDecorrido) {
                aux += 1
                estadosProcessos.push("nda")
            } else {             
                aux += 1
                tempoDecorrido += 1
                estadosProcessos.push("nda")
            }
        }
        matriz.push(estadosProcessos)
    }
    let tempoMedio = (tempoGasto)/(ordemChegada.length)

    console.log(tempoMedio)

    for (let i = 0; i < matriz.length; i++) {
        while(matriz[i].length < tempoDecorrido+1) {
            matriz[i].push("nda")
        }
    }

    //legenda da matriz
    //esp = esperando
    //exe = executando
    //nda = nenhum das anteriores

    //grafico de Gantt (linhas: qtd de processos, colunas: tempo percorrido = execucao + espera)    
    // const matriz = [[],[]]

    //SJF quem tem menor tempo de execucao e chegou antes, ambos executam o processo todo para depois ir para outro

    return (
        // matriz
        tempoMedio
    )
}

///para base de teste
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

console.log(Efifo(processos1))
console.log(Efifo(processos2))
console.log(Efifo(processos3))

export default Efifo