import './disco.css';

export default function Disco({ id }: { id: number}) {
    return (
        <div className='quadradoPaginacao'>{id}</div>
        // <div className='paginacaoLinha'>
        //     <div className='quadradoPaginacao'>-</div>
        //     <div className='quadradoPaginacao'>-</div>
        //     <div className='quadradoPaginacao'>-</div>
        //     <div className='quadradoPaginacao'>-</div>
        //     <div className='quadradoPaginacao'>-</div>
        //     <div className='quadradoPaginacao'>-</div>
        //     <div className='quadradoPaginacao'>-</div>
        //     <div className='quadradoPaginacao'>-</div>
        //     <div className='quadradoPaginacao'>-</div>
        //     <div className='quadradoPaginacao'>-</div>
        // </div>
    )
}