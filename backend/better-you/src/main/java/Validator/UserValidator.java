package Validator;

import Model.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;

import java.time.LocalDate;


/**
 * Validator class for {@link User}.
 */
@Component
public class UserValidator {
    private static final Logger LOG = LogManager.getLogger(UserValidator.class);
    private static final String PASSWORD_REGEX = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}";
    private static final String EMAIL_REGEX = "^[\\w-_.+]*[\\w-_.]@([\\w]+\\.)+[\\w]+[\\w]$";

    /**
     * Validates the details of a given user and throws {@link ValidatorException} if there are any problems.
     * Verification criteria:
     * - username must have at least 3 characters
     * - profile name must have at least 3 characters
     * - email must be a valid address
     * - Birth date must be before current date
     *
     * @param user the user to be verified
     * @throws ValidatorException if there are any inconsistencies regarding the user's details (e.g. the username
     *                            is null or the profile name has less than 3 characters)
     */
    public void validateUser(final User user) {
        LOG.info("Validating user {}", user);

        StringBuilder errorsStringBuilder = new StringBuilder();

        validateUsername(user.getUsername(), errorsStringBuilder);
        validateProfileName(user.getProfile_name(), errorsStringBuilder);
        validateEmail(user.getEmail(), errorsStringBuilder);
        validateBirthDate(user.getBirthDate(), errorsStringBuilder);

        String errors = errorsStringBuilder.toString();
        if (errors.length() > 0) {
            throw new ValidatorException(errors);
        }
    }

    private void validateUsername(final String username, final StringBuilder errorsStringBuilder) {
        if (username == null || username.length() < 3) {
            errorsStringBuilder.append("Username must have at least 3 characters\n");
        }
    }

    private void validateProfileName(final String profileName, final StringBuilder errorsStringBuilder) {
        if (profileName == null || profileName.length() < 3) {
            errorsStringBuilder.append("Profile name must have at least 3 characters\n");
        }
    }

    private void validateEmail(final String email, final StringBuilder errorsStringBuilder) {
        if (email == null || !email.matches(EMAIL_REGEX)) {
            errorsStringBuilder.append("Email is invalid\n");
        }
    }

    private void validateBirthDate(final LocalDate birthDate, final StringBuilder errorsStringBuilder) {
        if (birthDate == null || birthDate.isAfter(LocalDate.now())) {
            errorsStringBuilder.append("Birth date must be before current date\n");
        }
    }
}
