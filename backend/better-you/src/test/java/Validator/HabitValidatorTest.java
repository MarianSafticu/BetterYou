package Validator;

import Model.Category;
import Model.Habit;
import Model.Repetition;
import org.junit.Before;
import org.junit.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.*;

public class HabitValidatorTest {
    private static final String TITLE = "Habit";
    private static final String INVALID_TITLE = "aa";
    private static final String DESCRIPTION = "TO DO ..";
    private static final String INVALID_DESCRIPTION = null;
    private static final LocalDate START_DATE = LocalDate.now().minusDays(10);
    private static final LocalDate INVALID_START_DATE = null;
    private static final Repetition REPETITION = Repetition.DAILY;
    private static final Repetition INVALID_REPETITION = null;
    private static final Category CATEGORY = Category.PERSONAL;
    private static final Category INVALID_CATEGORY = null;
    private static final List<LocalDate> DATES = new ArrayList<>();

    private static final String INVALID_TITLE_ERROR = "Title must have at least 3 characters.\n";
    private static final String INVALID_DESCRIPTION_ERROR = "Description must have at least 3 characters.\n";
    private static final String INVALID_START_DATE_ERROR = "StartDate must be defined.\n";
    private static final String INVALID_REPETITION_ERROR = "RepetitionType must be defined.\n";
    private static final String INVALID_CATEGORY_ERROR = "Category must be defined.\n";

    private Habit habit;
    private HabitValidator habitValidator;

    @Before
    public void beforeTest() {
        habitValidator = new HabitValidator();
        habit = new Habit(TITLE,DESCRIPTION,START_DATE,REPETITION,CATEGORY,DATES);
    }

    @Test
    public void WHEN_HabitIsValid_THEN_NoExceptionIsThrown() {
        habitValidator.validateHabit(habit);
    }

    @Test
    public void WHEN_HabitHasInvalidTitle_THEN_ValidatorExceptionIsThrown() {
        try {
            habit.setTitle(INVALID_TITLE);
            habitValidator.validateHabit(habit);
            fail("Expected ValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(INVALID_TITLE_ERROR));
        }
    }

    @Test
    public void WHEN_HabitHasInvalidDescription_THEN_ValidatorExceptionIsThrown() {
        try {
            habit.setDescription(INVALID_DESCRIPTION);
            habitValidator.validateHabit(habit);
            fail("Expected ValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(INVALID_DESCRIPTION_ERROR));
        }
    }


    @Test
    public void WHEN_HabitHasInvalidStartDate_THEN_ValidatorExceptionIsThrown() {
        try {
            habit.setStartDate(INVALID_START_DATE);
            habitValidator.validateHabit(habit);
            fail("Expected ValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(INVALID_START_DATE_ERROR));
        }
    }

    @Test
    public void WHEN_HabitHasInvalidRepetition_THEN_ValidatorExceptionIsThrown() {
        try {
           habit.setRepetitionType(INVALID_REPETITION);
            habitValidator.validateHabit(habit);
            fail("Expected ValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(INVALID_REPETITION_ERROR));
        }
    }

    @Test
    public void WHEN_HabitHasInvalidCategory_THEN_ValidatorExceptionIsThrown() {
        try {
            habit.setCategory(INVALID_CATEGORY);
            habitValidator.validateHabit(habit);
            fail("Expected ValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(INVALID_CATEGORY_ERROR));
        }
    }

    @Test
    public void WHEN_HabitHasNoValidData_THEN_HabitValidatorExceptionIsThrown() {
        try {
            Habit invalid_habit = new Habit(INVALID_TITLE,INVALID_DESCRIPTION,INVALID_START_DATE,INVALID_REPETITION,INVALID_CATEGORY,DATES);
            habitValidator.validateHabit(invalid_habit);
            fail("Expected ValidatorException to be thrown");
        } catch (ValidatorException e) {
            assertThat(e.getMessage(), equalTo(INVALID_TITLE_ERROR + INVALID_DESCRIPTION_ERROR + INVALID_START_DATE_ERROR
                    + INVALID_REPETITION_ERROR + INVALID_CATEGORY_ERROR));
        }
    }

}