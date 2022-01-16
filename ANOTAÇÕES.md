# Caderno de Anotações

## No Powershell

```
cd  pasta-onde-vai-ser-criado-projeto
npx create-react-app 'nome-do-app'
npm i react-router-dom@5.2.0
npm start
```
## Funcional

Por que trabalhar com hooks?

Dentro do React temos componentes baseados em classe e funções. É mais interessante trabalhar com componentes funcionais porque além da sintaxe ser mais enxuta, o Javascript é focado fundamentalmente em funções. Até existem classes em JS, mas ela mesma é uma forma diferente de escrever uma função.

Como React é um framework que se baseia em JS, nada mais natural que ele se direcione para as funções. Os hooks são funções. Faz todo o sentido aprender hooks e trabalhar com eles.

## useState

`[example, setExample] = useState("initial")`

### Exercício #01

Antigamente, não existia como criar um estado dentro de um componente funcional. Agora isso existe com o **useState**. Nossa aplicação é um **contador simples**, considerado o "Olá mundo" do useState.

Uma observação importante aqui é entender bem a arrow-function dentro dos botões +1 e -1.

```javascript
// UseState.jsx
<div>
    <button className="btn"
    onClick={() => setCounter(counter - 1)}>-1</button>
    <button className="btn"
    onClick={() => setCounter(counter + 1)}>+1</button>
</div>

```
As expressões acima significam o seguinte: quando eu clicar no botão `()` então `=>` eu vou setar o counter colocando como parâmetro o `counter - 1` ou `counter + 1`. 

Isso só vai acontecer quando eu clicar.

Pelo React, eu não altero o estado diretamente - eu altero o estado por meio do setcounter: primeiro eu altero o dado e a interface vai **reagir** a essa mudança.

### Exercício #02

O input é um componente controlado. Se tentar digitar algo nele, não vai fazer alteração nenhuma na interface. O que acontece?

O input é um **controlled component**.

Esses componentes controlados refletem o estado do componente. O ciclo no React é unidirecional: primeiro se modifica o estado do componente, depois a interface é alterada como consequência. O sentido é: estado atualizado -> interface reflete o estado atualizado.

Para alterar o estado de um componente **é preciso capturar um evento**. 

Valor nulo torna o componente não controlado: o componente não tem vinculação com nenhum estado. Não tem muito sentido... porque precisamos de um componente controlado para fazer a leitura dos dados por meio da captura de um evento. Via de regra, nao trabalhamos com componentes controlados.

O `useState` é o React Hook mais utilizado.

## useEffect

Esse hook é utilizado para lidar com os efeitos colaterais que surgem.

### Exercício 03

No exercício, temos um input do tipo number que, dependendo do valor que tu escolhe, o fatorial é mostrado na tela. A ideia é criar um input do tipo number para vincular o estado a esse componente. Assim, quando modificar o input na tela, automaticamente é modificado o estado... e a interface reage à isso.


```javascript
// UseEffect.jsx
<div>
    <span className="text">Fatorial:</span>
    <span className="text red">{fatorial}</span>
</div>
<input type="number" className="input"
onChange={ e => setNumber(e.target.value)} />

```

A partir do evento click do mouse no input `(e)` eu altero `=>` o estado do number, setando ele `setNumber(e.target.value)`. 

Em seguida, quero mostrar o resultado do fatorial. A função do fatorial é essa aqui e fica fora da função UseEffect (por acaso é chamado desse nome, mas não se trata do hook).

```javascript
function calcFatorial(n) {
    if (n < 0) return -1
    if (n == 0) return 1
    return calcFatorial(n - 1) * n
}
```

Observação: quando eu clico no input para escolher o número, isso gera um efeito colateral em outro componente... que é o fatorial em vermelho. Por ser fatorial, neste caso, afeta um outro estado: `fatorial`.

Só que eu não posso fazer isso.

 _Eu não posso diretamente dentro do corpo da função fazer uma chamada de algo que vai alterar o estado **porque o corpo da função é exatamente o que é responsável por renderizar o componente**_. 

Sempre que você chama o `setFatorial`, ele vai renderizar o componente de forma infinita. O React dá um warning (aviso) informando o problema: ele fica executando várias vezes no browser a renderização, atingindo um número limite. Isso acontece pelo laço infinito. 

