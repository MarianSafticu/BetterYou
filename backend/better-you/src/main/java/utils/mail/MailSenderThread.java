package utils.mail;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


/**
 * Thread which sends emails
 */
public class MailSenderThread implements Runnable {
    private static final Logger LOG = LogManager.getLogger(MailSenderThread.class);

    private final String senderEmail;
    private final String senderPassword;
    private final String sendTo;
    private final String mailHeader;
    private final String message;
    private final SmtpProperties smtpProperties;

    /**
     * @param senderEmail    the email address used to send emails
     * @param senderPassword the password for the email address used to send emails
     * @param sendTo         the destination email address
     * @param mailHeader     the title of the email to be sent
     * @param message        the content of the email to be sent
     * @param smtpProperties the properties used for {@link javax.mail}
     */
    public MailSenderThread(final String senderEmail,
                            final String senderPassword,
                            final String sendTo,
                            final String mailHeader,
                            final String message,
                            final SmtpProperties smtpProperties) {
        this.senderEmail = senderEmail;
        this.senderPassword = senderPassword;
        this.sendTo = sendTo;
        this.mailHeader = mailHeader;
        this.message = message;
        this.smtpProperties = smtpProperties;
    }


    @Override
    public void run() {
        try {
            LOG.info("Configuring email to send to \"{}\" with header \"{}\"", sendTo, mailHeader);

            LOG.info("Getting session instance");
            Session session = Session.getInstance(smtpProperties, new javax.mail.Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(senderEmail, senderPassword);
                }
            });

            Message mimeMessage = new MimeMessage(session);
            mimeMessage.setFrom(new InternetAddress(senderEmail));
            mimeMessage.setRecipients(Message.RecipientType.TO, InternetAddress.parse(sendTo));
            mimeMessage.setSubject(mailHeader);
            mimeMessage.setText(message);

            LOG.info("Sending email to {}", sendTo);
            Transport.send(mimeMessage);
            LOG.info("Email sent successfully to {}", sendTo);
        } catch (MessagingException e) {
            LOG.error("Error occurred while creating and sending email to " + sendTo, e);
            throw new MailException(e);
        }
    }
}
