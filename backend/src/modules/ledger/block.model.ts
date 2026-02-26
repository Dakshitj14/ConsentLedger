export interface Block {
  index: number;
  timestamp: string;
  type: string;
  payload: any;
  prevHash: string;
  hash: string;
}