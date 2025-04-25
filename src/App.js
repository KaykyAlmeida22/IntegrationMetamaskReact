import { useState } from 'react';
import {getMetamaskProvider, getBalance, transfer} from './MetaMaskService';

function App() {

  const [message, setMessage] = useState("");
  // useState é um hook do React que permite adicionar estado a um componente funcional.
  // O useState retorna um array com dois elementos: o estado atual e uma função para atualizá-lo.
  // Neste caso, message é o estado atual e setMessage é a função que atualiza o estado.
  // O valor inicial do estado é uma string vazia "".

  const [adress, setAdress] = useState("0xc1391c226f904602f98a8beb8390049a1d6eacc4"); 
  // O valor inicial do estado adress é um endereço Ethereum de From.
  const [to, setTo] = useState("0x035c2d2f38758069D1C770F503a750bcfD979Ef8");  
  // O valor inicial do estado to é um endereço Ethereum de To. 


  function getBalanceClick() {

    getBalance(adress)
      .then((balance) => setMessage(balance))
  }

  function transferClick() {
    transfer(adress, to, "0.01")
      // o primeiro parâmetro é o endereço de origem, o segundo é o endereço de destino e o terceiro é a quantidade a ser transferida
      .then(txHash => setMessage(txHash))
      // o método then() é usado para lidar com o resultado da função transfer, que retorna o hash da transação
      .catch(err => setMessage(err.message))
      // o método catch() é usado para lidar com erros que podem ocorrer durante a execução da função transfer
  }

  return (
    <div>
      Wallet: <input type="text" value={adress} onChange={(e) => setAdress(e.target.value)} />
      <button onClick={getBalanceClick}>Get balance </button>      
      <br />
      To Wallet: <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
      <br />
      <button onClick={transferClick}>Transfer </button>
      <br />
      {message}
    </div>
  );
}

export default App;
// O componente App é um componente funcional do React que renderiza uma interface simples com três botões e uma mensagem.