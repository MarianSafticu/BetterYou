package Service.lower;

import Model.Goal;
import Model.Habit;
import Model.User;
import Service.ServiceException;
import Validator.GoalValidator;
import Validator.HabitValidator;
import Validator.UserValidator;
import Validator.ValidatorException;


/**
 * Class which offers validation utilities for the models inside the application.
 * Validation offered for:
 * - {@link User}
 * - {@link Habit}
 * - {@link Goal}
 */
public class ValidationService {
    private final UserValidator userValidator;
    private final HabitValidator habitValidator;
    private final GoalValidator goalValidator;

    /**
     * @param userValidator  validator for {@link User} entity.
     * @param habitValidator validator for {@link Habit} entity.
     * @param goalValidator  validator for {@link Goal} entity.
     */
    public ValidationService(final UserValidator userValidator,
                             final HabitValidator habitValidator,
                             final GoalValidator goalValidator) {
        this.userValidator = userValidator;
        this.habitValidator = habitValidator;
        this.goalValidator = goalValidator;
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
}
