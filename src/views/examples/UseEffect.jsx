import React, { useState } from 'react'
import PageTitle from '../../components/layout/PageTitle'
import SectionTitle from '../../components/layout/SectionTitle'


const UseEffect = (props) => {

    const [number, setNumber] = useState(1)

    return (
        <div className="UseEffect">
            <PageTitle
                title="Hook UseEffect"
                subtitle="Permite executar efeitos colaterais em componentes funcionais!"
            />
            <SectionTitle title="#03 - Input number com fatorial" />
            <input type="number" className="input"
            onChange={ e => setNumber(e.target.value)} />
        </div>
    )
}

export default UseEffect
