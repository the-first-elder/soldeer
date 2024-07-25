import {Connection, Keypair, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction, LAMPORTS_PER_SOL, clusterApiUrl}from '@solana/web3.js';
import walletKey from './wallet.json' assert {type : "json"};

const to = new PublicKey('4s662n2WeGoJaJX2CDXe6cgSfA6qSKb1oy1sga7PKd2P');

const from = Keypair.fromSecretKey(new Uint8Array(walletKey));

const connect = new Connection(clusterApiUrl("devnet"), "confirmed");

const balance = await connect.getBalance(from.publicKey);

console.log(to, from.publicKey)
const transfer = async () => {
    console.log(balance);

    if(balance ==0){
        console.log("you dont have the balance");
        // top up wallet 
    const myAddress = from.publicKey;

    const signature = await connect.requestAirdrop(myAddress, LAMPORTS_PER_SOL * 0.2);
    console.log(signature);
        pay();
    }else{
        try {
            
            pay();
        } catch (error) {
            console.log(error);
        }
    }
    // connect.sendTransactionTransaction
}


const pay= async ()=> {
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: balance
        })
    )
    transaction.feePayer = from.publicKey;
    const recentBlockHash = await connect.getLatestBlockhash("confirmed");
    transaction.recentBlockhash = (recentBlockHash).blockhash;

    const fee =
      (
        await connect.getFeeForMessage(
          transaction.compileMessage(),
          "confirmed"
        )
      ).value || 0;
    
    // const fee = await connect.getFeeForMessage(transaction.compileMessage(),"confirmed").value || 0;
    transaction.instructions.pop();
    transaction.add( SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: balance - fee
    }))

    const send = await sendAndConfirmTransaction(connect, transaction, [from]);
    console.log(send);
}

transfer();

// FdzfL3ztXCUe4CFN9vyLPd4oP7vNV4mfE41yFwgqSJV1