import React from 'react'
import PageTitle from '../../components/layout/PageTitle'
import SectionTitle from '../../components/layout/SectionTitle'
import {useCounter} from '../../hooks/useCounter'
import { useFetch } from '../../hooks/useFetch'

const UseRef = (props) => {

    const [count, inc, dec] = useCounter(60)
    const url = 'http://files.cod3r.com.br/curso-react/estados.json'
    const response = useFetch(url)

    function showStates(states) {
        return states.map(state => <li key={state.nome}>{state.nome} - {state.sigla}</li>)
    }

    return (
        <div className="UseCustom">
            <PageTitle
                title="Seu Hook"
                subtitle="Vamos aprender como criar o nosso próprio Hook!"
            />
            <SectionTitle title="#13 - Exercício" />
            <div className="center">
                <span className="text"> { count } </span>
                <div>
                    <button className="btn" onClick={ e => dec() }> -1 </button>
                    <button className="btn" onClick={ e => inc() }> +1 </button>
                </div>
            </div>
            <SectionTitle title="#14 - Exercício" />
            <div className="cent">
                <ul>
                    {!response.loading? showStates(response.data) : false}
                </ul>
            </div>
        </div>
    )
}

export default UseRef
