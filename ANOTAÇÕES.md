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

#