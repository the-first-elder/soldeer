import {Connection, Keypair, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import { generateKey } from "./keygen.js";

const connect = new Connection("https://api.devnet.solana.com", "confirmed");

// connect.requestAirdrop

(async () => {
    const connect = new Connection("https://api.devnet.solana.com", "confirmed");
    const Address = generateKey().publicKey;
    console.log({Address});
    console.log(generateKey().privateKey);
    const myAddress = new PublicKey(generateKey().publicKey);
    const signature = await connect.requestAirdrop(myAddress, LAMPORTS_PER_SOL * 0.2);
    console.log("signature",{signature});
    const res = await connect.confirmTransaction(signature);
    console.log("res",{res});
  })();