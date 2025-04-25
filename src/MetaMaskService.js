import Web3 from "web3";

export async function getMetamaskProvider() {
  if (!window.ethereum) throw new Error("MetaMask is not installed");
  // verifica se o MetaMask está instalado no navegador, se tiver instalada o objeto window.ethereum estará disponível.

  const web3 = new Web3(window.ethereum); 
    // cria uma instância do Web3 usando o provedor do MetaMask

  const accounts = await web3.eth.requestAccounts();
    // o método requestAccounts() solicita ao usuário que conecte sua conta do MetaMask

  console.log(accounts);
  // exibe as contas disponíveis no console

  if(!accounts || !accounts.length) throw new Error("Permission Required");
  // se o usuário cancelar a permissão ou não aceitar, accounts será um array vazio

  return web3;
  // retorna a instância do Web3 para que possa ser usada em outras partes do aplicativo

}

export async function getBalance(adress) {
  const web3 = await getMetamaskProvider();
  // chama a função getMetamaskProvider para obter a instância do Web3
  const balance = await web3.eth.getBalance(adress);
  // usa o método getBalance() do Web3 para obter o saldo da conta especificada
  return web3.utils.fromWei (balance);
  // retorna o saldo obtido 
}

export async function transfer(from, to, quantity){
  const web3 = await getMetamaskProvider();
  // chama a função getMetamaskProvider para obter a instância do Web3
  
  web3.utils.towei(quantity, "ether");
  // converte a quantidade de ether para wei, que é a unidade mínima do Ethereum

  const nonce = await web3.eth.getTransactionCount(from, "latest"); // obtém o número de transações enviadas a partir do endereço de origem
  const transaction = {
    from, //tem que ser um endereço que tenha permissão
    to, //pode ser qualquer endereço
    value: web3.utils.toWei(quantity, "ether"), //valor a ser transferido em wei
    gas: 21000, //valor da taxa de transação, vai para os validadores/mineradores da rede
    nonce            //número incremental que representa o número de transações enviadas a partir do endereço de origem
  };

  const txHash = await web3.eth.sendTransaction(transaction);
  // envia a transação para a rede Ethereum usando o método sendTransaction() do Web3
  return txHash.transactionHash;
  // retorna o hash da transação, que é um identificador exclusivo para a transação na blockchain
}