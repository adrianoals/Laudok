/**
 * Cliente para integração com a API PELIP de pré-cadastro
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


