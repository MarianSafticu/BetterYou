package Service;

import Model.RegistrationLink;
import Model.Goal;
import Model.Habit;
import Model.User;
import Model.validator.UserValidator;
import Model.validator.UserValidatorException;
import Repository.RegistrationLinkRepo;
import Repository.RepoException;
import Repository.UserRepo;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;
import utils.AppUtils;
import utils.mail.MailUtils;

import java.time.LocalDate;
import java.util.List;


@Component
@ComponentScan("Repository")
@ComponentScan("utils")
@ComponentScan("Model")
public class ServiceImpl implements Service {
    private static final Logger LOG = LogManager.getLogger(ServiceImpl.class);
    private static final String REGISTER_CONFIRM_PATH = "localhost:8080/register/confirm/"; // Should be replaced

    private final UserRepo userRepo;
    private final RegistrationLinkRepo registrationLinkRepo;
    private final AppUtils appUtils;
    private final UserValidator userValidator;
    private final MailUtils mailUtils;

    @Autowired
    public ServiceImpl(final UserRepo userRepo,
                       final AppUtils appUtils,
                       final UserValidator userValidator,
                       final MailUtils mailUtils,
                       final RegistrationLinkRepo registrationLinkRepo) {
        this.userRepo = userRepo;
        this.appUtils = appUtils;
        this.userValidator = userValidator;
        this.mailUtils = mailUtils;
        this.registrationLinkRepo = registrationLinkRepo;
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
    public String register(final String username, final String profileName, final String password, final String email, final LocalDate birthDate) {
        LOG.info("New user wants to register with email {}, username {} and profile name {}", email, username, profileName);

        User newUser = new User(username, profileName, appUtils.encode(password), email, birthDate);

        LOG.info("Validating user input data");
        try {
            userValidator.validateUser(newUser);
            LOG.info("User validation completed successfully");
        } catch (UserValidatorException e) {
            LOG.info("User data is invalid: {}", e.getMessage());
            throw new ServiceException("User data is invalid: " + e.getMessage());
        }

        try {
            userRepo.add(newUser);
        } catch (RepoException e) {
            LOG.error(e.getMessage());
            throw new ServiceException("Something went wrong while saving the user", e);
        }

        try {
            long newUserId = userRepo.getUserByEmail(newUser.getEmail()).getId();
            String registrationConfirmLink = REGISTER_CONFIRM_PATH + AppUtils.generateCode();
            registrationLinkRepo.add(new RegistrationLink(newUserId, registrationConfirmLink));
            mailUtils.sendRegistrationEmail(newUser, registrationConfirmLink);
            return appUtils.createJWT(String.valueOf(newUserId));
        } catch (RepoException e) {
            LOG.error("Something went wrong while creating and sending registration link: {}", e.getMessage());
            throw new ServiceException("Something went wrong while creating and sending registration link", e);
        }
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
