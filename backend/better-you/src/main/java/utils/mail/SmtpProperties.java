package utils.mail;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Properties;


/**
 * Properties extended class which contains the configurations for sending emails:
 * <p>
 * - mail.smtp.host
 * - mail.smtp.auth
 * - mail.smtp.port
 * - mail.smtp.starttls.enable
 */
@Component
public class SmtpProperties extends Properties {

    public SmtpProperties(@Value("${mail.smtp.host}") final String host,
                          @Value("${mail.smtp.port}") final String port,
                          @Value("${mail.smtp.starttls.enable}") final String starttls,
                          @Value("${mail.smtp.auth}") final String auth) {
        super();
        this.put("mail.smtp.host", host);
        this.put("mail.smtp.auth", auth);
        this.put("mail.smtp.port", port);
        this.put("mail.smtp.starttls.enable", starttls);
    }
}
