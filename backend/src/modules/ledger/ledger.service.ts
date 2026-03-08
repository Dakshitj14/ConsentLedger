import { Block } from "./block.model";
import { generateHash } from "./hash.util";

class LedgerService {
  private chain: Block[] = [];

  constructor() {
    this.createGenesisBlock();
  }

  private createGenesisBlock() {
    const genesis: Block = {
      index: 0,
      timestamp: new Date().toISOString(),
      type: "GENESIS",
      payload: {},
      prevHash: "0",
      hash: "0"
    };
    this.chain.push(genesis);
  }

  getChain() {
    return this.chain;
  }

  addBlock(type: string, payload: any) {
  const prev = this.chain[this.chain.length - 1];
  const timestamp = new Date().toISOString();

  const rawData = `${prev.index + 1}${timestamp}${type}${JSON.stringify(payload)}${prev.hash}`;
  const hash = generateHash(rawData);

  const block: Block = {
    index: prev.index + 1,
    timestamp,
    type,
    payload,
    prevHash: prev.hash,
    hash
  };

  this.chain.push(block);
  return block;
}

  verifyChain() {
  for (let i = 1; i < this.chain.length; i++) {
    const curr = this.chain[i];
    const prev = this.chain[i - 1];

    if (curr.prevHash !== prev.hash) {
      return { valid: false, corruptedBlock: curr.index, reason: "Broken chain link" };
    }

    const rawData = `${curr.index}${curr.timestamp}${curr.type}${JSON.stringify(curr.payload)}${curr.prevHash}`;
    const recalculatedHash = generateHash(rawData);

    if (curr.hash !== recalculatedHash) {
      return { valid: false, corruptedBlock: curr.index, reason: "Hash mismatch" };
    }
  }

  return { valid: true, corruptedBlock: null };
}
}

export const ledgerService = new LedgerService();