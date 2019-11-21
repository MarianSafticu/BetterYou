package utils.mail;


import Model.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;


/**
 * Class which contains specific email tasks (e.g. sends email for newly registered user)
 */
public class MailUtils {
    private static final Logger LOG = LogManager.getLogger(MailUtils.class);
    private static final String REGISTRATION_EMAIL_HEADER = "Confirm Better You registration!";
    private static final String RESET_PASSWORD_EMAIL_HEADER = "Reset password Better You";

    private final MailSender mailSender;
    private final String registrationEmailContent;
    private final String resetPasswordEmailContent;

    /**
     * @param mailSender             the core class for sending emails
     * @param registrationEmailPath  path to the file which contains the content of the registration email;
     *                               must contain <username> and <link> placeholders
     * @param resetPasswordEmailPath path to the file which contains the content of the reset password email;
     *                               must contain <username> and <link> placeholders
     * @throws URISyntaxException if anything goes wrong while reading the email content files
     * @throws IOException        if anything goes wrong while reading the email content files
     */
    public MailUtils(final MailSender mailSender,
                     final String registrationEmailPath,
                     final String resetPasswordEmailPath) throws URISyntaxException, IOException {
        this.mailSender = mailSender;
        this.registrationEmailContent = new String(Files.readAllBytes(Paths.get(
                getClass().getResource(registrationEmailPath).toURI())));
        this.resetPasswordEmailContent = new String(Files.readAllBytes(Paths.get(
                getClass().getResource(resetPasswordEmailPath).toURI())));
    }

    /**
     * Async sends an email to the newly registered user with a link to confirm his registration.
     *
     * @param user the newly registered user
     */
    public void sendRegistrationEmail(final User user, final String registrationLink) {
        LOG.info("Sending registration email to {}", user.getEmail());
        String personalisedEmailContent = registrationEmailContent
                .replaceAll("<username>", user.getUsername())
                .replaceAll("<link>", registrationLink);
        mailSender.sendEmailAsync(user.getEmail(), REGISTRATION_EMAIL_HEADER, personalisedEmailContent);
    }

    /**
     * Async sends an email to an user who forgot his password and desires to recover it
     *
     * @param user the user who forgot his password
     */
    public void sendRecoverPasswordEmail(final User user, final String resetPasswordLink) {
        LOG.info("Sending reset password email to {}", user.getEmail());
        String personalisedEmailContent = resetPasswordEmailContent
                .replaceAll("<username>", user.getUsername())
                .replaceAll("<link>", resetPasswordLink);
        mailSender.sendEmailAsync(user.getEmail(), RESET_PASSWORD_EMAIL_HEADER, personalisedEmailContent);
    }

    public String getRegistrationEmailContent() {
        return registrationEmailContent;
    }

    public String getResetPasswordEmailContent() {
        return resetPasswordEmailContent;
    }
}
