import React, { useState, useRef, useEffect } from 'react'
import PageTitle from '../../components/layout/PageTitle'
import SectionTitle from "../../components/layout/SectionTitle"

const UseRef = (props) => {

    const [value1, setValue1] = useState("")
    const [value2, setValue2] = useState("")
    const count = useRef(0)

    useEffect(function () {
        count.current++
    }, [value1, value2])


    return (
        <div className="UseRef">
            <PageTitle
                title="Hook UseRef"
                subtitle="Retorna um objeto mutável com a propriedade .current!"
            />

            <SectionTitle title="#05 - Exercício" />
            <div className="center">
            <div>
                <span className="text">Valor: </span>
                <span className="text">{value1} [</span>
                <span className="text" className="text red">{count.current}</span>
                <span className="text">]</span>
            </div>
                <input type="text" className="input"
                value={value1} onChange={e => setValue1(e.target.value)} />
            </div>

            <SectionTitle title="#06 - Exercício" />
            <div className="center">
                <input type="text" className="input" 
                value={value2} onChange={e => setValue2(e.target.value)}/>
            </div>
        </div>
    )
}

export default UseRef
