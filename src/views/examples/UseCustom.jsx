import React from 'react'
import PageTitle from '../../components/layout/PageTitle'
import SectionTitle from '../../components/layout/SectionTitle'
import {useCounter} from '../../hooks/useCounter'

const UseRef = (props) => {

    const [count, inc, dec] = useCounter(60)

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
        </div>
    )
}

export default UseRef
