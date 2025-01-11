import { Resend } from 'resend';
import { AppError, ErrorCodes } from '../errors/app.error';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetPasswordEmail = async (to: string, token: string) => {
  try {
    const resetLink = `http://localhost:5173/reset-password?token=${token}`;
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [to],
      subject: 'Réinitialisation de votre mot de passe',
      html: `
        <h1>Réinitialisation de votre mot de passe</h1>
        <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
        <p>Cliquez sur le lien ci-dessous pour définir un nouveau mot de passe :</p>
        <a href="${resetLink}">Réinitialiser mon mot de passe</a>
        <p>Ce lien expirera dans 1 heure.</p>
        <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
      `
    });

    if (error) {
      throw AppError.BadRequest("Erreur lors de l'envoi de l'email", ErrorCodes.BAD_REQUEST, error);
    }

    return data;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw AppError.BadRequest("Erreur lors de l'envoi de l'email", ErrorCodes.BAD_REQUEST);
  }
};
