function Sfifo(ordemSubstituicao: number[], processo: number) {
    const ordemSubstituicaoCopia = ordemSubstituicao
    const processoCopia = processo

    if (ordemSubstituicaoCopia.indexOf(processoCopia) == -1) {
        ordemSubstituicaoCopia.push(processoCopia)
    } else {    
        //nada acontece se ela já estiver na RAM
    }

    return(
        ordemSubstituicaoCopia
    )
}

export default Sfifo