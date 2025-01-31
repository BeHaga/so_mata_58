import './quadrado.css';

export default function Quadrado({ color } : { color:string }) {
    return (
        <div style={{background: color}} className='quadrado'></div>
    )
}