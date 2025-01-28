import './processos.css';

export default function Processos() {
    return (
        <section className='processo'>
            <div className='infoDoProcesso'>                
                <h2>Processo n°</h2> {/* numero será variavel */}
                <button>X</button> {/* adicionar exclusão do card do processo */}
            </div>
            <div className='linha'>
                <div className='coluna'>
                    <h3 className='nomeAtributo'>Tempo de chegada:</h3>
                    <input className='inputAtributo' type="number" name="tempoDeChegada" id="" placeholder="Tempo de Chegada" min="0" /> {/* definir valor presetado */}
                </div>
                <div className='coluna'>
                    <h3 className='nomeAtributo'>Tempo de execução:</h3>
                    <input className='inputAtributo' type="number" name="tempoDeExecucao" id="" placeholder="Tempo de Execução" min="0" /> {/* definir valor presetado */}
                </div>
            </div>
            <div className='linha'>
                <div className='coluna'>
                    <h3 className='nomeAtributo'>Deadline:</h3>
                    <input className='inputAtributo' type="number" name="deadline" id="" placeholder="deadline" min="0" /> {/* definir valor presetado */}
                </div>
                <div className='coluna'>
                    <h3 className='nomeAtributo'>A definir:</h3>
                    <input className='inputAtributo' type="number" name="aDefinir" id="" placeholder="a definir" min="0" /> {/* definir valor presetado */}
                </div>
            </div>   
        </section>
    )
}