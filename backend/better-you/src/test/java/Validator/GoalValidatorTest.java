package Validator;

import Model.Category;
import Model.Goal;
import org.junit.Before;
import org.junit.Test;

import java.time.LocalDate;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

public class GoalValidatorTest {
    private static final String TITLE = "Goal";
    private static final String INVALID_TITLE = "aa";
    private static final String DESCRIPTION = "TO DO ..";
    private static final String INVALID_DESCRIPTION = null;
    private static final int CURRENT_PROGRESS = 2;
    private static final int INVALID_CURRENT_PROGRESS = 12;
    private static final int PROGRESS_TO_REACH = 10;
    private static final int INVALID_PROGRESS_TO_REACH = -10;
    private static final LocalDate START_DATE = LocalDate.now().minusDays(10);
    private static final LocalDate INVALID_START_DATE = LocalDate.now().plusDays(3);
    private static final LocalDate END_DATE = LocalDate.now();
    private static final LocalDate INVALID_END_DATE = null;
    private static final Category CATEGORY = Category.PERSONAL;
    private static final Category INVALID_CATEGORY = null;
    private static final Boolean IS_PUBLIC = false;


    private static final String INVALID_TITLE_ERROR = "Title must have at least 3 characters.\n";
    private static final String INVALID_DESCRIPTION_ERROR = "Description must have at least 3 characters.\n";
    private static final String INVALID_CURRENT_PROGRESS_ERROR = "Current Progress must be smaller or equal to the value of reaching the goal.\n";
    private static final String INVALID_PROGRESS_TO_REACH_ERROR = "ProgressToReach must have a positive value.\n";
    private static final String INVALID_START_DATE_ERROR = "StartDate must be before or equal to the current date.\n";
    private static final String INVALID_END_DATE_ERROR = "EndDate must be after the startDate.\n";
    private static final String INVALID_CATEGORY_ERROR = "Category should be definied.\n";

    private Goal goal;
    private GoalValidator goalValidator;

    @Before
    public void beforeTest() {
        goalValidator = new GoalValidator();
        goal = new Goal(TITLE,DESCRIPTION,CURRENT_PROGRESS,PROGRESS_TO_REACH,START_DATE,END_DATE,CATEGORY,IS_PUBLIC);
    }

    @Test
    public void WHEN_GoalIsValid_THEN_NoExceptionIsThrown() {
        goalValidator.validateGoal(goal);
    }

    @Test
    public void WHEN_GoalHasInvalidTitle_THEN_ValidatorExceptionIsThrown() {
        try {
            goal.setTitle(INVALID_TITLE);
            goalValidator.validateGoal(goal);
            fail("Expected ValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(INVALID_TITLE_ERROR));
        }
    }

    @Test
    public void WHEN_GoalHasInvalidDescription_THEN_ValidatorExceptionIsThrown() {
        try {
            goal.setDescription(INVALID_DESCRIPTION);
            goalValidator.validateGoal(goal);
            fail("Expected ValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(INVALID_DESCRIPTION_ERROR));
        }
    }

    @Test
    public void WHEN_GoalHasInvalidCurrentProgress_THEN_ValidatorExceptionIsThrown() {
        try {
            goal.setCurrentProgress(INVALID_CURRENT_PROGRESS);
            goalValidator.validateGoal(goal);
            fail("Expected ValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(INVALID_CURRENT_PROGRESS_ERROR));
        }
    }

    @Test
    public void WHEN_GoalHasInvalidProgressToReach_THEN_ValidatorExceptionIsThrown() {
        try {
            goal.setProgressToReach(INVALID_PROGRESS_TO_REACH);
            goalValidator.validateGoal(goal);
            fail("Expected ValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(INVALID_CURRENT_PROGRESS_ERROR + INVALID_PROGRESS_TO_REACH_ERROR));
        }
    }

    @Test
    public void WHEN_GoalHasInvalidStartDate_THEN_ValidatorExceptionIsThrown() {
        try {
            goal.setStartDate(INVALID_START_DATE);
            goalValidator.validateGoal(goal);
            fail("Expected ValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(INVALID_START_DATE_ERROR + INVALID_END_DATE_ERROR));
        }
    }

    @Test
    public void WHEN_GoalHasInvalidEndDate_THEN_ValidatorExceptionIsThrown() {
        try {
            goal.setEndDate(INVALID_END_DATE);
            goalValidator.validateGoal(goal);
            fail("Expected ValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(INVALID_END_DATE_ERROR));
        }
    }

    @Test
    public void WHEN_GoalHasInvalidCategory_THEN_ValidatorExceptionIsThrown() {
        try {
            goal.setCategory(INVALID_CATEGORY);
            goalValidator.validateGoal(goal);
            fail("Expected ValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(INVALID_CATEGORY_ERROR));
        }
    }

    @Test
    public void WHEN_UserHasNoValidData_THEN_UserValidatorExceptionIsThrown() {
        try {
            Goal invalidGoal = new Goal(INVALID_TITLE,INVALID_DESCRIPTION,INVALID_CURRENT_PROGRESS,
                    INVALID_PROGRESS_TO_REACH,INVALID_START_DATE,INVALID_END_DATE,INVALID_CATEGORY,IS_PUBLIC);
            goalValidator.validateGoal(invalidGoal);
            fail("Expected UserValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(INVALID_TITLE_ERROR + INVALID_DESCRIPTION_ERROR + INVALID_CURRENT_PROGRESS_ERROR
                    + INVALID_PROGRESS_TO_REACH_ERROR + INVALID_START_DATE_ERROR + INVALID_END_DATE_ERROR + INVALID_CATEGORY_ERROR));
        }
    }






}