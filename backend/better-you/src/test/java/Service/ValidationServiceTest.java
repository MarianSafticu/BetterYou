package Service;


import Model.Goal;
import Model.Habit;
import Model.User;
import Validator.GoalValidator;
import Validator.HabitValidator;
import Validator.UserValidator;
import Validator.ValidatorException;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static junit.framework.TestCase.fail;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;


public class ValidationServiceTest {
    private static final String ERROR_MESSAGE = "INVALID";

    @Mock
    private UserValidator userValidator;
    @Mock
    private GoalValidator goalValidator;
    @Mock
    private HabitValidator habitValidator;
    @Mock
    private User user;
    @Mock
    private Goal goal;
    @Mock
    private Habit habit;

    private ValidationService validationService;

    @Before
    public void beforeTest() {
        MockitoAnnotations.initMocks(this);
        validationService = new ValidationService(userValidator, habitValidator, goalValidator);
    }

    @Test
    public void WHEN_UserInvalid_THEN_ValidatorExceptionIsThrown() {
        doThrow(new ValidatorException(ERROR_MESSAGE)).when(userValidator).validateUser(user);
        try {
            validationService.validateUser(user);
            fail("Expected ValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(ERROR_MESSAGE));
        }
    }

    @Test
    public void WHEN_UserIsValid_THEN_NoExceptionIsThrown() {
        doNothing().when(userValidator).validateUser(user);
        validationService.validateUser(user);
    }

    @Test
    public void WHEN_GoalInvalid_THEN_ValidatorExceptionIsThrown() {
        doThrow(new ValidatorException(ERROR_MESSAGE)).when(goalValidator).validateGoal(goal);
        try {
            validationService.validateGoal(goal);
            fail("Expected ValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(ERROR_MESSAGE));
        }
    }

    @Test
    public void WHEN_GoalIsValid_THEN_NoExceptionIsThrown() {
        doNothing().when(goalValidator).validateGoal(goal);
        validationService.validateGoal(goal);
    }

    @Test
    public void WHEN_HabitInvalid_THEN_ValidatorExceptionIsThrown() {
        doThrow(new ValidatorException(ERROR_MESSAGE)).when(habitValidator).validateHabit(habit);
        try {
            validationService.validateHabit(habit);
            fail("Expected ValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(ERROR_MESSAGE));
        }
    }

    @Test
    public void WHEN_HabitIsValid_THEN_NoExceptionIsThrown() {
        doNothing().when(habitValidator).validateHabit(habit);
        validationService.validateHabit(habit);
    }
}
