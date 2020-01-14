package Service;

import Model.Goal;
import Model.Habit;
import Model.User;
import Model.UserGoal;
import Validator.GoalValidator;
import Validator.HabitValidator;
import Validator.UserGoalValidator;
import Validator.UserValidator;
import Validator.ValidatorException;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;


/**
 * Class which offers validation utilities for the models inside the application.
 * Validation offered for:
 * - {@link User}
 * - {@link Habit}
 * - {@link Goal}
 */
@Component
@ComponentScan("Validator")
public class ValidationService {
    private final UserValidator userValidator;
    private final HabitValidator habitValidator;
    private final GoalValidator goalValidator;
    private final UserGoalValidator userGoalValidator;

    /**
     * @param userValidator     validator for {@link User} entity.
     * @param habitValidator    validator for {@link Habit} entity.
     * @param goalValidator     validator for {@link Goal} entity.
     * @param userGoalValidator validator for {@link Model.UserGoal} entity.
     */
    public ValidationService(final UserValidator userValidator,
                             final HabitValidator habitValidator,
                             final GoalValidator goalValidator,
                             final UserGoalValidator userGoalValidator) {
        this.userValidator = userValidator;
        this.habitValidator = habitValidator;
        this.goalValidator = goalValidator;
        this.userGoalValidator = userGoalValidator;
    }

    /**
     * Checks if an user is valid.
     *
     * @param user the user to be validated
     * @throws Service.ServiceException if the user is invalid
     */
    public void validateUser(final User user) {
        try {
            userValidator.validateUser(user);
        } catch (ValidatorException e) {
            throw new ServiceException(e.getMessage());
        }
    }

    /**
     * Checks if a habit is valid.
     *
     * @param habit the habit to be validated
     * @throws Service.ServiceException if the habit is invalid
     */
    public void validateHabit(final Habit habit) {
        try {
            habitValidator.validateHabit(habit);
        } catch (ValidatorException e) {
            throw new ServiceException(e.getMessage());
        }
    }

    /**
     * Checks if a goal is valid.
     *
     * @param goal the goal to be validated
     * @throws Service.ServiceException if the goal is invalid
     */
    public void validateGoal(final Goal goal) {
        try {
            goalValidator.validateGoal(goal);
        } catch (ValidatorException e) {
            throw new ServiceException(e.getMessage());
        }
    }

    /**
     * Checks if an user goal is valid.
     *
     * @param userGoal the goal to be validated
     * @throws Service.ServiceException if the user goal is invalid
     */
    public void validateUserGoal(final UserGoal userGoal) {
        try {
            userGoalValidator.validateUserGoal(userGoal);
        } catch (ValidatorException e) {
            throw new ServiceException(e.getMessage());
        }
    }
}
