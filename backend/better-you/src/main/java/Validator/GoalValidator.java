package Validator;

import Model.Category;
import Model.Goal;
import org.springframework.stereotype.Component;

import java.time.LocalDate;


/**
 * Validator class for {@link Goal} .
 */
@Component
public class GoalValidator {
    /**
     * Validates the details of a given goal and throws {@link ValidatorException} if there are any problems.
     * Verification criteria :
     * - title must have at least 3 characters
     * - description must have at least 3 characters
     * - progressToReach must be a positive number
     * - category should not be null
     *
     * @param goal - the goal to be verified
     * @throws ValidatorException if there are any inconsistencies regarding the goal's details (e.g. the title
     *                            is null or the description  has less than 3 characters)
     */
    public void validateGoal(final Goal goal) {
        StringBuilder errorsStringBuilder = new StringBuilder();
        validateTitle(goal.getTitle(), errorsStringBuilder);
        validateDescription(goal.getDescription(), errorsStringBuilder);
        validateProgressToReach(goal.getProgressToReach(), errorsStringBuilder);
        validateCategory(goal.getCategory(), errorsStringBuilder);

        String errors = errorsStringBuilder.toString();
        if (errors.length() > 0)
            throw new ValidatorException(errors);

    }

    private void validateTitle(String title, StringBuilder errorStringBuilder) {
        if (title == null || title.length() < 3)
            errorStringBuilder.append("Title must have at least 3 characters.\n");

    }

    private void validateDescription(String description, StringBuilder errorStringBuilder) {
        if (description == null || description.length() < 3)
            errorStringBuilder.append("Description must have at least 3 characters.\n");
    }

    private void validateProgressToReach(int progressToReach, StringBuilder errorStringBuilder) {
        if (progressToReach < 0)
            errorStringBuilder.append("ProgressToReach must have a positive value.\n");
    }

    private void validateCategory(Category category, StringBuilder errorStringBuilder) {
        if (category == null)
            errorStringBuilder.append("Category should be defined.\n");

    }
}
