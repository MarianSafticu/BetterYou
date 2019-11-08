package Service;

import org.springframework.stereotype.Component;

import java.util.Date;


@Component
public class ServiceImpl implements Service {
    @Override
    public String login(final String email, final String password) {
        return null;
    }

    @Override
    public String register(final String username, final String profileName, final String password, final String email, final Date birthDate) {
        return null;
    }

    @Override
    public boolean recoverPassword(final String email) {
        return false;
    }

    @Override
    public boolean resetPassword(final String email, final String newPassword) {
        return false;
    }
}
