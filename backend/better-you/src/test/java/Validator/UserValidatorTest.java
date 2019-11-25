package Validator;


import Model.User;
import Validator.UserValidator;
import Validator.ValidatorException;
import org.junit.Before;
import org.junit.Test;

import java.time.LocalDate;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

public class UserValidatorTest {
    private static final String VALID_USERNAME = "Vali";
    private static final String INVALID_USERNAME = "a";
    private static final String VALID_EMAIL = "babe69@gmail.you";
    private static final String INVALID_EMAIL = "babe";
    private static final String VALID_PASSWORD = "aaZZa44@";
    private static final String INVALID_PASSWORD = "123";
    private static final String VALID_PROFILE_NAME = "Daniel Cucusleac";
    private static final String INVALID_PROFILE_NAME = "fu";
    private static final LocalDate VALID_BIRTH_DATE = LocalDate.now().minusWeeks(1);
    private static final LocalDate INVALID_BIRTH_DATE = LocalDate.now().plusWeeks(1);

    private static final String INVALID_USERNAME_ERROR = "Username must have at least 3 characters\n";
    private static final String INVALID_EMAIL_ERROR = "Email is invalid\n";
    private static final String INVALID_PASSWORD_ERROR = "Password must be at least 8 characters long and contain at "
            + "least one digit,on lowercase char, one uppercase character, a special character (@#$%^&+=) and no"
            + "whitespaces or tabs\n";
    private static final String INVALID_PROFILE_NAME_ERROR = "Profile name must have at least 3 characters\n";
    private static final String INVALID_BIRTH_DATE_ERROR = "Birth date must be before current date\n";

    private User user;
    private UserValidator userValidator;

    @Before
    public void beforeTest() {
        userValidator = new UserValidator();
        user = new User(VALID_USERNAME, VALID_PROFILE_NAME, VALID_PASSWORD, VALID_EMAIL, VALID_BIRTH_DATE);
    }

    @Test
    public void WHEN_UserIsValid_THEN_NoExceptionIsThrown() {
        userValidator.validateUser(user);
    }

    @Test
    public void WHEN_UserHasInvalidUsername_THEN_UserValidatorExceptionIsThrown() {
        try {
            user.setUsername(INVALID_USERNAME);
            userValidator.validateUser(user);
            fail("Expected UserValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(INVALID_USERNAME_ERROR));
        }
    }

    @Test
    public void WHEN_UserHasInvalidEmail_THEN_UserValidatorExceptionIsThrown() {
        try {
            user.setEmail(INVALID_EMAIL);
            userValidator.validateUser(user);
            fail("Expected UserValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(INVALID_EMAIL_ERROR));
        }
    }

    @Test
    public void WHEN_UserHasInvalidProfileName_THEN_UserValidatorExceptionIsThrown() {
        try {
            user.setProfile_name(INVALID_PROFILE_NAME);
            userValidator.validateUser(user);
            fail("Expected UserValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(INVALID_PROFILE_NAME_ERROR));
        }
    }

    @Test
    public void WHEN_UserHasInvalidBirthDate_THEN_UserValidatorExceptionIsThrown() {
        try {
            user.setBirthDate(INVALID_BIRTH_DATE);
            userValidator.validateUser(user);
            fail("Expected UserValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(INVALID_BIRTH_DATE_ERROR));
        }
    }

    @Test
    public void WHEN_UserHasNoValidData_THEN_UserValidatorExceptionIsThrown() {
        try {
            User invalidUser = new User(INVALID_USERNAME, INVALID_PROFILE_NAME, INVALID_PASSWORD, INVALID_EMAIL,
                    INVALID_BIRTH_DATE);
            userValidator.validateUser(invalidUser);
            fail("Expected UserValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(INVALID_USERNAME_ERROR + INVALID_PROFILE_NAME_ERROR
                    + INVALID_EMAIL_ERROR + INVALID_BIRTH_DATE_ERROR));
        }
    }
}