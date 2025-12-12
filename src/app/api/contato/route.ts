import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, phone, message } = body;

    // Validação básica
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
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

    // Aqui você pode:
    // 1. Salvar no banco de dados
    // 2. Enviar email usando um serviço (SendGrid, Resend, etc.)
    // 3. Enviar para um CRM
    // 4. Enviar notificação Slack/Discord
    
    // Por enquanto, apenas logamos e retornamos sucesso
    console.log('Nova mensagem de contato:', {
      name,
      email,
      phone,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Implementar envio de email ou salvamento no banco
    // Exemplo com Resend (descomente e configure):
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'contato@laudok.com.br',
      to: 'contato@laudok.com.br',
      subject: `Nova mensagem de contato de ${name}`,
      html: `
        <h2>Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
    });
    */

    return NextResponse.json(
      {
        success: true,
        message: 'Mensagem enviada com sucesso!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao processar contato:', error);
    return NextResponse.json(
      { error: 'Erro ao processar sua mensagem. Tente novamente.' },
      { status: 500 }
    );
  }
}

