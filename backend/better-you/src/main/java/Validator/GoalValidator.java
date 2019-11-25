package Validator;

import Model.Category;
import Model.Goal;

import java.time.LocalDate;

/**
 * Validator class for {@link Goal} .
 */
public class GoalValidator {
    /**
     * Validates the details of a given goal and throws {@link ValidatorException} if there are any problems.
     * Verification criteria :
     * - title must have at least 3 characters
     * - description must have at least 3 characters
     * - currentProgress must be positive number and smaller or equal to progressToReach
     * - progressToReach must be a positive number
     * - startDate must be before or equals to the currentDate
     * - endDate must be after the the startDate
     * - category should not be null
     *
     * @param goal - the goal to be verified
     * @throws ValidatorException if there are any inconsistencies regarding the user's details (e.g. the title
     *                                  is null or the description  has less than 3 characters)
     */
    public void validateGoal(final Goal goal)
    {
        StringBuilder errorsStringBuilder = new StringBuilder();
        validateTitle(goal.getTitle(),errorsStringBuilder);
        validateDescription(goal.getDescription(),errorsStringBuilder);
        validatecurrentProgress(goal.getCurrentProgress(),goal.getProgressToReach(),errorsStringBuilder);
        validateprogressToReach(goal.getProgressToReach(),errorsStringBuilder);
        validateStartDate(goal.getStartDate(),errorsStringBuilder);
        validateEndDate(goal.getEndDate(),goal.getStartDate(),errorsStringBuilder);
        validateCategory(goal.getCategory(),errorsStringBuilder);

        String errors = errorsStringBuilder.toString();
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

    private void validatecurrentProgress(int currentProgress, int progressToReach, StringBuilder errorStringBuilder)
    {
        if(currentProgress < 0)
            errorStringBuilder.append("Current Progress must be a positive number.\n");
        if(currentProgress > progressToReach)
            errorStringBuilder.append("Current Progress must be smaller or equal to the value of reaching the goal.\n");
    }
    private void validateprogressToReach(int progressToReach, StringBuilder errorStringBuilder)
    {
        if(progressToReach < 0)
            errorStringBuilder.append("ProgressToReach must have a positive value.\n");
    }
    private void validateStartDate(LocalDate startDate, StringBuilder errorStringBuilder)
    {
        if(startDate == null || startDate.isAfter(LocalDate.now()))
            errorStringBuilder.append("StartDate must be before or equal to the current date.\n");
    }
    private void validateEndDate(LocalDate endData, LocalDate startDate, StringBuilder errorStringBuilder)
    {
        if(endData == null || endData.isBefore(startDate))
            errorStringBuilder.append("EndDate must be after the startDate.\n");

    }
    private void validateCategory(Category category, StringBuilder errorStringBuilder)
    {
        if(category == null)
            errorStringBuilder.append("Category should be definied.\n");

    }
}
