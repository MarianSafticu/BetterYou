package Service;


import Model.User;
import Repository.RepoException;
import Service.AuthService;
import Service.CRUDServices;
import Service.ServiceException;
import Service.ValidationService;
import io.jsonwebtoken.Claims;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import utils.AppUtils;
import utils.mail.MailUtils;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class AuthServiceTest {
    private static final String USER_EMAIL = "user@test.com";
    private static final String USER_PASSWORD = "plain_pass";
    private static final String USER_HASHED_PASSWORD = "hashed_pass";
    private static final long USER_ID = 69;
    private static final String JWT_TOKEN = "12s346.23f41.423g43";
    private static final String INVALID_ID = "123A";

    @Mock
    private CRUDServices crudServices;
    @Mock
    private ValidationService validationService;
    @Mock
    private AppUtils appUtils;
    @Mock
    private MailUtils mailUtils;
    @Mock
    private User userMock;
    @Mock
    private Claims claims;

    private AuthService authService;

    @Before
    public void beforeTest() {
        MockitoAnnotations.initMocks(this);
        authService = new AuthService(crudServices, validationService, appUtils, mailUtils);
    }

    @Test
    public void WHEN_OnLoginUserDoesNotExist_THEN_ServiceExceptionIsThrown() {
        when(crudServices.getUserFromEmail(USER_EMAIL)).thenReturn(null);

        try {
            authService.login(USER_EMAIL, USER_PASSWORD);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException exception) {
            assertThat(exception.getMessage(), equalTo("User does not exist with the given email: "
                    + USER_EMAIL));
        }

        verify(crudServices, times(1)).getUserFromEmail(USER_EMAIL);
    }

    @Test
    public void WHEN_OnLoginUserIsNotVerified_THEN_ServiceExceptionIsThrown() {
        when(crudServices.getUserFromEmail(USER_EMAIL)).thenReturn(userMock);
        when(userMock.isVerified()).thenReturn(false);

        try {
            authService.login(USER_EMAIL, USER_PASSWORD);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException exception) {
            assertThat(exception.getMessage(), equalTo("User is not verified with the given email: "
                    + USER_EMAIL));
        }

        verify(crudServices, times(1)).getUserFromEmail(USER_EMAIL);
        verify(userMock, times(1)).isVerified();
    }

    @Test
    public void WHEN_OnLoginPasswordIsWrong_THEN_ServiceExceptionIsThrown() {
        when(crudServices.getUserFromEmail(USER_EMAIL)).thenReturn(userMock);
        when(userMock.isVerified()).thenReturn(true);
        when(userMock.getPassword()).thenReturn(USER_HASHED_PASSWORD);
        when(appUtils.verifyPassword(USER_PASSWORD, USER_HASHED_PASSWORD)).thenReturn(false);

        try {
            authService.login(USER_EMAIL, USER_PASSWORD);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException exception) {
            assertThat(exception.getMessage(), equalTo("Invalid password for user with email: " + USER_EMAIL));
        }

        verify(crudServices, times(1)).getUserFromEmail(USER_EMAIL);
        verify(userMock, times(1)).isVerified();
        verify(userMock, times(1)).getPassword();
        verify(appUtils, times(1)).verifyPassword(USER_PASSWORD, USER_HASHED_PASSWORD);
    }

    @Test
    public void WHEN_OnLoginCorrectData_THEN_ValidTokenIsReturned() {
        when(crudServices.getUserFromEmail(USER_EMAIL)).thenReturn(userMock);
        when(userMock.isVerified()).thenReturn(true);
        when(userMock.getPassword()).thenReturn(USER_HASHED_PASSWORD);
        when(appUtils.verifyPassword(USER_PASSWORD, USER_HASHED_PASSWORD)).thenReturn(true);
        when(userMock.getId()).thenReturn(USER_ID);
        when(appUtils.createJWT(String.valueOf(USER_ID))).thenReturn(JWT_TOKEN);

        String actualToken = authService.login(USER_EMAIL, USER_PASSWORD);
        assertThat(actualToken, equalTo(JWT_TOKEN));

        verify(crudServices, times(1)).getUserFromEmail(USER_EMAIL);
        verify(userMock, times(1)).isVerified();
        verify(userMock, times(1)).getPassword();
        verify(appUtils, times(1)).verifyPassword(USER_PASSWORD, USER_HASHED_PASSWORD);
        verify(userMock, times(1)).getId();
        verify(appUtils, times(1)).createJWT(String.valueOf(USER_ID));
    }

    @Test
    public void WHEN_InvalidUserOnRegistration_THEN_ServiceExceptionIsThrown() {
        final String error_message = "ERROR_MESSAGE";
        doThrow(new ServiceException(error_message)).when(validationService).validateUser(userMock);

        try {
            authService.register(userMock);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo(error_message));
        }

        verify(validationService, times(1)).validateUser(userMock);
    }

    @Test
    public void WHEN_RepoExceptionIsThrown_THEN_ServiceExceptionIsPropagated() {
        final String error_message = "ERROR_MESSAGE";
        doNothing().when(validationService).validateUser(userMock);
        when(userMock.getPassword()).thenReturn(USER_PASSWORD);
        when(appUtils.encode(USER_PASSWORD)).thenReturn(USER_HASHED_PASSWORD);
        doThrow(new ServiceException(error_message)).when(crudServices).addUser(userMock);

        try {
            authService.register(userMock);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo(error_message));
        }

        verify(validationService, times(1)).validateUser(any());
        verify(userMock, times(1)).getPassword();
        verify(appUtils, times(1)).encode(USER_PASSWORD);
        verify(crudServices, times(1)).addUser(userMock);
    }

    @Test
    public void WHEN_RegistrationLinkRepoThrowsRepoException_THEN_ServiceExceptionIsPropagated() throws RepoException {
        final String error_message = "ERROR_MESSAGE";
        doNothing().when(validationService).validateUser(userMock);
        when(userMock.getPassword()).thenReturn(USER_PASSWORD);
        when(appUtils.encode(USER_PASSWORD)).thenReturn(USER_HASHED_PASSWORD);
        doNothing().when(crudServices).addUser(userMock);
        when(crudServices.getUserFromEmail(USER_EMAIL)).thenReturn(userMock);
        when(userMock.getId()).thenReturn(USER_ID);
        doThrow(new ServiceException(error_message)).when(crudServices).addRegistrationLink(any());

        try {
            authService.register(userMock);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo(error_message));
        }

        verify(validationService, times(1)).validateUser(userMock);
        verify(userMock, times(1)).getPassword();
        verify(appUtils, times(1)).encode(USER_PASSWORD);
        verify(crudServices, times(1)).addUser(userMock);
        verify(crudServices, times(1)).addRegistrationLink(any());
    }

    @Test
    public void WHEN_SuccessfulRegistrationDone_THEN_ValidValueIsReturned() throws RepoException {
        final String expectedJWT = "(-_-)";
        doNothing().when(validationService).validateUser(userMock);
        when(userMock.getPassword()).thenReturn(USER_PASSWORD);
        when(appUtils.encode(USER_PASSWORD)).thenReturn(USER_HASHED_PASSWORD);
        doNothing().when(crudServices).addUser(userMock);
        doNothing().when(crudServices).addRegistrationLink(any());
        when(userMock.getEmail()).thenReturn(USER_EMAIL);
        when(crudServices.getUserIdFromEmail(USER_EMAIL)).thenReturn(USER_ID);
        when(appUtils.createJWT(String.valueOf(USER_ID))).thenReturn(expectedJWT);

        String actualJWT = authService.register(userMock);
        System.out.println(actualJWT);
        assertThat(actualJWT, equalTo(expectedJWT));

        verify(validationService, times(1)).validateUser(any());
        verify(userMock, times(1)).getPassword();
        verify(appUtils, times(1)).encode(USER_PASSWORD);
        verify(crudServices, times(1)).addRegistrationLink(any());
        verify(crudServices, times(1)).addUser(userMock);
        verify(appUtils, times(1)).createJWT(String.valueOf(USER_ID));
        verify(crudServices, times(1)).getUserIdFromEmail(USER_EMAIL);
    }

    @Test
    public void WHEN_DecodeJwtThrowsException_THEN_ServiceExceptionIsPropagated() {
        final String error = "Something went wrong";
        when(appUtils.decodeJWT(JWT_TOKEN)).thenThrow(new RuntimeException(error));

        try {
            authService.getUserIdFromJWT(JWT_TOKEN);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("Invalid JWT token"));
            assertThat(e.getCause().getMessage(), equalTo(error));
        }
    }

    @Test
    public void WHEN_JWTIdInvalidFormat_THEN_ServiceExceptionIsPropagated() {
        when(appUtils.decodeJWT(JWT_TOKEN)).thenReturn(claims);
        when(claims.getId()).thenReturn(INVALID_ID);

        try {
            authService.getUserIdFromJWT(JWT_TOKEN);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("Invalid JWT token"));
        }
    }

    @Test
    public void WHEN_UserNotFoundOnResetPassword_THEN_ServiceExceptionIsThrown() {
        when(appUtils.decodeJWT(JWT_TOKEN)).thenReturn(claims);
        when(claims.getId()).thenReturn(String.valueOf(USER_ID));
        when(crudServices.getUserFromId(USER_ID)).thenReturn(null);

        try {
            authService.resetPassword(JWT_TOKEN, USER_PASSWORD);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("User does not exist"));
        }

        verify(appUtils, times(1)).decodeJWT(JWT_TOKEN);
        verify(claims, times(1)).getId();
        verify(crudServices, times(1)).getUserFromId(USER_ID);
    }

    @Test
    public void WHEN_UpdateUserFailsOnResetPassword_THEN_ServiceExceptionIsThrown() {
        final String error = "OH, no!";
        when(appUtils.decodeJWT(JWT_TOKEN)).thenReturn(claims);
        when(claims.getId()).thenReturn(String.valueOf(USER_ID));
        when(crudServices.getUserFromId(USER_ID)).thenReturn(userMock);
        when(appUtils.encode(USER_PASSWORD)).thenReturn(USER_HASHED_PASSWORD);
        doNothing().when(userMock).setPassword(USER_HASHED_PASSWORD);
        doThrow(new ServiceException(error)).when(crudServices).updateUser(USER_ID, userMock);

        try {
            authService.resetPassword(JWT_TOKEN, USER_PASSWORD);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo(error));
        }

        verify(appUtils, times(1)).decodeJWT(JWT_TOKEN);
        verify(claims, times(1)).getId();
        verify(crudServices, times(1)).getUserFromId(USER_ID);
        verify(appUtils, times(1)).encode(USER_PASSWORD);
        verify(userMock, times(1)).setPassword(USER_HASHED_PASSWORD);
        verify(crudServices, times(1)).updateUser(USER_ID, userMock);
    }

    @Test
    public void WHEN_ResetPasswordSuccessfully_THEN_NoExceptionIsThrown() {
        when(appUtils.decodeJWT(JWT_TOKEN)).thenReturn(claims);
        when(claims.getId()).thenReturn(String.valueOf(USER_ID));
        when(crudServices.getUserFromId(USER_ID)).thenReturn(userMock);
        when(appUtils.encode(USER_PASSWORD)).thenReturn(USER_HASHED_PASSWORD);
        doNothing().when(userMock).setPassword(USER_HASHED_PASSWORD);
        doNothing().when(crudServices).updateUser(USER_ID, userMock);

        authService.resetPassword(JWT_TOKEN, USER_PASSWORD);

        verify(appUtils, times(1)).decodeJWT(JWT_TOKEN);
        verify(claims, times(1)).getId();
        verify(crudServices, times(1)).getUserFromId(USER_ID);
        verify(appUtils, times(1)).encode(USER_PASSWORD);
        verify(userMock, times(1)).setPassword(USER_HASHED_PASSWORD);
        verify(crudServices, times(1)).updateUser(USER_ID, userMock);
    }
}
