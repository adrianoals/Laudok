import { NextRequest, NextResponse } from 'next/server';

interface LoginData {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginData = await request.json();
    const { email, password } = body;

    // Validação básica
    if (!email || !password) {
      return NextResponse.json(
        { error: 'E-mail e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'E-mail inválido' },
        { status: 400 }
      );
    }

    // TODO: Implementar autenticação real
    // Aqui você pode:
    // 1. Verificar credenciais no banco de dados
    // 2. Integrar com API PELIP para autenticação
    // 3. Usar NextAuth.js ou similar
    // 4. Criar sessão/JWT token
    
    // Por enquanto, apenas logamos e retornamos erro (não autenticamos)
    console.log('Tentativa de login:', {
      email,
      timestamp: new Date().toISOString(),
    });

    // Exemplo de integração futura com API PELIP:
    /*
    const response = await fetch('https://laudok.com.br/PELIP_API/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CreateUser-Key': process.env.PELIP_API_KEY || '',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const data = await response.json();
    // Criar sessão/token aqui
    */

    // Por enquanto, retornamos erro (implementação pendente)
    return NextResponse.json(
      { error: 'Autenticação ainda não implementada. Esta é uma versão de desenvolvimento.' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Erro ao processar login:', error);
    return NextResponse.json(
      { error: 'Erro ao processar login. Tente novamente.' },
      { status: 500 }
    );
  }
}

