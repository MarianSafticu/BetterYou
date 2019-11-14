package utils.mail;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.Properties;


/**
 * Mail utils class
 */
public class MailSender {
    private static final Logger LOG = LogManager.getLogger(MailSender.class);

    private final String senderEmail;
    private final String senderPassword;
    private final Properties properties;

    /**
     * @param senderEmail    the email address used to send emails
     * @param senderPassword the password for the email address used to send emails
     * @param properties     the properties used for {@link javax.mail}
     */
    public MailSender(final String senderEmail, final String senderPassword, final Properties properties) {
        this.senderEmail = senderEmail;
        this.senderPassword = senderPassword;
        this.properties = properties;
    }

    /**
     * Synchronously sends an email
     *
     * @param sendTo     the destination email address
     * @param mailHeader the title of the email to be sent
     * @param message    the content of the email to be sent
     * @throws MailException if any error occurs while creating or sending the email
     */
    public void sendEmail(final String sendTo, final String mailHeader, final String message) {
        LOG.info("Send email synchronous to \"{}\"", sendTo);
        Thread emailThread = new Thread(new MailSenderThread(senderEmail, senderPassword, sendTo, mailHeader, message, properties));
        emailThread.start();
        try {
            emailThread.join();
        } catch (InterruptedException e) {
            LOG.error("Error occurred while waiting for email thread to finish", e);
            throw new MailException("Error occurred while waiting for email thread to finish", e);
        }
    }

    /**
     * Asynchronously sends an email
     *
     * @param sendTo     the destination email address
     * @param mailHeader the title of the email to be sent
     * @param message    the content of the email to be sent
     * @throws MailException if any error occurs while creating or sending the email
     */
    public void sendEmailAsync(final String sendTo, final String mailHeader, final String message) {
        LOG.info("Send email async to \"{}\"", sendTo);
        Thread emailThread = new Thread(new MailSenderThread(senderEmail, senderPassword, sendTo, mailHeader, message, properties));
        emailThread.start();
    }
}