Isso porque sempre que você entra dentro do componente e você altera o estado diretamente do componente, ele vai renderizar o componente de novo. E você alterou de novo o estado. E ele vai renderizar de novo... e isso é um laço infinito. **Isso aqui é o que chamamos de "side effect" (efeito colateral)**. E é isso que acontece: o number alterou e eu quero recalcular fatorial... porque o fatorial depende do number.

Pra resolver isso... usamos o hook useEffect.

Esse hook trabalha com dois parâmetros: o primeiro é o effect callback, ou seja, uma função que será chamada quando ele for gerar esse efeito colateral; e o segundo, opcional, é a lista de dependências, "dependency list", que é um array. No nosso caso, o dependency list é o number... porque é dele que eu dependo para calcular o fatorial.

```javascript
useEffect(function () {
    setFatorial(calcFatorial(number))
}, [number])
```

Sempre que o number modificar, eu quero chamar a função calcularFatorial passando ele como parâmetro... para então eu setar o novo valor do fatorial. Quando eu _declaro isso dentro do hook useEffect faz com que **não tenha mais um loop infinito de renderização** no nosso componente_. 

Isso sana o problema inicial.

### Exercício 04

O desafio era dizer se o número do input é par ou ímpar usando o `useEffect`. 

## useRef

Esse hook retorna um objeto mutável com uma propriedade chamada "current". O objeto tem dentro dele uma propriedade chamada "current" cujo valor é o seu estado.

Ref é pela "referência". 

No current podemos ter uma string, número, referência para um HTML, etc. Quando você altera o valor que está na propriedade current, isso não vai renderizar o componente na interface... e daí o fato de que é possível trabalhar com o count.current dentro do const `UseRef = props => {}`

Isso vai funcionar sem problemas porque não irá causar uma nova renderização: **não vai no loop infinito de renderizações**. Enquanto eu tiver renderizando o mesmo objeto (sem trocar de tela, por exemplo), esse hook useRef sempre retorna a mesma referência e assim consigo mexer no atributo current.

No useState, cada vez que mexo no estado do componente, ele é renderizado na interface. **Aqui não acontece isso**: você troca o valor da propriedade current e isso não vai gerar uma nova renderização do componente.

### Exercício 05

Criamos um contador que altera o valor do .current e mostra na tela sem renderizar a cada atualização.

### Exercício 06

Existe uma forma de você usar o useRef para conseguir pegar, por exemplo, um determinado elemento do HTML. Existe a propriedade `ref` que pode apontar para dentro de um objeto que representa uma referência. Isso é feito usando o useRef e colocando a propriedade "ref" no elemento HTML. 

Nesse exercício, isso é feito.

```javascript
// UseRef.jsx
const myInput1 = useRef(null)
const myInput2 = userRef(null)

// (Veja no código o original... aqui são apenas trechos)

    </div>
        <input type="text" className="input"
        ref={myInput1}                                                  // REF aqui
        value={value1} onChange={e => setValue1(e.target.value)} />
    </div>

    <SectionTitle title="#06 - Exercício" />
    <div className="center">
        <input type="text" className="input" 
        ref={myInput2}                                                  // REF aqui
        value={value2} onChange={e => setValue2(e.target.value)}/>
    </div>
```

Uma vez que tu tem um atributo "REF" dentro do elemento JSX e aplicou dentro do par de chaves, interpolado, o objeto que tem um `.current`, automaticamente, o React vai colocar uma referência para esse input dentro do atributo `.current` desse objeto que é retornado pelo useRef. De tal forma que se eu pedir para ele imprimir o que tem dentro de `myInput1.current`, nesse caso a gente vai ver que inicialmente tem o valor nulo, que foi como determinamos no código. 

Se começamos a escrever, ele muda e tem uma referência para o input. 

## useMemo

### Exercício 07

Nesse exercício, temos 3 inputs. A soma dos dois primeiros aparece na tela com o número maior centralizado. 

Vamos supor que esses dois primeiros inputs tenham demora qualquer na hora de somar os dados. O terceiro input só poderia ser alterado depois dos dois primeiros - o que resulta em demora. O hook `useMemo` vem para resolver esse tipo de problema. 

