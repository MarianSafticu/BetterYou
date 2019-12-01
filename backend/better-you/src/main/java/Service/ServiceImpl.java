package Service;

import Model.RegistrationLink;
import Model.Goal;
import Model.Habit;
import Model.User;
import Repository.GoalRepo;
import Repository.HabitsRepo;
import Validator.UserValidator;
import Validator.ValidatorException;
import Repository.RegistrationLinkRepo;
import Repository.RepoException;
import Repository.UserRepo;
import io.jsonwebtoken.Claims;
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
@ComponentScan("Validator")
public class ServiceImpl implements Service {
    private static final Logger LOG = LogManager.getLogger(ServiceImpl.class);
    private static final String REGISTER_CONFIRM_PATH = "localhost:8080/register/confirm/"; // Should be replaced

    private final UserRepo userRepo;
    private final RegistrationLinkRepo registrationLinkRepo;
    private final GoalRepo goalRepo;
    private final HabitsRepo habitsRepo;
    private final AppUtils appUtils;
    private final UserValidator userValidator;
    private final MailUtils mailUtils;

    @Autowired
    public ServiceImpl(final UserRepo userRepo,
                       final AppUtils appUtils,
                       final UserValidator userValidator,
                       final MailUtils mailUtils,
                       final RegistrationLinkRepo registrationLinkRepo,
                       final GoalRepo goalRepo,
                       final HabitsRepo habitsRepo) {
        this.userRepo = userRepo;
        this.appUtils = appUtils;
        this.userValidator = userValidator;
        this.mailUtils = mailUtils;
        this.registrationLinkRepo = registrationLinkRepo;
        this.goalRepo = goalRepo;
        this.habitsRepo = habitsRepo;
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
        } catch (ValidatorException e) {
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
    public boolean resetPassword(final String jwtToken, final String newPassword) {
        LOG.info("Updating password for user attempt");

        long userId = getUserIdFromJWT(jwtToken);

        LOG.info("Fetching user with id \"{}\"", userId);
        User user;
        try {
            user = userRepo.get(userId);
        } catch (RepoException e) {
            LOG.info("User with id \"{}\" does not exist", userId);
            throw new ServiceException("User with id \"" + userId + "\" does not exist");
        }

        LOG.info("Setting up new password for user with id \"{}\"", userId);
        user.setPassword(appUtils.encode(newPassword));

        try {
            LOG.info("Saving the new password of user with id \"{}\" to repository", userId);
            userRepo.update(userId, user);
        } catch (RepoException e) {
            LOG.error("Something went wrong while saving the new password for user with id \"{}\": {}",
                    userId, e.getMessage());
            throw new ServiceException("Something went wrong while saving the new password for user with id \""
                    + userId + "\"", e);
        }

        return true;
    }

    @Override
    public List<Goal> getUserGoals(String jwtToken) {
        LOG.info("Get user goals based on JWT token");
        long userId = getUserIdFromJWT(jwtToken);
        return goalRepo.getUsersGoals(userId);
    }

    @Override
    public List<Habit> getUserHabits(String jwtToken) {
        LOG.info("Get user habits based on JWT token");
        long userId = getUserIdFromJWT(jwtToken);
        return habitsRepo.getUsersHabits(userId);
    }

    private long getUserIdFromJWT(final String jwtToken) {
        LOG.info("Checking JWT token");
        Claims claims;
        try {
            claims = appUtils.decodeJWT(jwtToken);
        } catch (Exception e) {
            LOG.info("Invalid JWT token: {}", e.getMessage());
            throw new ServiceException("Invalid JWT token", e);
        }

        try {
            return Long.parseLong(claims.getId());
        } catch (NumberFormatException e) {
            LOG.error("JWT token contains id with invalid format for long values: {}", e.getMessage());
            throw new ServiceException("Invalid JWT token", e);
        }
    }
}
