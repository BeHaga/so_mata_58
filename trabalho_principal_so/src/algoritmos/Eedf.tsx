function Eedf (processos: {key: number, tempoDeChegada: number, tempoDeExecucao: number, deadline: number, paginas: number}[], quantum: number, sobrecarga: number) {

    return (
        {
            // tempoMedio, processosExecutados, matriz, eixox
        }
    )
}

///para base de teste
//20.6
const processos1 = [
    { key: 1, tempoDeChegada: 0, tempoDeExecucao: 14, deadline: 30, paginas: 7 },
    { key: 2, tempoDeChegada: 2, tempoDeExecucao: 4, deadline: 16, paginas: 4 },
    { key: 3, tempoDeChegada: 4, tempoDeExecucao: 2, deadline: 10, paginas: 1 },
    { key: 4, tempoDeChegada: 6, tempoDeExecucao: 6, deadline: 10, paginas: 1 },
    { key: 5, tempoDeChegada: 8, tempoDeExecucao: 8, deadline: 24, paginas: 5 }
];
//19.39
const processos2 = [
    { key: 1, tempoDeChegada: 0, tempoDeExecucao: 14, deadline: 30, paginas: 1 },
    { key: 2, tempoDeChegada: 2, tempoDeExecucao: 4, deadline: 16, paginas: 1 },
    { key: 3, tempoDeChegada: 4, tempoDeExecucao: 2, deadline: 10, paginas: 1 },
    { key: 4, tempoDeChegada: 6, tempoDeExecucao: 6, deadline: 20, paginas: 1 },
    { key: 5, tempoDeChegada: 8, tempoDeExecucao: 8, deadline: 24, paginas: 1 }
];

console.log(Eedf(processos1, 2, 1))
console.log(Eedf(processos2, 2, 1))

export default Eedf