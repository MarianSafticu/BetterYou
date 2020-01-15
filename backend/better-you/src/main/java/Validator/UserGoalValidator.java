package Validator;

import Model.UserGoal;
import org.springframework.stereotype.Component;

import java.time.LocalDate;


/**
 * Validator for {@link Model.UserGoal}
 */
@Component
public class UserGoalValidator {

    public void validateUserGoal(final UserGoal userGoal) {
        StringBuilder errorsStringBuilder = new StringBuilder();
        validateStartDate(userGoal.getStartDate(), errorsStringBuilder);
        validateEndDate(userGoal.getEndDate(), userGoal.getStartDate(), errorsStringBuilder);
        validateCurrentProgress(userGoal.getCurrentProgress(), userGoal.getGoal().getProgressToReach(), errorsStringBuilder);
        validateUpvotes(userGoal.getUpvotes(), errorsStringBuilder);
        validateDownvotes(userGoal.getDownvotes(), errorsStringBuilder);

        String errors = errorsStringBuilder.toString();
        if (errors.length() > 0)
            throw new ValidatorException(errors);

    }

    private void validateStartDate(LocalDate startDate, StringBuilder errorStringBuilder) {
        if (startDate == null) {
            errorStringBuilder.append("StartDate should be defined.\n");
        }
    }

    private void validateEndDate(LocalDate endData, LocalDate startDate, StringBuilder errorStringBuilder) {
        if (endData != null) {
            if (startDate != null && endData.isBefore(startDate))
                errorStringBuilder.append("EndDate must be after the startDate.\n");
        } else {
            errorStringBuilder.append("EndDate should be defined.\n");
        }
    }

    private void validateCurrentProgress(int currentProgress, int progressToReach, StringBuilder errorStringBuilder) {
        if (currentProgress < 0) {
            errorStringBuilder.append("Current Progress must be a positive number.\n");
        }
        if (currentProgress > progressToReach) {
            errorStringBuilder.append("Current Progress must be smaller or equal to the value of reaching the user goal.\n");
        }
    }

    private void validateUpvotes(int upvotes, StringBuilder errorStringBuilder) {
        if (upvotes < 0) {
            errorStringBuilder.append("Upvotes cannot be negative\n");
        }
    }

    private void validateDownvotes(int downvotes, StringBuilder errorStringBuilder) {
        if (downvotes < 0) {
            errorStringBuilder.append("Downvotes cannot be negative\n");
        }
    }
}
