import './ram.css';

export default function Ram({ id }: { id: number}) {
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