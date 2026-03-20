import { Resend } from "resend";

const isDev = process.env.NODE_ENV === "development";

export const sendEmail = async (
  subject: string,
  component: React.ReactElement,
) => {
  const { RESEND_API_KEY, MAIL_DEV_FROM, MAIL_FROM, MAIL_DEV_TO } = process.env;

  if (!RESEND_API_KEY || !MAIL_DEV_FROM || !MAIL_FROM || !MAIL_DEV_TO)
    throw new Error("Variabile d'ambiente mancante");

  const resend = new Resend(RESEND_API_KEY);

  await resend.emails.send({
    from: isDev ? MAIL_DEV_FROM : MAIL_FROM,
    to: MAIL_DEV_TO,
    subject,
    react: component,
  });

  console.log(
    `EMAIL INVIATA DA ${isDev ? MAIL_DEV_FROM : MAIL_FROM} A ${MAIL_DEV_TO}`,
  );
};
