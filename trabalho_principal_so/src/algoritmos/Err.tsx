function Err (processos: {key: number, tempoDeChegada: number, tempoDeExecucao: number, deadline: number, paginas: number}[], quantum: number, sobrecarga: number) {

    return (
        {
            // tempoMedio, processosExecutados, matriz, eixox
        }
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

console.log(Err(processos1, 1, 1))
console.log(Err(processos2, 1, 1))
console.log(Err(processos3, 1, 1))

export default Err