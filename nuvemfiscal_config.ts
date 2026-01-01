
/**
 * Configurações Oficiais da Nuvem Fiscal
 * Gerenciadas internamente para maior segurança e simplicidade da UI.
 */
export const NUVEM_FISCAL_CONFIG = {
  CLIENT_ID: 'SEU_CLIENT_ID_AQUI',
  CLIENT_SECRET: 'SEU_CLIENT_SECRET_AQUI',
  // Defina aqui o ambiente: 'sandbox' ou 'production'
  ENVIRONMENT: 'sandbox' as 'sandbox' | 'production',
};

export const NUVEM_FISCAL_ENDPOINTS = {
  auth: 'https://auth.nuvemfiscal.com.br/oauth/token',
  sandbox: 'https://api-sandbox.nuvemfiscal.com.br',
  production: 'https://api.nuvemfiscal.com.br',
};
