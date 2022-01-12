import React, { useState } from 'react'
import PageTitle from '../../components/layout/PageTitle'
import SectionTitle from '../../components/layout/SectionTitle'

const UseState = (props) => {

    const [counter, setCounter] = useState(0)
    const [name, setName] = useState("Digite aqui...")


    return (
        <div className="UseState">
            <PageTitle
                title="Hook UseState"
                subtitle="Estado em componentes funcionais!"/>
            <SectionTitle title="#01 - Contador simples" />
                <div className="center">
                    <span className="text">{counter}</span>
                    <div>
                        <button className="btn"
                        onClick={() => setCounter(counter - 1)}>-1</button>
                        <button className="btn"
                        onClick={() => setCounter(counter + 1)}>+1</button>
                    </div>
                </div>
            <SectionTitle title="#02 - Input componente controlado" />
                <div className="center">
                <input type="text" className="input"
                    value={name} onChange={e => setName(e.target.value)} />
                <span className="text">{name}</span>
                </div>
        </div>
    )
}

export default UseState
