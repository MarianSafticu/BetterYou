package Service;


import Model.User;
import Repository.UserRepo;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import utils.AppUtils;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


public class ServiceImplTest {
    private static final String USER_EMAIL = "user@test.com";
    private static final String USER_PASSWORD = "plain_pass";
    private static final String USER_HASHED_PASSWORD = "hashed_pass";
    private static final long USER_ID = 69;
    private static final String JWT_TOKEN = "12s346.23f41.423g43";

    @Mock
    private UserRepo userRepoMock;
    @Mock
    private User userMock;
    @Mock
    private AppUtils appUtils;

    private ServiceImpl service;

    @Before
    public void beforeTest() {
        MockitoAnnotations.initMocks(this);
        service = new ServiceImpl(userRepoMock, appUtils);
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
}
