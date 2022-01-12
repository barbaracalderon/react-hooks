import React, { useState } from 'react'
import PageTitle from '../../components/layout/PageTitle'
import SectionTitle from '../../components/layout/SectionTitle'

const UseState = (props) => {

    const [counter, setCounter] = useState(0)


    return (
        <div className="UseState">
            <PageTitle
                title="Hook UseState"
                subtitle="Estado em componentes funcionais!"/>
            <SectionTitle title="Exercício #01" />
            <div className="center">
                <span className="text">{counter}</span>
                <div>
                    <button className="btn"
                    onClick={() => setCounter(counter - 1)}>-1</button>
                    <button className="btn"
                    onClick={() => setCounter(counter + 1)}>+1</button>
                </div>
                <div className="notes">
                    <h2>Caderno de Anotações</h2>
                    <p>Antigamente, não existia como criar um estado dentro de um componente funcional. Agora isso existe com o <strong>useState</strong>. Nossa aplicação é um <strong>contador simples</strong>, considerado o "Olá mundo" do useState.</p>
                    <p>Uma observação importante aqui é <strong>entender bem a arrow-function</strong> dentro dos botões +1 e -1:</p>
                    <code>
                        () => setCounter(counter - 1)
                        () => setCounter(counter - 1)
                    </code>
                    <p>As expressões acima significam o seguinte: quando eu clicar no botão "()" então "=>" eu vou setar o counter colocando como parâmetro o "counter - 1" ou "counter + 1": isso só vai acontecer quando eu <strong>clicar</strong>.</p>
                    <p>Pelo React, eu não altero o estado diretamente - eu altero o estado por meio do setcounter: primeiro eu altero o dado e a interface vai <strong>reagir</strong> a essa mudança.</p>
                </div>

            </div>

        </div>
    )
}

export default UseState
