import { Blockchain, Block } from './blockchain';

const BLOCKCHAIN_STORAGE_KEY = 'drivechain_blockchain';

// Function to initialize or load the blockchain
export const getBlockchain = (): Blockchain => {
  if (typeof window === 'undefined') {
    // Server-side rendering, return a new blockchain or handle appropriately
    return new Blockchain();
  }

  const storedBlockchain = localStorage.getItem(BLOCKCHAIN_STORAGE_KEY);
  if (storedBlockchain) {
    const parsedChain = JSON.parse(storedBlockchain);
    const blockchain = new Blockchain();
    blockchain.chain = parsedChain.chain.map((blockData: any) => {
      const block = new Block(blockData.timestamp, blockData.data, blockData.previousHash);
      block.hash = blockData.hash;
      block.nonce = blockData.nonce;
      return block;
    });
    blockchain.difficulty = parsedChain.difficulty;
    return blockchain;
  } else {
    const newBlockchain = new Blockchain();
    saveBlockchain(newBlockchain);
    return newBlockchain;
  }
};

// Function to save the blockchain to local storage
export const saveBlockchain = (blockchain: Blockchain): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(BLOCKCHAIN_STORAGE_KEY, JSON.stringify(blockchain));
  }
};

// Example usage (for testing/demonstration)
// const drivechain = getBlockchain();
// drivechain.addBlock(new Block(Date.now(), { licenseId: 'DL123', owner: 'John Doe' }));
// saveBlockchain(drivechain);
// console.log(drivechain.isChainValid());