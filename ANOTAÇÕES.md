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
<div>
    <button className="btn"
    onClick={() => setCounter(counter - 1)}>-1</button>
    <button className="btn"
    onClick={() => setCounter(counter + 1)}>+1</button>
</div>

```
As expressões acima significam o seguinte: quando eu clicar no botão `()"` então `=>` eu vou setar o counter colocando como parâmetro o `counter - 1` ou `counter + 1`. Isso só vai acontecer quando eu clicar.

Pelo React, eu não altero o estado diretamente - eu altero o estado por meio do setcounter: primeiro eu altero o dado e a interface vai **reagir** a essa mudança.

### Exercício #02

O input é um componente controlado. Se tentar digitar algo nele, não vai fazer alteração nenhuma na interface. O que acontece?

O input é um **controlled component**.

Esses componentes controlados refletem o estado do componente. O ciclo no React é unidirecional: primeiro se modifica o estado do componente, depois a interface é alterada como consequência. O sentido é: estado atualizado -> interface reflete o estado atualizado.

Para alterar o estado de um componente **é preciso capturar um evento**. 

Valor nulo torna o componente não controlado: o componente não tem vinculação com nenhum estado. Não tem muito sentido... porque precisamos de um componente controlado para fazer a leitura dos dados por meio da captura de um evento. Via de regra, nao trabalhamos com componentes controlados.

O `useState` é o React Hook mais utilizado.

