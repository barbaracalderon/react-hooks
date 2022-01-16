import React, { useReducer } from 'react'
import PageTitle from '../../components/layout/PageTitle'
import SectionTitle from '../../components/layout/PageTitle'
import { initialState, reducer } from '../../store'


const UseReducer = (props) => {
    const [ state, dispatch] = useReducer(reducer, initialState)

    return (
            <div className="UseReducer">
                <PageTitle
                    title="Hook UseReducer"
                    subtitle="Uma outra forma de ter estado em componentes funcionais!"
                />
                <SectionTitle title="#11 - Exercícío" />
                <div className="center">
                    { state.user ? 
                        <span className="text"> { state.user.name } </span>
                        : <span className="text">Sem usuário</span>
                    }

                    <span className="text">{ state.number }</span>
                    <div>

                        <button className="btn"
                        onClick={ () => dispatch( { type: 'login', payload: 'Barbara Calderon' })}>Login</button>

                        <button className="btn" 
                        onClick={ () => dispatch({type: 'numberAdd2'})}>
                            +2
                        </button>

                        <button className="btn" 
                        onClick={ () => dispatch({type: 'numberMulti7'})}>
                            * 7
                        </button>
                        <button className="btn" 
                        onClick={ () => dispatch({type: 'numberDiv25'})}>
                            / 25
                        </button>
                        <button className="btn" 
                        onClick={ () => dispatch({type: 'numberInt'})}>
                            Inteiro
                        </button>
                        <button className="btn" 
                        onClick={ () => dispatch({type: 'numberAddN', payload: 14})}>
                            +14
                        </button>
                    </div>
                </div>
                <SectionTitle title="#12 - Exercícío" />
                <span className="text">Reorganização das pastas e funções.</span>
            </div>
    )
}

export default UseReducer
