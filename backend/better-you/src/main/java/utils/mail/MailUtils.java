package utils.mail;


import Model.User;
import org.apache.commons.io.IOUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;


/**
 * Class which contains specific email tasks (e.g. sends email for newly registered user)
 */
@Component
public class MailUtils {
    private static final Logger LOG = LogManager.getLogger(MailUtils.class);
    private static final String REGISTRATION_EMAIL_HEADER = "Confirm Better You registration!";
    private static final String RESET_PASSWORD_EMAIL_HEADER = "Reset password Better You";
    private static final String ENCODING = "UTF-8";

    private final MailSender mailSender;
    private final String registrationEmailContent;
    private final String resetPasswordEmailContent;

    /**
     * @param mailSender             the core class for sending emails
     * @param registrationEmailPath  path to the file which contains the content of the registration email;
     *                               must contain <username> and <link> placeholders
     * @param resetPasswordEmailPath path to the file which contains the content of the reset password email;
     *                               must contain <username> and <link> placeholders
     * @throws IOException if anything goes wrong while reading the email content files
     */
    @Autowired
    public MailUtils(final MailSender mailSender,
                     @Value("${utils.mail.registration.email.path}") final String registrationEmailPath,
                     @Value("${utils.mail.reset.password.email.path}") final String resetPasswordEmailPath)
            throws IOException {
        this.mailSender = mailSender;
        registrationEmailContent = IOUtils.toString(getClass().getResourceAsStream(registrationEmailPath), ENCODING);
        resetPasswordEmailContent = IOUtils.toString(getClass().getResourceAsStream(resetPasswordEmailPath), ENCODING);
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
     */
    public void sendRecoverPasswordEmail(final String email, final String resetPasswordLink) {
        LOG.info("Sending reset password email to {}", email);
        String personalisedEmailContent = resetPasswordEmailContent
                .replaceAll("<username>", email)
                .replaceAll("<link>", resetPasswordLink);
        mailSender.sendEmailAsync(email, RESET_PASSWORD_EMAIL_HEADER, personalisedEmailContent);
    }

    public String getRegistrationEmailContent() {
        return registrationEmailContent;
    }

    public String getResetPasswordEmailContent() {
        return resetPasswordEmailContent;
    }
}
