package Service;


import Model.Goal;
import Model.Habit;
import Model.RegistrationLink;
import Model.User;
import Repository.GoalRepo;
import Repository.HabitsRepo;
import Repository.RegistrationLinkRepo;
import Repository.RepoException;
import Repository.UserRepo;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static junit.framework.TestCase.fail;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.nullValue;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


public class CRUDServicesTest {
    private static final String ERROR_MESSAGE = "Error occurred";
    private static final String USER_EMAIL = "user@test.com";
    private static final long USER_ID = 69;
    private static final long GOAL_ID = 13;

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
    private Goal goal;
    @Mock
    private Goal originalGoal;

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
        when(userRepo.get(USER_ID)).thenReturn(null);
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
    public void WHEN_NonExistingIdOnGetGoals_THEN_ServiceExceptionThrown() {
        when(userRepo.get(USER_ID)).thenReturn(null);

        try {
            crudServices.getUsersGoals(USER_ID);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("No user found with given id!"));
        }

        verify(userRepo, times(1)).get(USER_ID);
    }

    @Test
    public void WHEN_GetUsersGoalsCalled_THEN_ExpectedResultReturned() {
        Set<Goal> goalSet = new HashSet<>();
        Goal goal1 = new Goal();
        goal1.setId(1L);
        Goal goal2 = new Goal();
        goal2.setId(2L);
        Goal goal3 = new Goal();
        goal3.setId(3L);
        goalSet.add(goal1);
        goalSet.add(goal2);
        goalSet.add(goal3);

        when(userRepo.get(USER_ID)).thenReturn(user);
        when(user.getGoals()).thenReturn(goalSet);
        List<Goal> actualList = crudServices.getUsersGoals(USER_ID);
        assertThat(actualList.size(), equalTo(3));
        verify(userRepo, times(1)).get(USER_ID);
    }

    @Test
    public void WHEN_NonExistingIdOnGetHabits_THEN_ServiceExceptionThrown() {
        when(userRepo.get(USER_ID)).thenReturn(null);

        try {
            crudServices.getUsersHabits(USER_ID);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("No user found with given id!"));
        }

        verify(userRepo, times(1)).get(USER_ID);
    }

    @Test
    public void WHEN_GetUsersHabitsCalled_THEN_ExpectedResultReturned() {
        Set<Habit> habitSet = new HashSet<>();
        Habit habit1 = new Habit();
        habit1.setId(1L);
        Habit habit2 = new Habit();
        habit2.setId(2L);
        Habit habit3 = new Habit();
        habit3.setId(3L);
        habitSet.add(habit1);
        habitSet.add(habit2);
        habitSet.add(habit3);

        when(userRepo.get(USER_ID)).thenReturn(user);
        when(user.getHabits()).thenReturn(habitSet);
        List<Habit> actualList = crudServices.getUsersHabits(USER_ID);
        assertThat(actualList.size(), equalTo(3));
        verify(userRepo, times(1)).get(USER_ID);
    }

    @Test
    public void WHEN_AddGoalWithInvalidUserId_THEN_ServiceExceptionIsThrown() {
        when(userRepo.get(USER_ID)).thenReturn(null);

        try {
            crudServices.addGoal(goal, USER_ID);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("There is no user with id " + USER_ID));
        }

        verify(userRepo, times(1)).get(USER_ID);
    }

    @Test
    public void WHEN_GoalRepoAddFails_THEN_ServiceExceptionIsThrown() throws RepoException {
        final String error = "Repo add failed";
        when(userRepo.get(USER_ID)).thenReturn(user);
        doNothing().when(goal).setUser(user);
        doThrow(new RepoException(error)).when(goalRepo).add(goal);

        try {
            crudServices.addGoal(goal, USER_ID);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("Error occurred while adding goal to repo"));
        }

        verify(userRepo, times(1)).get(USER_ID);
        verify(goal, times(1)).setUser(user);
        verify(goalRepo, times(1)).add(goal);
    }

    @Test
    public void WHEN_GoalSuccessfullyAdded_THEN_NoExceptionIsThrown() throws RepoException {
        when(userRepo.get(USER_ID)).thenReturn(user);
        doNothing().when(goal).setUser(user);
        doNothing().when(goalRepo).add(goal);

        crudServices.addGoal(goal, USER_ID);

        verify(userRepo, times(1)).get(USER_ID);
        verify(goal, times(1)).setUser(user);
        verify(goalRepo, times(1)).add(goal);
    }

    @Test
    public void WHEN_InvalidGoalIdOnUpdate_THEN_ServiceExceptionIsThrown() {
        when(goal.getId()).thenReturn(GOAL_ID);
        when(goalRepo.get(GOAL_ID)).thenReturn(null);

        try {
            crudServices.updateGoal(goal, USER_ID);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("No goal found with given id"));
        }

        verify(goal, times(1)).getId();
        verify(goalRepo, times(1)).get(GOAL_ID);
    }

    @Test
    public void WHEN_GoalUserNotSameWithUserOnUpdate_THEN_ServiceExceptionIsThrown() {
        when(goal.getId()).thenReturn(GOAL_ID);
        when(goalRepo.get(GOAL_ID)).thenReturn(originalGoal);
        when(originalGoal.getUser()).thenReturn(user);
        when(user.getId()).thenReturn(USER_ID - 2);

        try {
            crudServices.updateGoal(goal, USER_ID);
            fail("Expected ServiceExceptio to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("Goal not owned by the user!"));
        }

        verify(goal, times(1)).getId();
        verify(goalRepo, times(1)).get(GOAL_ID);
        verify(originalGoal, times(1)).getUser();
        verify(user, times(1)).getId();
    }

    @Test
    public void WHEN_GoalRepoThrowsExceptionOnGoalUpdate_THEN_ServiceExceptionIsPropagated() throws RepoException {
        final String error = "Repo add failed";
        when(goal.getId()).thenReturn(GOAL_ID);
        when(goalRepo.get(GOAL_ID)).thenReturn(originalGoal);
        when(originalGoal.getUser()).thenReturn(user);
        when(user.getId()).thenReturn(USER_ID);
        doThrow(new RepoException(error)).when(goalRepo).update(GOAL_ID, goal);

        try {
            crudServices.updateGoal(goal, USER_ID);
            fail("Expected ServiceExceptio to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("Error occurred while updating goal in repo"));
        }

        verify(goal, times(1)).getId();
        verify(goalRepo, times(1)).get(GOAL_ID);
        verify(originalGoal, times(1)).getUser();
        verify(user, times(1)).getId();
        verify(goalRepo, times(1)).update(GOAL_ID, goal);
    }

    @Test
    public void WHEN_GoalUpdatedSuccessfully_THEN_NoExceptionIsThrown() throws RepoException {
        when(goal.getId()).thenReturn(GOAL_ID);
        when(goalRepo.get(GOAL_ID)).thenReturn(originalGoal);
        when(originalGoal.getUser()).thenReturn(user);
        when(user.getId()).thenReturn(USER_ID);
        doNothing().when(goalRepo).update(GOAL_ID, goal);

        crudServices.updateGoal(goal, USER_ID);

        verify(goal, times(1)).getId();
        verify(goalRepo, times(1)).get(GOAL_ID);
        verify(originalGoal, times(1)).getUser();
        verify(user, times(1)).getId();
        verify(goalRepo, times(1)).update(GOAL_ID, goal);
    }

    @Test
    public void WHEN_InvalidGoalIdOnDeleteGoal_THEN_ServiceExceptionIsThrown() {
        when(goalRepo.get(GOAL_ID)).thenReturn(null);

        try {
            crudServices.deleteGoal(GOAL_ID, USER_ID);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("No goal found with the provided id"));
        }

        verify(goalRepo, times(1)).get(GOAL_ID);
    }

    @Test
    public void WHEN_InvalidUserIdOnDeleteGoal_THEN_ServiceExceptionIsThrown() {
        when(goalRepo.get(GOAL_ID)).thenReturn(goal);
        when(goal.getUser()).thenReturn(user);
        when(user.getId()).thenReturn(USER_ID + 1);

        try {
            crudServices.deleteGoal(GOAL_ID, USER_ID);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("Goal not owned by the user!"));
        }

        verify(goalRepo, times(1)).get(GOAL_ID);
        verify(goal, times(1)).getUser();
        verify(user, times(1)).getId();
    }

    @Test
    public void WHEN_GoalRepoFailsOnDelete_THEN_ServiceExceptionIsPropagated() throws RepoException {
        final String error = "Something went very ... very ... dirty!";
        when(goalRepo.get(GOAL_ID)).thenReturn(goal);
        when(goal.getUser()).thenReturn(user);
        when(user.getId()).thenReturn(USER_ID);
        doThrow(new RepoException(error)).when(goalRepo).delete(GOAL_ID);

        try {
            crudServices.deleteGoal(GOAL_ID, USER_ID);
            fail("Expected ServiceException to be thrown");
        } catch (ServiceException e) {
            assertThat(e.getMessage(), equalTo("Error occurred while deleting goal in repo"));
        }

        verify(goalRepo, times(1)).get(GOAL_ID);
        verify(goal, times(1)).getUser();
        verify(user, times(1)).getId();
        verify(goalRepo, times(1)).delete(GOAL_ID);
    }

    @Test
    public void WHEN_GoalDeletedSuccessfully_THEN_NoExceptionIsThrown() throws RepoException {
        when(goalRepo.get(GOAL_ID)).thenReturn(goal);
        when(goal.getUser()).thenReturn(user);
        when(user.getId()).thenReturn(USER_ID);
        doNothing().when(goalRepo).delete(GOAL_ID);

        crudServices.deleteGoal(GOAL_ID, USER_ID);

        verify(goalRepo, times(1)).get(GOAL_ID);
        verify(goal, times(1)).getUser();
        verify(user, times(1)).getId();
        verify(goalRepo, times(1)).delete(GOAL_ID);
    }
}
