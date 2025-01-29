import './processos.css';

export default function Processos({ numero, onDelete } : { numero:number; onDelete: () => void }) {
    return (
        <section className='processo'>
            <div className='infoDoProcesso'>                
                <h2>Processo n° {numero}</h2> {/* numero será variavel */}
                <button onClick={onDelete}>X</button> {/* adicionar exclusão do card do processo */}
            </div>
            <div className='linha'>
                <div className='coluna'>
                    <h3 className='nomeAtributo'>Tempo de chegada:</h3>
                    <input className='inputAtributo' type="number" name="tempoDeChegada" id="" placeholder="Tempo de Chegada" min="0" defaultValue={0} /> {/* definir valor presetado */}
                </div>
                <div className='coluna'>
                    <h3 className='nomeAtributo'>Tempo de execução:</h3>
                    <input className='inputAtributo' type="number" name="tempoDeExecucao" id="" placeholder="Tempo de Execução" min="1" defaultValue={1} /> {/* definir valor presetado */}
                </div>
            </div>
            <div className='linha'>
                <div className='coluna'>
                    <h3 className='nomeAtributo'>Deadline:</h3>
                    <input className='inputAtributo' type="number" name="deadline" id="" placeholder="deadline" min="0" defaultValue={0} /> {/* definir valor presetado */}
                </div>
                <div className='coluna'>
                    <h3 className='nomeAtributo'>Páginas:</h3>
                    <input className='inputAtributo' type="number" name="paginas" id="" placeholder="paginas" min="1" defaultValue={1} /> {/* definir valor presetado */}
                </div>
            </div>   
        </section>
    )
}