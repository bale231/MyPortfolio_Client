import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inizializza Resend con la tua API key
// IMPORTANTE: Aggiungi RESEND_API_KEY nelle variabili d'ambiente
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validazione dei campi
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tutti i campi sono obbligatori' },
        { status: 400 }
      );
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email non valida' },
        { status: 400 }
      );
    }

    // Template dell'email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .info-row {
              margin-bottom: 15px;
              padding: 10px;
              background: white;
              border-left: 4px solid #667eea;
              border-radius: 4px;
            }
            .label {
              font-weight: bold;
              color: #667eea;
              margin-bottom: 5px;
            }
            .message-box {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin-top: 20px;
              border: 1px solid #e0e0e0;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #999;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📧 Nuovo Messaggio dal Portfolio</h1>
          </div>
          <div class="content">
            <div class="info-row">
              <div class="label">Da:</div>
              <div>${name}</div>
            </div>
            <div class="info-row">
              <div class="label">Email:</div>
              <div>${email}</div>
            </div>
            <div class="info-row">
              <div class="label">Oggetto:</div>
              <div>${subject}</div>
            </div>
            <div class="message-box">
              <div class="label">Messaggio:</div>
              <div style="margin-top: 10px;">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            <p>Questo messaggio è stato inviato dal form di contatto del tuo portfolio</p>
            <p>Portfolio di Luigi Balestrucci © ${new Date().getFullYear()}</p>
          </div>
        </body>
      </html>
    `;

    // Invia l'email usando Resend
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Usa il dominio verificato su Resend
      to: ['luigibalestrucci52@gmail.com'], // La tua email dove ricevere i messaggi
      replyTo: email, // Email del mittente per poter rispondere
      subject: `[Portfolio] ${subject}`,
      html: emailHtml,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Email inviata con successo',
        data: data
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Errore nell\'invio dell\'email:', error);

    return NextResponse.json(
      {
        error: 'Errore nell\'invio dell\'email. Riprova più tardi.',
        details: error.message
      },
      { status: 500 }
    );
  }
}

// Gestisci altri metodi HTTP
export async function GET() {
  return NextResponse.json(
    { message: 'Contact API endpoint. Use POST to send messages.' },
    { status: 200 }
  );
}
