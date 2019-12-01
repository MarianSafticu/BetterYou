package Service;


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
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import utils.AppUtils;
import utils.mail.MailUtils;

import java.util.List;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.instanceOf;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


public class ServiceImplTest {
    private static final String USER_EMAIL = "user@test.com";
    private static final String USER_PASSWORD = "plain_pass";
    private static final String USER_USERNAME = "username";
    private static final String USER_HASHED_PASSWORD = "hashed_pass";
    private static final long USER_ID = 69;
    private static final String JWT_TOKEN = "12s346.23f41.423g43";

    @Mock
    private UserRepo userRepoMock;
    @Mock
    private RegistrationLinkRepo registrationLinkRepo;
    @Mock
    private GoalRepo goalRepo;
    @Mock
    private HabitsRepo habitsRepo;
    @Mock
    private User userMock;
    @Mock
    private AppUtils appUtils;
    @Mock
    private MailUtils mailUtils;
    @Mock
    private UserValidator userValidator;
    @Mock
    private Claims claims;
    @Mock
    private List<Goal> goalList;
    @Mock
    private List<Habit> habitList;


    private ServiceImpl service;

    @Before
    public void beforeTest() {
        MockitoAnnotations.initMocks(this);
        service = new ServiceImpl(userRepoMock, appUtils, userValidator, mailUtils, registrationLinkRepo, goalRepo,
                habitsRepo);
    }

    @Test
    public void WHEN_OnLoginUserDoesNotExist_THEN_ServiceExceptionIsThrown() {
        when(userRepoMock.getUserByEmail(USER_EMAIL)).thenReturn(null);

        try {
            service.login(USER_EMAIL, USER_PASSWORD);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException exception) {
            assertThat(exception.getMessage(), equalTo("User does not exist with the given email: "
                    + USER_EMAIL));
        }

        verify(userRepoMock, times(1)).getUserByEmail(USER_EMAIL);
    }

    @Test
    public void WHEN_OnLoginUserIsNotVerified_THEN_ServiceExceptionIsThrown() {
        when(userRepoMock.getUserByEmail(USER_EMAIL)).thenReturn(userMock);
        when(userMock.isVerified()).thenReturn(false);

        try {
            service.login(USER_EMAIL, USER_PASSWORD);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException exception) {
            assertThat(exception.getMessage(), equalTo("User is not verified with the given email: "
                    + USER_EMAIL));
        }

        verify(userRepoMock, times(1)).getUserByEmail(USER_EMAIL);
        verify(userMock, times(1)).isVerified();
    }

    @Test
    public void WHEN_OnLoginPasswordIsWrong_THEN_ServiceExceptionIsThrown() {
        when(userRepoMock.getUserByEmail(USER_EMAIL)).thenReturn(userMock);
        when(userMock.isVerified()).thenReturn(true);
        when(userMock.getPassword()).thenReturn(USER_HASHED_PASSWORD);
        when(appUtils.verifyPassword(USER_PASSWORD, USER_HASHED_PASSWORD)).thenReturn(false);

        try {
            service.login(USER_EMAIL, USER_PASSWORD);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException exception) {
            assertThat(exception.getMessage(), equalTo("Invalid password for user with email: " + USER_EMAIL));
        }

        verify(userRepoMock, times(1)).getUserByEmail(USER_EMAIL);
        verify(userMock, times(1)).isVerified();
        verify(userMock, times(1)).getPassword();
        verify(appUtils, times(1)).verifyPassword(USER_PASSWORD, USER_HASHED_PASSWORD);
    }

    @Test
    public void WHEN_OnLoginCorrectData_THEN_ValidTokenIsReturned() {
        when(userRepoMock.getUserByEmail(USER_EMAIL)).thenReturn(userMock);
        when(userMock.isVerified()).thenReturn(true);
        when(userMock.getPassword()).thenReturn(USER_HASHED_PASSWORD);
        when(appUtils.verifyPassword(USER_PASSWORD, USER_HASHED_PASSWORD)).thenReturn(true);
        when(userMock.getId()).thenReturn(USER_ID);
        when(appUtils.createJWT(String.valueOf(USER_ID))).thenReturn(JWT_TOKEN);

        String actualToken = service.login(USER_EMAIL, USER_PASSWORD);
        assertThat(actualToken, equalTo(JWT_TOKEN));

        verify(userRepoMock, times(1)).getUserByEmail(USER_EMAIL);
        verify(userMock, times(1)).isVerified();
        verify(userMock, times(1)).getPassword();
        verify(appUtils, times(1)).verifyPassword(USER_PASSWORD, USER_HASHED_PASSWORD);
        verify(userMock, times(1)).getId();
        verify(appUtils, times(1)).createJWT(String.valueOf(USER_ID));
    }

