package utils.mail;

import Model.User;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.io.IOException;
import java.net.URISyntaxException;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


public class MailUtilsTest {
    private static final String USER_EMAIL = "test@yahoo.com";
    private static final String USER_USERNAME = "username";
    private static final String LINK = "https://www.babes.com";
    private static final String REGISTRATION_EMAIL_PATH = "/email/templates/registration_email.txt";
    private static final String RESET_PASSWORD_EMAIL_PATH = "/email/templates/reset_password_email.txt";
    private static final String REGISTRATION_EMAIL_CONTENT = "REGISTRATION TEST CONTENT (.Y.) <username> <link>";
    private static final String RESET_PASSWORD_EMAIL_CONTENT = "RESET PASSWORD TEST CONTENT (y) <username> <link>";
    private static final String CUSTOM_REGISTRATION_EMAIL_CONTENT = "REGISTRATION TEST CONTENT (.Y.) " + USER_USERNAME
            + " " + LINK;
    private static final String CUSTOM_RESET_PASSWORD_EMAIL_CONTENT = "RESET PASSWORD TEST CONTENT (y) " + USER_USERNAME
            + " " + LINK;
    private static final String REGISTRATION_EMAIL_HEADER = "Confirm Better You registration!";
    private static final String RESET_PASSWORD_EMAIL_HEADER = "Reset password Better You";

    @Mock
    private MailSender mailSender;
    @Mock
    private User user;

    private MailUtils mailUtils;

    @Before
    public void beforeTest() throws IOException, URISyntaxException {
        MockitoAnnotations.initMocks(this);
        mailUtils = new MailUtils(mailSender, REGISTRATION_EMAIL_PATH, RESET_PASSWORD_EMAIL_PATH);
        when(user.getEmail()).thenReturn(USER_EMAIL);
        when(user.getUsername()).thenReturn(USER_USERNAME);
    }

    @Test
    public void WHEN_GetRegistrationEmailContentCalled_THEN_ExpectedValueIsReturned() {
        assertThat(mailUtils.getRegistrationEmailContent(), equalTo(REGISTRATION_EMAIL_CONTENT));
    }

    @Test
    public void WHEN_GetResetPasswordEmailContentCalled_THEN_ExpectedValueIsReturned() {
        assertThat(mailUtils.getResetPasswordEmailContent(), equalTo(RESET_PASSWORD_EMAIL_CONTENT));
    }

    @Test
    public void WHEN_RegistrationEmailSend_THEN_EmailContentPlaceholdersAreReplacedAccordingly() {
        doNothing().when(mailSender).sendEmailAsync(USER_EMAIL, REGISTRATION_EMAIL_HEADER,
                CUSTOM_REGISTRATION_EMAIL_CONTENT);

        mailUtils.sendRegistrationEmail(user, LINK);

        verify(mailSender, times(1))
                .sendEmailAsync(USER_EMAIL, REGISTRATION_EMAIL_HEADER, CUSTOM_REGISTRATION_EMAIL_CONTENT);
    }

    @Test
    public void WHEN_ResetPasswordEmailSend_THEN_EmailContentPlaceholdersAreReplacedAccordingly() {
        doNothing().when(mailSender).sendEmailAsync(USER_EMAIL, RESET_PASSWORD_EMAIL_HEADER,
                CUSTOM_RESET_PASSWORD_EMAIL_CONTENT);

        mailUtils.sendRecoverPasswordEmail(user, LINK);

        verify(mailSender, times(1))
                .sendEmailAsync(USER_EMAIL, RESET_PASSWORD_EMAIL_HEADER, CUSTOM_RESET_PASSWORD_EMAIL_CONTENT);
    }
}