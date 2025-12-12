/**
 * Cliente para integração com a API PELIP de pré-cadastro
 * 
 * ⚠️ TEMPORARIAMENTE DESABILITADO
 * 
 * Este arquivo está mantido para referência futura.
 * A integração foi removida temporariamente para:
 * 1. Entender melhor os dados disponíveis nos webhooks da Stripe
 * 2. Definir quais informações são realmente necessárias
 * 3. Melhorar o endpoint da API PELIP antes de reimplementar
 * 
 * Para reativar: descomente as chamadas em src/app/api/webhooks/stripe/route.ts
 */

const PELIP_API_URL = 'https://laudok.com.br/PELIP_API/CreateUser';
const PELIP_API_KEY = process.env.PELIP_API_KEY || 'keyTesteParaTestarAcessoAAPIDeOutroAPP';

export interface PelipCreateUserDto {
  Email: string;
  UserName: string;
}

export interface PelipCreateUserResponse {
  Success: boolean;
  UserId: string;
  Email: string;
  UserName: string;
  CallbackUrl: string;
}

/**
 * Cria um usuário pré-cadastrado na API PELIP
 */
export async function createPelipUser(
  email: string,
  userName: string
): Promise<PelipCreateUserResponse> {
  const response = await fetch(PELIP_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'CreateUser-Key': PELIP_API_KEY,
    },
    body: JSON.stringify({
      Email: email,
      UserName: userName,
    } as PelipCreateUserDto),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`PELIP API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data as PelipCreateUserResponse;
}




