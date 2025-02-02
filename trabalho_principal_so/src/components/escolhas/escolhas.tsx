import './escolhas.css';

import { useState } from 'react';

interface EscolhaProps {
    escalonamento: string;
    paginacao: string;
    quantum: number;
    sobrecarga: number;    
    onUpdate: (updateValues: Partial<EscolhaProps>) => void;
}

export default function Escolhas({escalonamento, paginacao, quantum, sobrecarga, onUpdate} : EscolhaProps) {    
    const [botaoSelecionadoEscalonamento, setBotaoSelecionadoEscalonamento] = useState<string>(escalonamento);
    const [botaoSelecionadoPaginacao, setBotaoSelecionadoPaginacao] = useState<string>(paginacao);
    const [valorQuantum, setValorQuantum] = useState(quantum);
    const [valorSobrecarga, setValorSobrecarga] = useState(sobrecarga);

    const apertarEscalonamento = (button: string) => {
        setBotaoSelecionadoEscalonamento(button);

        onUpdate({
            ["escalonamento"]: button,
        })
    };

    const apertarPaginacao = (button: string) => {
        setBotaoSelecionadoPaginacao(button);

        onUpdate({
            ["paginacao"]: button,
        })
    };

    const handleChange = (key: string, value: number) => {
        if (key === "quantum") setValorQuantum(value);
        if (key === "sobrecarga") setValorSobrecarga(value);

        onUpdate({
            [key]: value,
        });
    }

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
                    <input 
                        className='inputAtributo' 
                        type="number" 
                        // name="Quantum" 
                        // id="" 
                        placeholder="Quantum" 
                        min="1" 
                        // defaultValue={1}
                        value={valorQuantum}
                        onChange={(e) => {
                            const input = e.target;
                            if (Number(input.value) < 1) {
                                input.value = "1"
                            }
                            handleChange("quantum", Number(input.value))}
                        }
                    />
                </div>
                <div className='definicao'>
                    <h3 className='nomeAtributo'>Sobrecarga:</h3>
                    <input 
                        className='inputAtributo' 
                        type="number" 
                        // name="Sobrecarga" 
                        // id="" 
                        placeholder="Sobrecarga" 
                        min="1" 
                        // defaultValue={1}
                        value={valorSobrecarga}
                        onChange={(e) => {
                            const input = e.target;
                            if (Number(input.value) < 1) {
                                input.value = "1"
                            }
                            handleChange("sobrecarga", Number(input.value))}
                        }
                    />
                </div>
            </div>
        </section>
    )
}