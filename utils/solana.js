// utils/solana.js
import { Connection, clusterApiUrl, Keypair, Transaction, SystemProgram } from '@solana/web3.js';

export const sendToBlockchain = async (hashedData) => {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  
  // Create a new keypair for the transaction
  const from = Keypair.generate();

  // Airdrop some SOL to cover transaction fees
  const airdropSignature = await connection.requestAirdrop(from.publicKey, 2e9); // 2 SOL
  await connection.confirmTransaction(airdropSignature);
  
  // Create a transaction to store the hashed data on-chain
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: from.publicKey, // For demonstration, sending to self
      lamports: 1000,           // Transaction cost
    })
  );
  
  // Send the transaction
  const signature = await connection.sendTransaction(transaction, [from]);
  await connection.confirmTransaction(signature);

  return { signature };
};
