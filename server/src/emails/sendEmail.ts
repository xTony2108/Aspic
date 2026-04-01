import { Resend } from "resend";
import { logger } from "../logger";
import { config } from "../config";

const isDev = config.NODE_ENV === "development";

export const sendEmail = async (
  subject: string,
  component: React.ReactElement,
) => {
  const resend = new Resend(config.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: isDev ? config.MAIL_DEV_FROM : config.MAIL_FROM,
      to: config.MAIL_DEV_TO,
      subject,
      react: component,
    });

    logger.info(`[EMAIL] Sent: "${subject}" from ${isDev ? config.MAIL_DEV_FROM : config.MAIL_FROM} to ${config.MAIL_DEV_TO}`);
  } catch (error) {
    logger.error(`[EMAIL] Sending failed: ${error}`);
    throw error;
  }
};
