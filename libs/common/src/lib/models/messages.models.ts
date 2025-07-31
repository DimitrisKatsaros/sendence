export interface Message {
  id: string;
  message: string;
  user: string;
  timestamp: string; // ISO string for cross-platform compatibility
}

export interface CreateMessage {
  message: string;
  user: string;
}
