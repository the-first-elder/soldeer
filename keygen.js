import { Keypair } from "@solana/web3.js";

// console.log({ wallet });

export const generateKey = () => {
  const wallet = Keypair.generate();

  const publicKey = wallet.publicKey.toBase58();
  const privateKey = wallet.secretKey;
//   console.log("publickey", publicKey);
  return { publicKey, privateKey };
};

generateKey();
