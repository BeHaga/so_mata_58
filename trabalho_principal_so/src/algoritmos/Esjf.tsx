function Esjf(processos: {key: number, tempoDeChegada: number, tempoDeExecucao: number, deadline: number, paginas: number}[]) {
    const processosIniciais = [...processos];
    const processosExecutados = [];
    const temposDeResposta = [];
    const matriz = [];

    const ordemChegada = [...processos]
    ordemChegada.sort((a, b) => a.tempoDeChegada - b.tempoDeChegada);    

    let tempoDecorrido = 0; // tempo total decorrido
    let somaTemposDeResposta = 0; // Acumulador do tempo de resposta
    let totalProcessos = processos.length;

    while (processosIniciais.length > 0) {
        // Filtrar processos que já chegaram
        let processosDisponiveis = [];
        for (let i = 0; i < processosIniciais.length; i++) {
            if (processosIniciais[i].tempoDeChegada <= tempoDecorrido) {
                processosDisponiveis.push(processosIniciais[i]);
            }
        }
        
        if (processosDisponiveis.length === 0) {
            // Se não há processos disponíveis, avance o tempo
            tempoDecorrido++;
            continue;
        }

        // Selecionar o processo com o menor tempo de execução
        let processoSelecionado = processosDisponiveis[0];
        for (let i = 1; i < processosDisponiveis.length; i++) {
            if (processosDisponiveis[i].tempoDeExecucao < processoSelecionado.tempoDeExecucao) {
                processoSelecionado = processosDisponiveis[i];
            }
        }

        // Calcular o tempo de resposta do processo selecionado
        let tempoResposta = tempoDecorrido + processoSelecionado.tempoDeExecucao - processoSelecionado.tempoDeChegada;
        temposDeResposta.push(tempoResposta);
        somaTemposDeResposta += tempoResposta;

        // Calcular o tempo de espera do processo
        let tempoEspera = tempoDecorrido - processoSelecionado.tempoDeChegada;

        // Executar o processo selecionado
        tempoDecorrido += processoSelecionado.tempoDeExecucao;
        
        processosExecutados.push({
            key: processoSelecionado.key,
            tempoDeChegada: processoSelecionado.tempoDeChegada,
            tempoDeExecucao: processoSelecionado.tempoDeExecucao,
            tempoEspera: tempoEspera
        });

        // Remover o processo selecionado da lista
        for (let i = 0; i < processosIniciais.length; i++) {
            if (processosIniciais[i].key === processoSelecionado.key) {
                for (let j = i; j < processosIniciais.length - 1; j++) {
                    processosIniciais[j] = processosIniciais[j + 1]; // Shift para esquerda
                }
                processosIniciais.pop(); // Remove o último elemento
                break;
            }
        }
    }

    // Calcular o tempo médio de resposta sem usar .reduce()
    let tempoMedio = somaTemposDeResposta / totalProcessos;
    console.log(tempoMedio)

    processosExecutados.sort((a, b) => a.key - b.key);

    for (let i = 0; i < processosExecutados.length; i++) {
        let linhaVetor = []
        for (let j = 0; j < processosExecutados[i].tempoDeChegada; j++) {
            linhaVetor.push("gray")
        }
        for (let k = 0; k < processosExecutados[i].tempoEspera; k++) {
            linhaVetor.push("yellow")
        }
        for (let l = 0; l < processosExecutados[i].tempoDeExecucao; l++) {
            linhaVetor.push("green")
        }
        matriz.push(linhaVetor)
    }

    for (let i = 0; i < matriz.length; i++) {
        while(matriz[i].length < tempoDecorrido) { //antes era tempoDecorrido + 1
            matriz[i].push("gray")
        }
    }

    const eixox = []

    for (let i = 0; i < matriz[0].length; i++) {
        eixox.push(i)
    }

    return {
        tempoMedio, processosExecutados, matriz, eixox
    };
}

// Teste com os dados fornecidos
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


console.log(Esjf(processos1));
console.log(Esjf(processos2));
console.log(Esjf(processos3));

export default Esjf