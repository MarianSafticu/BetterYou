package Service.lower;


import Model.User;
import Repository.RepoException;
import Service.ServiceException;
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
    private static final String USER_USERNAME = "username";
    private static final String USER_HASHED_PASSWORD = "hashed_pass";
    private static final long USER_ID = 69;
    private static final String JWT_TOKEN = "12s346.23f41.423g43";

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
        doThrow(new ServiceException(error_message)).when(crudServices).addUser(userMock);

        try {
            authService.register(userMock);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo(error_message));
        }

        verify(validationService, times(1)).validateUser(any());
        verify(crudServices, times(1)).addUser(userMock);
    }

    @Test
    public void WHEN_RegistrationLinkRepoThrowsRepoException_THEN_ServiceExceptionIsPropagated() throws RepoException {
        final String error_message = "ERROR_MESSAGE";
        doNothing().when(validationService).validateUser(userMock);
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
        verify(crudServices, times(1)).addUser(userMock);
        verify(crudServices, times(1)).addRegistrationLink(any());
    }

    @Test
    public void WHEN_SuccessfulRegistrationDone_THEN_ValidValueIsReturned() throws RepoException {
        final String expectedJWT = "(-_-)";
        doNothing().when(validationService).validateUser(userMock);
        doNothing().when(crudServices).addUser(userMock);
        doNothing().when(crudServices).addRegistrationLink(any());
        when(userMock.getEmail()).thenReturn(USER_EMAIL);
        when(crudServices.getUserIdFromEmail(USER_EMAIL)).thenReturn(USER_ID);
        when(appUtils.createJWT(String.valueOf(USER_ID))).thenReturn(expectedJWT);

        String actualJWT = authService.register(userMock);
        System.out.println(actualJWT);
        assertThat(actualJWT, equalTo(expectedJWT));

        verify(validationService, times(1)).validateUser(any());
        verify(crudServices, times(1)).addRegistrationLink(any());
        verify(crudServices, times(1)).addUser(userMock);
        verify(appUtils, times(1)).createJWT(String.valueOf(USER_ID));
        verify(crudServices, times(1)).getUserIdFromEmail(USER_EMAIL);
    }
}
