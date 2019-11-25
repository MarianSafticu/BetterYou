package utils.mail;


import org.junit.Test;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;


public class SmtpPropertiesTest {
    private static final String PORT = "69";
    private static final String HOST = "The host";
    private static final String AUTH = "Must be true";
    private static final String STARTTLS = "TLS config";


    @Test
    public void WHEN_SmtpPropertiesInstantiated_THEN_ContainsExpectedConfigurations() {
        final SmtpProperties smtpProperties = new SmtpProperties(HOST, PORT, STARTTLS, AUTH);

        assertThat(smtpProperties.get("mail.smtp.host"), equalTo(HOST));
        assertThat(smtpProperties.get("mail.smtp.auth"), equalTo(AUTH));
        assertThat(smtpProperties.get("mail.smtp.port"), equalTo(PORT));
        assertThat(smtpProperties.get("mail.smtp.starttls.enable"), equalTo(STARTTLS));
    }
}
