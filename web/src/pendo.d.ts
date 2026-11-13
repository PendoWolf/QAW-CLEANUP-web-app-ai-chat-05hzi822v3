// The Pendo agent, loaded by the Pendo install snippet. It isn't bundled with the
// app, so it may be missing (for example, when the snippet is blocked).
type PendoAgentEventType = "prompt" | "agent_response" | "user_reaction";

interface PendoAgentEventMetadata {
  agentId: string;
  conversationId: string;
  messageId: string;
  content: string;
  modelUsed?: string;
  suggestedPrompt?: boolean;
  toolsUsed?: string[];
  fileUploaded?: boolean;
}

interface Window {
  pendo?: {
    trackAgent: (eventType: PendoAgentEventType, metadata: PendoAgentEventMetadata) => void;
  };
}
