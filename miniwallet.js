require('dotenv').config(); // importing dotenv module

const Web3 = require('web3'); // importing web3 module
const apiKey = process.env['apikey']; // connecting the PC to the blockchain using getblock API key
const network = 'goerli';

const node = `https://eth.getblock.io/${apikey}/${network}/`;
const web3 = new Web3(node);

//console.log(web3); and npm node miniwallet.js in terminal to check whether the web3 is running

const accountTo = web3.eth.accounts.create(); // creating a new random account
// console.log(accountTo); run npm node miniwallet.js in terminal to check the information of the created account
// console.log(accountTo.address) fetches the address of the created random account
const privateKey = process.env['privateKey']; // fetching private key from the .env file
const accountFrom = web3.eth.accounts.privateKeyToAccount(privateKey); // putting the private key into the account address section
// console.log(accountFrom) and npm node miniwallet.js in terminal to check whether the privatekey is in the account created
const createSignedTx = async(rawTx)=>{ // to sign the transaction
    rawTx.gas = await web3.eth.estimateGas(rawTx);
    return await accountFrom.signTransaction(rawTx);

}
const sendSignedTx = async(signedTx)=>{ // sending the signed transaction
    web3.eth.sendSignedTxTransaction(signedTx.rawTransaction).then(console.log)
}
const amountTo="0.01" // the amount we'd like to send in Ethereum
const rawTx = {
    to:accountTo.address,
    value:web3.utils.toWei(amountTo,"ether")
}
createSignedTx(rawTx).then(sendSignedTx)
