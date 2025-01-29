import { useState } from 'react'
import './processos.css';

interface ProcessoProps {
    numero: number;
    tempoDeChegada: number;
    tempoDeExecucao: number;
    deadline: number;
    paginas: number;
    onDelete: () => void;
}

export default function Processos({ numero, onDelete, tempoDeChegada, tempoDeExecucao, deadline, paginas } : ProcessoProps) {
    const [chegada, setChegada] = useState(tempoDeChegada);
    const [execucao, setExecucao] = useState(tempoDeExecucao);
    const [valorDeadline, setValorDeadline] = useState(deadline);
    const [qtdPaginas, setQtdPaginas] = useState(paginas);

    return (
        <section className='processo'>
            <div className='infoDoProcesso'>                
                <h2>Processo n° {numero}</h2>
                <button onClick={onDelete}>X</button>
            </div>
            <div className='linha'>
                <div className='coluna'>
                    <h3 className='nomeAtributo'>Tempo de chegada:</h3>
                    <input 
                        className='inputAtributo' 
                        type="number" 
                        // name="tempoDeChegada" 
                        // id="" 
                        placeholder="Tempo de Chegada" 
                        min="0" 
                        // defaultValue={0} 
                        value={chegada}
                        onChange={(e) => setChegada(Number(e.target.value))}
                    />
                </div>
                <div className='coluna'>
                    <h3 className='nomeAtributo'>Tempo de execução:</h3>
                    <input 
                        className='inputAtributo' 
                        type="number" 
                        // name="tempoDeExecucao" 
                        // id="" 
                        placeholder="Tempo de Execução" 
                        min="1" 
                        // defaultValue={1} 
                        value={execucao}
                        onChange={(e) => setExecucao(Number(e.target.value))}
                    />
                </div>
            </div>
            <div className='linha'>
                <div className='coluna'>
                    <h3 className='nomeAtributo'>Deadline:</h3>
                    <input 
                        className='inputAtributo' 
                        type="number" 
                        // name="deadline" 
                        // id="" 
                        placeholder="deadline" 
                        min="0" 
                        // defaultValue={0} 
                        value={valorDeadline}
                        onChange={(e) => setValorDeadline(Number(e.target.value))}
                    />
                </div>
                <div className='coluna'>
                    <h3 className='nomeAtributo'>Páginas:</h3>
                    <input 
                        className='inputAtributo' 
                        type="number" 
                        // name="paginas" 
                        // id="" 
                        placeholder="paginas" 
                        min="1" 
                        // defaultValue={1} 
                        value={qtdPaginas}
                        onChange={(e) => setQtdPaginas(Number(e.target.value))}
                    />
                </div>
            </div>   
        </section>
    )
}