import { ethers } from 'ethers';
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const INFURA_ID=process.env.INFURA_ID;
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_ID}`);

const account1 = process.env.ACCOUNT1; // sender
const account2 = process.env.ACCOUNT2; // recipient

const privateKey1 = process.env.PRIVATE_KEY1; // sender private key
const wallet = new ethers.Wallet(privateKey1, provider);

const ERC20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
];

const address = ''; // contract address
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const balance = await contract.balanceOf(account1);

    console.log(`\nReading from ${address}\n`);
    console.log(`\nBalance of sender: ${balance}\n`);

    const contractWithWallet = contract.connect(wallet);

    const tx = await contractWithWallet.transfer(account2, balance);
    await tx.wait();

    console.log(tx);

    const balanceOfSender = await contract.balanceOf(account1);
    const balanceOfReciever = await contract.balanceOf(account2);

    console.log(`\nBalance of sender: ${balanceOfSender}\n`);
    console.log(`\nBalance of reciever: ${balanceOfReciever}\n`);
}

main();