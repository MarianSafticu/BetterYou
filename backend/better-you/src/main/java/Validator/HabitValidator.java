package Validator;

import Model.Category;
import Model.Habit;
import Model.Repetition;

import java.time.LocalDate;

/**
 * Validator class for {@link Habit} .
 */
public class HabitValidator {

    /**
     * Validates the details of a given habit and throws {@link ValidatorException} if there is any problem
     * Verification criteria :
     * - title must have at least 3 characters
     * - description must have at least 3 characters
     * - startDate must be before or equal to the current date
     * - repetitionType must be defined
     * - category must be defined
     * @param habit - the habit to be verified
     * @throws ValidatorException if there are any inconsistencies regarding the habit's details (e.g. the title
     *                                   is null or the description  has less than 3 characters)
     */
    public void validateHabit(Habit habit)
    {
        StringBuilder errorStringBuilder = new StringBuilder();
        validateTitle(habit.getTitle(),errorStringBuilder);
        validateDescription(habit.getDescription(),errorStringBuilder);
        validateStartDate(habit.getStartDate(),errorStringBuilder);
        validateRepetitionType(habit.getRepetitionType(),errorStringBuilder);
        validateCategory(habit.getCategory(), errorStringBuilder);

        String errors = errorStringBuilder.toString();
        if(errors.length() > 0)
            throw new ValidatorException(errors);

    }

    private void validateTitle(String title, StringBuilder errorStringBuilder)
    {
        if(title == null || title.length() < 3)
            errorStringBuilder.append("Title must have at least 3 characters.\n");
    }

    private void validateDescription(String description, StringBuilder errorStringBuilder)
    {
        if(description == null || description.length() < 3)
            errorStringBuilder.append("Description must have at least 3 characters.\n");
    }

    private void validateStartDate(LocalDate startDate, StringBuilder errorStringBuilder)
    {
        if(startDate == null || startDate.isAfter(LocalDate.now()))
            errorStringBuilder.append("StartDate must be before or equal to the current date.\n");
    }

    private void validateRepetitionType(Repetition repetitionType, StringBuilder errorStringBuilder)
    {
        if(repetitionType == null)
            errorStringBuilder.append("RepetitionType must be defined.\n");
    }

    private void validateCategory(Category category, StringBuilder errorStringBuilder)
    {
        if(category == null)
            errorStringBuilder.append("Category must be defined.\n");
    }

}
