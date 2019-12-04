package Service.lower;


import Model.Goal;
import Model.Habit;
import Model.RegistrationLink;
import Model.User;
import Repository.GoalRepo;
import Repository.HabitsRepo;
import Repository.RegistrationLinkRepo;
import Repository.RepoException;
import Repository.UserRepo;
import Service.ServiceException;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static junit.framework.TestCase.fail;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.nullValue;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;


public class CRUDServicesTest {
    private static final String ERROR_MESSAGE = "Error occurred";
    private static final String USER_EMAIL = "user@test.com";
    private static final long USER_ID = 69;

    @Mock
    private UserRepo userRepo;
    @Mock
    private HabitsRepo habitsRepo;
    @Mock
    private GoalRepo goalRepo;
    @Mock
    private RegistrationLinkRepo registrationLinkRepo;
    @Mock
    private User user;
    @Mock
    private RegistrationLink registrationLink;
    @Mock
    private List<Goal> goalList;
    @Mock
    private List<Habit> habitList;

    private CRUDServices crudServices;

    @Before
    public void beforeTest() {
        MockitoAnnotations.initMocks(this);
        crudServices = new CRUDServices(userRepo, habitsRepo, goalRepo, registrationLinkRepo);
    }

    @Test
    public void WHEN_UserRepoThrowsExceptionOnAddUser_THEN_ServiceExceptionIsPropagated() throws RepoException {
        doThrow(new RepoException(ERROR_MESSAGE)).when(userRepo).add(user);
        try {
            crudServices.addUser(user);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("Unable to save user."));
        }
    }

    @Test
    public void WHEN_UserAddedSuccessfully_THEN_NoExceptionIsThrown() throws RepoException {
        doNothing().when(userRepo).add(user);
        crudServices.addUser(user);
    }

    @Test
    public void WHEN_UserWithGivenIdDoesNotExist_THEN_NullIsReturned() throws RepoException {
        doThrow(new RepoException(ERROR_MESSAGE)).when(userRepo).get(USER_ID);
        User actualUser = crudServices.getUserFromId(USER_ID);
        assertThat(actualUser, is(nullValue()));
    }

    @Test
    public void WHEN_UserWithGivenIdExist_THEN_ExpectedUserReturned() throws RepoException {
        when(userRepo.get(USER_ID)).thenReturn(user);
        User actualUser = crudServices.getUserFromId(USER_ID);
        assertThat(actualUser, equalTo(user));
    }

    @Test
    public void WHEN_GetUserByEmailCalled_THEN_ExpectedResultIsReturned() {
        when(userRepo.getUserByEmail(USER_EMAIL)).thenReturn(user);
        User actualUser = crudServices.getUserFromEmail(USER_EMAIL);
        assertThat(actualUser, equalTo(user));
    }

    @Test
    public void WHEN_EmailNotExists_THEN_GetUserIdByEmailThrowsServiceException() {
        when(userRepo.getUserByEmail(USER_EMAIL)).thenReturn(null);
        try {
            crudServices.getUserIdFromEmail(USER_EMAIL);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("No user found with email " + USER_EMAIL));
        }
    }

    @Test
    public void WHEN_EmailExists_THEN_GetUserIdByEmailReturnExpectedValue() {
        when(userRepo.getUserByEmail(USER_EMAIL)).thenReturn(user);
        when(user.getId()).thenReturn(USER_ID);
        long actualId = crudServices.getUserIdFromEmail(USER_EMAIL);
        assertThat(actualId, equalTo(USER_ID));
    }

    @Test
    public void WHEN_UpdateUserFails_THEN_ServiceExceptionIsThrown() throws RepoException {
        doThrow(new RepoException(ERROR_MESSAGE)).when(userRepo).update(USER_ID, user);
        try {
            crudServices.updateUser(USER_ID, user);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("Unable to update user."));
        }
    }

    @Test
    public void WHEN_UpdateUserSuccessful_THEN_NoExceptionIsThrown() throws RepoException {
        doNothing().when(userRepo).update(USER_ID, user);
        crudServices.updateUser(USER_ID, user);
    }

    @Test
    public void WHEN_AddRegistrationLinkFails_THEN_ServiceExceptionIsThrown() throws RepoException {
        doThrow(new RepoException(ERROR_MESSAGE)).when(registrationLinkRepo).add(registrationLink);
        try {
            crudServices.addRegistrationLink(registrationLink);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("Unable to save registration link."));
        }
    }

    @Test
    public void WHEN_AddRegistrationSuccess_THEN_NoExceptionIsThrown() throws RepoException {
        doNothing().when(registrationLinkRepo).add(registrationLink);
        crudServices.addRegistrationLink(registrationLink);
    }

    @Test
    public void WHEN_GetUsersGoalsCalled_THEN_ExpectedResultReturned() {
        when(goalRepo.getUsersGoals(USER_ID)).thenReturn(goalList);
        List<Goal> actualList = crudServices.getUsersGoals(USER_ID);
        assertThat(actualList, equalTo(goalList));
    }

    @Test
    public void WHEN_GetUsersHabitsCalled_THEN_ExpectedResultReturned() {
        when(habitsRepo.getUsersHabits(USER_ID)).thenReturn(habitList);
        List<Habit> actualList = crudServices.getUsersHabits(USER_ID);
        assertThat(actualList, equalTo(habitList));
    }
}
