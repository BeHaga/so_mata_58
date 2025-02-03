import './disco.css';

export default function Disco({ id, nProcesso }: { id: number, nProcesso: number}) {

    const exibirNumProcesso = nProcesso !==0;

    return (
        <div className='quadradoPaginacao'>
            {exibirNumProcesso && (<h2>{nProcesso}</h2>)}
            {!exibirNumProcesso && (<h2>?</h2>)}            
            <h3>{id}</h3>
        </div>
    )
}