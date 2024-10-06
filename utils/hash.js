// utils/hash.js
export function hashNRCData(data) {
  // Example implementation of hashing logic
  try {
      // Your hashing logic here
      return hashedData; // Ensure this returns the expected output
  } catch (error) {
      console.error('Error hashing NRC data:', error);
      throw new Error('Hashing failed');
  }
}

// utils/solana.js
export async function sendToBlockchain(hashedData) {
  try {
      // Your blockchain logic here
      return txResult; // Ensure this returns the expected output
  } catch (error) {
      console.error('Error sending to blockchain:', error);
      throw new Error('Blockchain transaction failed');
  }
}

