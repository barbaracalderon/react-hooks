import React, { useContext } from 'react'
import PageTitle from '../../components/layout/PageTitle'
import DataContext from '../../data/DataContext'
import SectionTitle from '../../components/layout/SectionTitle'

const UseContext = (props) => {

    const context = useContext(DataContext)

    function changeNumber(delta) {
        context.setState({
            ...context.state, 
            number: context.state.number + delta
        })
    }

    return (
        <div className="UseContext">
            <PageTitle
                title="Hook UseContext"
                subtitle="Aceita um objeto de contexto e retorna o valor atual do contexto!"
            />
            <SectionTitle title="#09 - Exercício" />
            <div className="center">
                <span className="text">{ context.state.text }</span>
                <span className="text"> { context.state.number }</span>

            <div>
                <button className="btn" onClick={ e => {changeNumber(-1)}}>
                    -1
                </button>
                <button className="btn" onClick={ e => {changeNumber(+1)}}>
                    +1
                </button>
            </div>

            </div>
        </div>
    )
}

export default UseContext