    @Test
    public void WHEN_InvalidUserOnRegistration_THEN_ServiceExceptionIsThrown() {
        final String error_message = "ERROR_MESSAGE";
        doThrow(new ValidatorException(error_message)).when(userValidator).validateUser(any());

        try {
            service.register(USER_USERNAME, USER_USERNAME, USER_PASSWORD, USER_EMAIL, null);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("User data is invalid: " + error_message));
        }

        verify(userValidator, times(1)).validateUser(any());
    }

    @Test
    public void WHEN_RepoExceptionIsThrown_THEN_ServiceExceptionIsPropagated() throws RepoException {
        final String error_message = "ERROR_MESSAGE";
        doNothing().when(userValidator).validateUser(any());
        doThrow(new RepoException(error_message)).when(userRepoMock).add(any());

        try {
            service.register(USER_USERNAME, USER_USERNAME, USER_PASSWORD, USER_EMAIL, null);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("Something went wrong while saving the user"));
            assertThat(e.getCause(), instanceOf(RepoException.class));
            assertThat(e.getCause().getMessage(), equalTo(error_message));
        }

        verify(userValidator, times(1)).validateUser(any());
        verify(userRepoMock, times(1)).add(any());
    }

    @Test
    public void WHEN_RegistrationLinkRepoThrowsRepoException_THEN_ServiceExceptionIsPropagated() throws RepoException {
        final String error_message = "ERROR_MESSAGE";
        doNothing().when(userValidator).validateUser(any());
        doNothing().when(userRepoMock).add(any());
        when(userRepoMock.getUserByEmail(USER_EMAIL)).thenReturn(userMock);
        when(userMock.getId()).thenReturn(USER_ID);
        doThrow(new RepoException(error_message)).when(registrationLinkRepo).add(any());

        try {
            service.register(USER_USERNAME, USER_USERNAME, USER_PASSWORD, USER_EMAIL, null);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("Something went wrong while creating and sending registration "
                    + "link"));
            assertThat(e.getCause(), instanceOf(RepoException.class));
            assertThat(e.getCause().getMessage(), equalTo(error_message));
        }

        verify(userValidator, times(1)).validateUser(any());
        verify(userRepoMock, times(1)).add(any());
        verify(registrationLinkRepo, times(1)).add(any());
    }

    @Test
    public void WHEN_SuccessfulRegistrationDone_THEN_ValidValueIsReturned() throws RepoException {
        final String expectedJWT = "(-_-)";
        doNothing().when(userValidator).validateUser(any());
        doNothing().when(userRepoMock).add(any());
        when(userRepoMock.getUserByEmail(USER_EMAIL)).thenReturn(userMock);
        when(userMock.getId()).thenReturn(USER_ID);
        when(appUtils.createJWT(String.valueOf(USER_ID))).thenReturn(expectedJWT);

        String actualJWT = service.register(USER_USERNAME, USER_USERNAME, USER_PASSWORD, USER_EMAIL, null);
        assertThat(actualJWT, equalTo(expectedJWT));

        verify(userValidator, times(1)).validateUser(any());
        verify(userRepoMock, times(1)).add(any());
        verify(userMock, times(1)).getId();
        verify(appUtils, times(1)).createJWT(String.valueOf(USER_ID));
        verify(userRepoMock, times(1)).getUserByEmail(USER_EMAIL);
    }


    @Test
    public void WHEN_InvalidTokenOnResetPassword_THEN_ServiceExceptionIsThrown() {
        final String error = "Something went wrong";
        when(appUtils.decodeJWT(JWT_TOKEN)).thenThrow(new RuntimeException(error));

        try {
            service.resetPassword(JWT_TOKEN, USER_PASSWORD);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("Invalid JWT token"));
        }

        verify(appUtils, times(1)).decodeJWT(JWT_TOKEN);
    }

    @Test
    public void WHEN_InvalidTokenIdFormat_THEN_ServiceExceptionIsThrown() {
        final String invalidId = "**";
        when(appUtils.decodeJWT(JWT_TOKEN)).thenReturn(claims);
        when(claims.getId()).thenReturn(invalidId);

        try {
            service.resetPassword(JWT_TOKEN, USER_PASSWORD);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("Invalid JWT token"));
        }

        verify(appUtils, times(1)).decodeJWT(JWT_TOKEN);
        verify(claims, times(1)).getId();
    }

    @Test
    public void WHEN_InvalidUserIdWhileResettingPassword_THEN_ServiceExceptionIsThrown() throws RepoException {
        final String error = "Something went wrong";
        when(appUtils.decodeJWT(JWT_TOKEN)).thenReturn(claims);
        when(claims.getId()).thenReturn(String.valueOf(USER_ID));
        when(userRepoMock.get(USER_ID)).thenThrow(new RepoException(error));

        try {
            service.resetPassword(JWT_TOKEN, USER_PASSWORD);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("User with id \"" + USER_ID + "\" does not exist"));
        }

        verify(appUtils, times(1)).decodeJWT(JWT_TOKEN);
        verify(claims, times(1)).getId();
        verify(userRepoMock, times(1)).get(USER_ID);
    }

    @Test
    public void WHEN_RepoExceptionIsThrownOnUpdate_THEN_ServiceExceptionIsPropagated() throws RepoException {
        final String error = "Something went wrong";
        when(appUtils.decodeJWT(JWT_TOKEN)).thenReturn(claims);
        when(claims.getId()).thenReturn(String.valueOf(USER_ID));
        when(userRepoMock.get(USER_ID)).thenReturn(userMock);
        when(appUtils.encode(USER_PASSWORD)).thenReturn(USER_HASHED_PASSWORD);
        doNothing().when(userMock).setPassword(USER_HASHED_PASSWORD);
        doThrow(new RepoException(error)).when(userRepoMock).update(USER_ID, userMock);

        try {
            service.resetPassword(JWT_TOKEN, USER_PASSWORD);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("Something went wrong while saving the new password for user"
                    + " with id \"" + USER_ID + "\""));
        }

        verify(appUtils, times(1)).decodeJWT(JWT_TOKEN);
        verify(claims, times(1)).getId();
        verify(userRepoMock, times(1)).get(USER_ID);
        verify(appUtils, times(1)).encode(USER_PASSWORD);
        verify(userMock, times(1)).setPassword(USER_HASHED_PASSWORD);
        verify(userRepoMock, times(1)).update(USER_ID, userMock);
    }

    @Test
    public void WHEN_ResetPasswordEndsSuccessfully_THEN_TrueIsReturned() throws RepoException {
        when(appUtils.decodeJWT(JWT_TOKEN)).thenReturn(claims);
        when(claims.getId()).thenReturn(String.valueOf(USER_ID));
        when(userRepoMock.get(USER_ID)).thenReturn(userMock);
        when(appUtils.encode(USER_PASSWORD)).thenReturn(USER_HASHED_PASSWORD);
        doNothing().when(userMock).setPassword(USER_HASHED_PASSWORD);
        doNothing().when(userRepoMock).update(USER_ID, userMock);

        boolean actualResult = service.resetPassword(JWT_TOKEN, USER_PASSWORD);
        assertThat(actualResult, is(true));

        verify(appUtils, times(1)).decodeJWT(JWT_TOKEN);
        verify(claims, times(1)).getId();
        verify(userRepoMock, times(1)).get(USER_ID);
        verify(appUtils, times(1)).encode(USER_PASSWORD);
        verify(userMock, times(1)).setPassword(USER_HASHED_PASSWORD);
        verify(userRepoMock, times(1)).update(USER_ID, userMock);
    }

    @Test
    public void WHEN_GetUserGoalsCalled_THEN_ExpectedResultReturned() {
        when(appUtils.decodeJWT(JWT_TOKEN)).thenReturn(claims);
        when(claims.getId()).thenReturn(String.valueOf(USER_ID));
        when(goalRepo.getUsersGoals(USER_ID)).thenReturn(goalList);

        List<Goal> actualList = service.getUserGoals(JWT_TOKEN);
        assertThat(actualList, equalTo(goalList));

        verify(appUtils, times(1)).decodeJWT(JWT_TOKEN);
        verify(claims, times(1)).getId();
    }

    @Test
    public void WHEN_GetUserHabitsCalled_THEN_ExpectedResultReturned() {
        when(appUtils.decodeJWT(JWT_TOKEN)).thenReturn(claims);
        when(claims.getId()).thenReturn(String.valueOf(USER_ID));
        when(habitsRepo.getUsersHabits(USER_ID)).thenReturn(habitList);

        List<Habit> actualList = service.getUserHabits(JWT_TOKEN);
        assertThat(actualList, equalTo(habitList));

        verify(appUtils, times(1)).decodeJWT(JWT_TOKEN);
        verify(claims, times(1)).getId();
    }
}
