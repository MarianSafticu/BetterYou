package Service;

import Model.RecoverLink;
import Model.RegistrationLink;
import Model.User;
import io.jsonwebtoken.Claims;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;
import utils.AppUtils;
import utils.mail.MailUtils;


/**
 * Service class which contains all of the authentication business logic.
 */
@Component
@ComponentScan("utils")
public class AuthService {
    private static final Logger LOG = LogManager.getLogger(AuthService.class);

    private final CRUDServices crudServices;
    private final ValidationService validationService;
    private final AppUtils appUtils;
    private final MailUtils mailUtils;
    private final String serverAddress;

    /**
     * @param crudServices      contains CRUD operations for the application's models
     * @param validationService contains validations for the application's models
     * @param appUtils          contains util functions for security
     * @param mailUtils         contains util functions for emailing
     */
    public AuthService(final CRUDServices crudServices,
                       final ValidationService validationService,
                       final AppUtils appUtils,
                       final MailUtils mailUtils,
                       @Value("${frontend.address.port}") String serverAddress) {
        this.crudServices = crudServices;
        this.validationService = validationService;
        this.appUtils = appUtils;
        this.mailUtils = mailUtils;
        this.serverAddress = serverAddress;
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
            throw new ServiceException("Invalid email or password");
        }

        if (!appUtils.verifyPassword(password, user.getPassword())) {
            LOG.info("User with email {} provided wrong password", email);
            throw new ServiceException("Invalid email or password");
        }

        if (!user.isVerified()) {
            LOG.info("User with email {} is not verified", email);
            throw new ServiceException("User is not verified with the given email: " + email);
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
        crudServices.userDataNotUsed(newUser);
        LOG.info("User validation completed successfully");

        crudServices.userDataNotUsed(newUser);

        LOG.info("Hashing password for new user");
        newUser.setPassword(appUtils.encode(newUser.getPassword()));
        LOG.info("Saving new user");
        crudServices.addUser(newUser);

        long newUserId = crudServices.getUserIdFromEmail(newUser.getEmail());
        final String confirmationCode = AppUtils.generateCode();
        String resetLink = serverAddress + "?code=" + confirmationCode;
        LOG.info("Generated confirmation code for user={} is code={}", newUser, confirmationCode);
        crudServices.addRegistrationLink(new RegistrationLink(newUserId, confirmationCode));
        mailUtils.sendRegistrationEmail(newUser, resetLink);
        return appUtils.createJWT(String.valueOf(newUserId));
    }

    public void confirmRegistration(final String confirmationCode) {
        LOG.info("Confirmation registration with code={}", confirmationCode);

        final RegistrationLink registrationLink = crudServices.getRegistrationLinkByCode(confirmationCode);

        if (registrationLink == null) {
            LOG.warn("No registration found with code={}", confirmationCode);
            throw new ServiceException("Invalid registration code");
        }

        final User user = crudServices.getUserFromId(registrationLink.getUserId());

        if (user == null) {
            LOG.warn("No user with id={} found with the from the registration link", registrationLink.getUserId());
            throw new ServiceException("Invalid registration code");
        }

        LOG.info("Updating the user id={} to verified", user.getId());
        user.setVerified(true);
        crudServices.updateUser(user.getId(), user);
        LOG.info("Deleting registration link id={} for user with id={}", registrationLink.getId(), user.getId());
        crudServices.deleteRegistrationLink(registrationLink.getId());
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
        LOG.info("Recovering account for email='{}'", email);

        User user = crudServices.getUserFromEmail(email);

        if (user == null) {
            LOG.info("User with email='{}' not found", email);
            throw new ServiceException("Email does not exist");
        }


        String resetToken = AppUtils.generateCode();
        String resetLink = serverAddress + "account/recover/request?token=" + resetToken;
        LOG.info("resetLink={}", resetLink);
        mailUtils.sendRecoverPasswordEmail(email, resetLink);
        crudServices.addRecoverLink(new RecoverLink(user.getId(), resetToken));
    }

    public void setAccountRecovered(final String resetToken, final String newPassword) {
        LOG.info("Set account recovered for token={} and password={}", resetToken, newPassword);

        RecoverLink recoverLink = crudServices.getRecoverLinkByToken(resetToken);

        if (recoverLink == null) {
            LOG.info("Did not found recover link with token='{}'", resetToken);
            throw new ServiceException("Invalid link");
        }

        try {
            User user = crudServices.getUserFromId(recoverLink.getUserId());
            user.setPassword(appUtils.encode(newPassword));
            crudServices.updateUser(user.getId(), user);
            crudServices.deleteRecoverLink(resetToken);
        } catch (Exception e) {
            LOG.error("Unable to set account as recovered: {}", e.getMessage());
            throw new ServiceException("Unable to reset account", e);
        }
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