_É possível também resolver o problema usando o `useEffect` e o `useState`. Mas para fins de aprendizado, focamos no `useMemo`._

O useMemo tem dois parâmetros: o primeiro é uma função, e o segundo parâmetro é o array das dependências.

```javascript
function sum(n1, n2) {
    const future = Date.now() + 2000
    while(Date.now() < future) {} // Espera 2s.
    return n1 + n2
}

const UseMemo = (props) => {

    const [n1, setN1] = useState(0)
    const [n2, setN2] = useState(0)
    const [n3, setN3] = useState(0)

    const result = useMemo( () => sum(n1, n2), [n1, n2] ) // Aqui 2 parâmetros
    // parâmetro 1: função arrow
    // parâmetro 2: array das dependências
```

Agora usamos o useMemo: o resultado da soma é memorizado. É o que o useMemo faz: ele armazena um valor, um resultado que foi feito anteriormente, calculado anteriormente, foi armazenado em uma variável. Esse **resultado só será chamado novamente caso os valores do qual ele depende (n1 e n2) sejam alterados**. 

O input 3 fica livre porque a soma não depende de n3, apenas de n1 e n2. 

Dessa forma, se agora clicar no input 1 e input 2, ainda acontecem as demoras... mas ao clicar no input 3, ele não mais precisa esperar pelos inputs anteriores. Isso porque temos esse valor da soma pré-calculado - é como se fosse um valor em cache. O n3 não é dependência, não faz parte do array de dependências.


## useCallback

É similar ao useMemo mas aqui retorna uma função memorizada.

### Exercício 08

No exercício, temos 3 botões e o resultado da soma entre eles.

A soma precisa ser renderizada na tela todas as vezes que um botão é clicado. No entanto, o botão não precisa ser renderizado a cada clique. Ou seja, nem tudo que está na tela precisa ser renderizado: no nosso caso, só nos interessa o resultado da soma dos valores. Para resolver isso, usamos o `useCallback` que evita que a função seja chamada a cada clique, ela é memorizada.

```javascript
// Original no UseCallback.jsx:
    const [count, setCount] = useState(0)

    const inc = useCallback(function (delta) {
        setCount(current => current + delta)
    }, [setCount])

// No UseCallbackButtons.jsx:
export default React.memo(UseCallbackButtons)
```

A função soma fica guardada dentro do hook `useCallback` que recebe dois parâmetros: uma função e o array de dependências. Para evitar que ela seja renderizada todas as vezes que o botão é clicado, no array de dependências entra o setCount. Se eu passar o count no array de dependências, o count se modifica sempre e chama a função o tempo todo que é modificado. O `setCount` porque ela só é criada uma única vez e não será modificada mais - por isso a dependência é sobre ela e o componente botão não será renderizado mais vezes.

## "Context API"

Por que precisamos de algo como "Context API"?

Porque os frameworks de componentes, como é o caso do React (e outros), existe uma árvore de componentes em que hierarquias são estabelecidas. As comunicações diretas e indiretas entre componentes dependem dos elementos na hierarquia, de modo que eu às vezes preciso envolver determinados componentes para conseguir chegar no componente final, com o qual desejo me comunicar. É desnecessário envolvê-los - e envolvê-los torna tudo muito complexo.

_Imagina que essa árvore é gigante... o tamanho do problema e complexidade._

Nesse caso não faz sentido comunicação direta e indireta porque a complexidade é muito alta.

Melhor que isso é criar um **contexto fora dessa árvore em que dados possam ser acessados e manipulados por qualquer componente** na árvore. Grosso modo, esse é o **Context API**. 

Context API e hooks normalmente são usados juntos.

### Exercício 09

Primeiro criamos um arquivo Javascript em que criamos o `DataContext.js` e alocamosm o objeto `data`. Também criamos o `DataContext` por meio do `React.createContext(data)`: é um objeto de contexto criado a partir do CreateContext com o objeto data.

```javascript
//DataContext.js
import React from 'react'

export const data = {
    number: 100,
    text: 'Context API'
}
const DataContext = React.createContext(data)

export default DataContext
```

O hook UseContext aceita o objeto de contexto e retorna o valor atual do contexto. 

