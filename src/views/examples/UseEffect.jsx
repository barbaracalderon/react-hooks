import React, { useState, useEffect } from 'react'
import PageTitle from '../../components/layout/PageTitle'
import SectionTitle from '../../components/layout/SectionTitle'

function calcFatorial(n) {
    if (n < 0) return -1
    if (n == 0) return 1
    return calcFatorial(n - 1) * n
}

function calcParImpar(n) {
    if (n % 2 === 0) {
        return 0 } else {
            return 1
        }
}

const UseEffect = (props) => {

    const [number, setNumber] = useState(1)
    const [fatorial, setFatorial] = useState(1)

    useEffect(function () {
        setFatorial(calcFatorial(number))
    }, [number])

    const [numero, setNumero] = useState(0)

    useEffect(function () {
        setNumero(calcParImpar(numero))
    })

    return (
        <div className="UseEffect">
            <PageTitle
                title="Hook UseEffect"
                subtitle="Permite executar efeitos colaterais em componentes funcionais!"
            />
            <SectionTitle title="#03 - Input number com fatorial" />
            <div>
                <span className="text">Fatorial:</span>
                <span className="text red">{fatorial === -1 ? 'Não existe' : fatorial}</span>
            </div>
            <input type="number" className="input"
            onChange={ e => setNumber(e.target.value)} />
            <SectionTitle title="#04 - Desafio useEffect" />
            <div>
                <span className="text">O número é:</span>
                <span className="text red">{numero === 0 ? ' par' : ' ímpar'}</span>
            </div>
            <input type="number" className="input"
            onChange={ e => setNumero(e.target.value)} />
        </div>
    )
}

export default UseEffect
