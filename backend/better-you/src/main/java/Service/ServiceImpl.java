package Service;

import Model.User;
import Repository.UserRepo;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;
import utils.AppUtils;

import java.util.Date;
import java.util.List;


@Component
@ComponentScan("Repository")
@ComponentScan("utils")
public class ServiceImpl implements Service {
    private static final Logger LOG = LogManager.getLogger(ServiceImpl.class);

    private final UserRepo userRepo;
    private final AppUtils appUtils;

    @Autowired
    public ServiceImpl(UserRepo userRepo, AppUtils appUtils) {
        this.userRepo = userRepo;
        this.appUtils = appUtils;
    }

    @Override
    public String login(final String email, final String password) {
        LOG.info("User with email {} wants to login", email);

        User user = userRepo.getUserByEmail(email);

        if (user == null) {
            LOG.info("User with email {} does no exist", email);
            throw new ServiceException("User does not exist with the given email: " + email);
        }

        if (!user.isVerified()) {
            LOG.info("User with email {} is not verified", email);
            throw new ServiceException("User is not verified with the given email: " + email);
        }

        if (!appUtils.verifyPassword(password, user.getPassword())) {
            LOG.info("User with email {} provided wrong password", email);
            throw new ServiceException("Invalid password for user with email: " + email);
        }

        LOG.info("User with email {} provided correct password", email);

        return appUtils.createJWT(String.valueOf(user.getId()));
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

    @Override
    public List<Goal> getUserGoals(String jwtToken) {
        return null;
    }

    @Override
    public List<Habit> getUserHabits(String jwtToken) {
        return null;
    }
}
