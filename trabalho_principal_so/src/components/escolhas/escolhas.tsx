import './escolhas.css';

import { useState } from 'react';

export default function Escolhas() {    
    const [botaoSelecionadoEscalonamento, setBotaoSelecionadoEscalonamento] = useState<string>('FIFO');
    const [botaoSelecionadoPaginacao, setBotaoSelecionadoPaginacao] = useState<string>('FIFO');

    const apertarEscalonamento = (button: string) => {
        setBotaoSelecionadoEscalonamento(button);
    };

    const apertarPaginacao = (button: string) => {
        setBotaoSelecionadoPaginacao(button);
    };

    return (
        <section>
            <div>
                <h2>Escolha o algoritmo de escalonamento:</h2>
                <div className='escalonamento'>
                    <button onClick={() => apertarEscalonamento('FIFO')} style={{background: botaoSelecionadoEscalonamento === 'FIFO' ? '#888' : '#1a1a1a'}}>FIFO</button>
                    <button onClick={() => apertarEscalonamento('SJF')} style={{background: botaoSelecionadoEscalonamento === 'SJF' ? '#888' : '#1a1a1a'}}>SJF</button>
                    <button onClick={() => apertarEscalonamento('RR')} style={{background: botaoSelecionadoEscalonamento === 'RR' ? '#888' : '#1a1a1a'}}>RR</button>
                    <button onClick={() => apertarEscalonamento('EDF')} style={{background: botaoSelecionadoEscalonamento === 'EDF' ? '#888' : '#1a1a1a'}}>EDF</button>
                </div>
            </div>
            <div>
                <h2>Escolha o algoritmo de substituição de páginas:</h2>
                <div className='substituicao'>
                    <button onClick={() => apertarPaginacao('FIFO')} style={{background: botaoSelecionadoPaginacao === 'FIFO' ? '#888' : '#1a1a1a'}}>FIFO</button>
                    <button onClick={() => apertarPaginacao('LRU')} style={{background: botaoSelecionadoPaginacao === 'LRU' ? '#888' : '#1a1a1a'}}>LRU</button>
                </div>
            </div>
            <h2>Definições do sistema:</h2>
            <div className='definicoesSistema'>
                <div className='definicao'>
                    <h3 className='nomeAtributo'>Quantum:</h3>
                    <input className='inputAtributo' type="number" name="Quantum" id="" placeholder="Quantum" min="1" /> {/* definir valor presetado */}
                </div>
                <div className='definicao'>
                    <h3 className='nomeAtributo'>Sobrecarga:</h3>
                    <input className='inputAtributo' type="number" name="Sobrecarga" id="" placeholder="Sobrecarga" min="0" /> {/* definir valor presetado */}
                </div>
            </div>
        </section>
    )
}