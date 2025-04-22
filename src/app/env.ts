interface ENV {
  [key: string]: any;
}

const env: ENV = {
  baseGatewayUrl: import.meta.env.VITE_BASE_GATEWAY_URL,
  apiKey: import.meta.env.VITE_API_KEY,
};

export default env;
