import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '../models/IMailProvider';

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    });
  }

  public async sendEmail(to: string, body: string): Promise<void> {
    const message = {
      from: 'Equipe GoBarber <equipe@gobarber.com.br>',
      to,
      subject: 'Recuperação de senha',
      text: body,
    };

    await this.client.sendMail(message, (err, info) => {
      if (err) {
        console.log('Error occurred: ', err.message);
        return process.exit(1);
      }

      console.log('Message sent: ', info.messageId);
      console.log('Preview URL: ', nodemailer.getTestMessageUrl(info));

      return info;
    });
  }
}

export default EtherealMailProvider;
