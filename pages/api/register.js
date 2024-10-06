// pages/api/register.js
import { hashNRCData } from '../../utils/hash'; // Import your hashing function
import { sendToBlockchain } from '../../utils/solana'; // Import your blockchain interaction function

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { fullName, nrcNumber, dateOfBirth, address } = req.body;

        console.log('Received data:', { fullName, nrcNumber, dateOfBirth, address });

        try {
            // Validate incoming data
            if (!fullName || !nrcNumber || !dateOfBirth || !address) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            // Hash the NRC data
            const hashedData = hashNRCData({ fullName, nrcNumber, dateOfBirth, address });

            // Send the hashed data to the blockchain
            const txResult = await sendToBlockchain(hashedData);

            // Respond with success
            res.status(200).json({ message: 'Data registered on blockchain!', txResult });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

