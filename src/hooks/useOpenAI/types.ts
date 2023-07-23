export type OpenAI = {
  apiKey: string;
  proxy: string;
  temperature: number;
  max_tokens: number;
};

export type Azure = {
  apiKey: string;
  resourceName: string;
  temperature: number;
  max_tokens: number;
};

export type Env = {
  OPENAI_API_KEY: string;
  AZURE_API_KEY: string;
};

export type OpenAIStore = {
  openai: OpenAI;
  azure: Azure;
  env: Env;
  updateOpenAI: (openai: OpenAI) => void;
  updateAzure: (azure: Azure) => void;
  updateEnv: (env: Env) => void;
};
