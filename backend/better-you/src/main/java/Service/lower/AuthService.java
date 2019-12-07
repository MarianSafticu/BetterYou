package Service.lower;

import Model.RegistrationLink;
import Model.User;
import Service.ServiceException;
import io.jsonwebtoken.Claims;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;
import utils.AppUtils;
import utils.mail.MailUtils;


/**
 * Service class which contains all of the authentication business logic.
 */
public class AuthService {
    private static final Logger LOG = LogManager.getLogger(AuthService.class);

    private final CRUDServices crudServices;
    private final ValidationService validationService;
    private final AppUtils appUtils;
    private final MailUtils mailUtils;

    /**
     * @param crudServices
     * @param validationService
     * @param appUtils
     * @param mailUtils
     */
    public AuthService(final CRUDServices crudServices,
                       final ValidationService validationService,
                       final AppUtils appUtils,
                       final MailUtils mailUtils) {
        this.crudServices = crudServices;
        this.validationService = validationService;
        this.appUtils = appUtils;
        this.mailUtils = mailUtils;
    }

    /**
     * Logs in an user.
     *
     * @param email    the user's email
     * @param password the user's password
     * @return the newly created session token
     * @throws ServiceException if the login fails
     */
    public String login(final String email, final String password) {
        LOG.info("User with email {} wants to login", email);

        User user = crudServices.getUserFromEmail(email);

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

    /**
     * Registers a new user.
     *
     * @param newUser the user to be registered
     * @return the newly created session token
     * @throws ServiceException if the registration fails
     */
    public String register(final User newUser) {
        LOG.info("New user wants to register: {}", newUser);

        LOG.info("Validating user input data");
        validationService.validateUser(newUser);

        LOG.info("User validation completed successfully");
        crudServices.addUser(newUser);

        long newUserId = crudServices.getUserIdFromEmail(newUser.getEmail());
        crudServices.addRegistrationLink(new RegistrationLink(newUserId, AppUtils.generateCode()));
        mailUtils.sendRegistrationEmail(newUser, AppUtils.generateCode());
        return appUtils.createJWT(String.valueOf(newUserId));

    }

    /**
     * Used to reset the password for a logged in user.
     *
     * @param jwtToken    session token
     * @param newPassword the new password to be set
     * @throws ServiceException if the password reset fails
     */
    public void resetPassword(final String jwtToken, final String newPassword) {
        LOG.info("Updating password for user");

        long userId = getUserIdFromJWT(jwtToken);

        LOG.info("Fetching user with id \"{}\"", userId);
        User user = crudServices.getUserFromId(userId);

        if (user == null) {
            LOG.warn("User with id {} does not exist", userId);
            throw new ServiceException("User does not exist");
        }

        LOG.info("Setting up new password for user with id \"{}\"", userId);
        user.setPassword(appUtils.encode(newPassword));

        LOG.info("Saving the new password of user with id \"{}\" to repository", userId);
        crudServices.updateUser(userId, user);
    }

    /**
     * Sends an account recovery message to an email address.
     *
     * @param email the destination email
     * @throws ServiceException if any error occurs
     */
    public void recoverAccount(final String email) {
        throw new NotImplementedException();
    }

    /**
     * Returns the user id from a JWT token
     *
     * @param jwtToken session token
     * @return the user id
     * @throws ServiceException if jwtToken is invalid
     */
    public long getUserIdFromJWT(String jwtToken) {
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
