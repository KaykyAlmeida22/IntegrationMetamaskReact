import { useState } from 'react';
import {getMetamaskProvider, getBalance, transfer} from './MetaMaskService';

function App() {

const [message, setMessage] = useState("");
  // useState é um hook do React que permite adicionar estado a um componente funcional.
  // O useState retorna um array com dois elementos: o estado atual e uma função para atualizá-lo.
  // Neste caso, message é o estado atual e setMessage é a função que atualiza o estado.
  // O valor inicial do estado é uma string vazia "".

  function getBalanceClick() {

    getBalance("0xc1391c226f904602f98a8beb8390049a1d6eacc4")
      .then((balance) => setMessage(balance))
  }

  function transferClick() {
    transfer("0xc1391c226f904602f98a8beb8390049a1d6eacc4", "", "0.01")
      // o primeiro parâmetro é o endereço de origem, o segundo é o endereço de destino e o terceiro é a quantidade a ser transferida
      .then(txHash => setMessage(txHash))
      // o método then() é usado para lidar com o resultado da função transfer, que retorna o hash da transação
      .catch(err => setMessage(err.message))
      // o método catch() é usado para lidar com erros que podem ocorrer durante a execução da função transfer
  }

  return (
    <div>
      Hello World!
      <br />
      <button onClick={() => getMetamaskProvider()}>Click Me </button>
      <br />
      <button onClick={getBalanceClick}>Get balance </button>
      <br />
      <button onClick={transferClick}>Transfer </button>
      <br />
      {message}
    </div>
  );
}

export default App;
// O componente App é um componente funcional do React que renderiza uma interface simples com três botões e uma mensagem.