O DataContext precisa estar presente no componente mais "alto" da árvore, que é o componente `<App />`. Também poderíamos colocar no `index.js` que é onde injetamos toda a nossa aplicação. Mas no exercício fizemos pelo App mesmo.

```javascript
// App.jsx
const App = props => {

    const [state, setState] = useState(data)

    return (    // Aqui embaixo tá o DataContext
    <DataContext.Provider value={ {state: state, setState: setState} }> 
                <div className="App">
                    <Router>
                        <Menu />
                        <Content />
                    </Router>
                </div>
        </DataContext.Provider>     // Termina aqui: envolve toda a aplicação
    )       // Todos os componentes tem acesso ao DataContext
}
```
Pra modificar o valor das chaves do objeto, precisa ter cuidado pra não mudar todo o objeto  - e não apenas a chave desejada. Nesse caso, o "destructuring" do Javascript é bem-vindo pra resolver o problema:

```javascript
//UseContext.jsx
    function changeNumber(delta) {
        context.setState({
            ...context.state,           // destructuring aqui
            number: context.state.number + delta    // só altera isso
        })
    }
```
O contexto sobrevive a aplicação inteira: se sair de outra tela e voltar, o contexto ainda é válido. Se der refresh/atualizar a página, ele reinicia com o valor inicial. Lembrando que é acessível a todos os componentes da aplicação.

## useReducer

Tem relação forte com o Redux.

Provavelmente o useReducer existe em React, com esse nome reducer, porque a comunidade usou por muito tempo o React junto com o Redux. Dentro do Redux, usa-se um reducer. O Redux é a implementação de um padrão, chamado Flux. Devido a essa fonte de inspiração e histórico de uso da comunidade do React, hoje existe o hook chamado `useReducer` inspirado no reducer usado no Redux. Se não fosse isso, provavelmente não usariam esse nome "reducer" para o hook. 

Só pra lembrar que o Redux é uma biblioteca de gerenciamento de estados.

### Exercício 11

Inicialmente, criamos um estado inicial. Imaginemos que a nossa aplicação é um e-commerce que tem carrinho, usuário, lista de produtos, número de quantidade, etc. Inicialmente, esses atributos iniciam com zero ou vazios... e a medida que ele vai evoluindo, o useReducer gerencia o estado desse objeto inicial.

O useReducer faz o gerenciamento do estado inicial por meio de uma função que chamaremos de `reducer`. Essa função recebe dois parâmetros: o primeiro, o estado atual; o segundo parâmetro é a função `action` em que definimos o `como` vai evoluir o estado. Quem gerencia tudo isso é a função `reducer`. 

O `action` sempre tem, pelo menos, o atributo "tipo"... que é o `type`. E também temos um retorno padrão;

O objetivo da função `reducer` é **pegar o estado atual e, para cada ação que for acontecendo, ele vai evoluir o estado alterando algum atributo dele**. No nosso caso inicial, o estado atual é o initialState e a única alteração que fizemos até agora é adicionar 2 ao number.

Fica assim, por enquanto, o código:

```javascript
// UseReducer.jsx

const initialState = {
    cart: [],
    products: [],
    user: null,
    number: 0
}

function reducer(state, action) {
    switch(action.type) {                   // Podia ser um if/else
        case 'numberAdd2':
            return {
            ...state,
            number: state.number + 2
        }
        case 'login':
            return {
                ...state,
                user: {name: action.payload} }
        default:
            return state
    }
}
```

Assim criamos o layout do exercício 11 que vai mostrar o atributo dos estados atuais. Fizemos um botão +2 para aumentar o contador e também um botão de login que, quando clicado, dispara o nome que está definido no estado.

O `useReducer` recebe dois parâmetros: a função que gerencia o estado; e o segundo parâmetro é o estado inicial da aplicação.

```javascript
// UseReducer.jsx
const UseReducer = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState) // 2 parãmetros
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
                    </div>
                </div>
            </div>
    )
}
```

Assim gerenciamos o estado da aplicação. Esse estado é mais complexo porque recebe um objeto com alguns atributos. Normalmente, é usado o atributo de nome `payload`... que é um objeto com todos os dados a serem modificados do estado.

O nome `dispatcher` é uma convenção, é a função que é "disparada" para fazer as alterações no estado.