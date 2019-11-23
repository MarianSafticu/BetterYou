package Model.validator;

import Model.User;
import org.springframework.stereotype.Component;

import java.time.LocalDate;


/**
 * Validator class for {@link User}.
 */
@Component
public class UserValidator {
    private static final String PASSWORD_REGEX = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}";
    private static final String EMAIL_REGEX = "^[\\w-_.+]*[\\w-_.]@([\\w]+\\.)+[\\w]+[\\w]$";

    /**
     * Validates the details of a given user and throws {@link UserValidatorException} if there are any problems.
     * Verification criteria:
     * - username must have at least 3 characters
     * - profile name must have at least 3 characters
     * - Password must be at least 8 characters long and contain at least one digit,
     * on lowercase char, one uppercase character and a special character (@#$%^&+=) and no whitespaces or tabs
     * - email must be a valid address
     * - Birth date must be before current date
     *
     * @param user the user to be verified
     * @throws UserValidatorException if there are any inconsistencies regarding the user's details (e.g. the username
     *                                is null or the profile name has less than 3 characters)
     */
    public void validateUser(final User user) {
        StringBuilder errorsStringBuilder = new StringBuilder();

        validateUsername(user.getUsername(), errorsStringBuilder);
        validateProfileName(user.getProfile_name(), errorsStringBuilder);
        validatePassword(user.getPassword(), errorsStringBuilder);
        validateEmail(user.getEmail(), errorsStringBuilder);
        validateBirthDate(user.getBirthDate(), errorsStringBuilder);

        String errors = errorsStringBuilder.toString();
        if (errors.length() > 0) {
            throw new UserValidatorException(errors);
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

    private void validatePassword(final String password, final StringBuilder errorsStringBuilder) {
        if (password == null || !password.matches(PASSWORD_REGEX)) {
            errorsStringBuilder.append("Password must be at least 8 characters long and contain at least one digit,"
                    + "on lowercase char, one uppercase character, a special character (@#$%^&+=) and no"
                    + "whitespaces or tabs\n");
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
