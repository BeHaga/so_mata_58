function Slru(ordemSubstituicao: number[], processo: number) {
    const ordemSubstituicaoCopia = ordemSubstituicao
    const processoCopia = processo

    if (ordemSubstituicaoCopia.indexOf(processoCopia) == -1) {
        ordemSubstituicaoCopia.push(processoCopia)
    } else {        
        ordemSubstituicaoCopia.push(processoCopia)
        ordemSubstituicaoCopia.splice(ordemSubstituicaoCopia.indexOf(processoCopia),1) //remove onde o processo estava
    }

    return(
        ordemSubstituicaoCopia
    )
}

export default Slru