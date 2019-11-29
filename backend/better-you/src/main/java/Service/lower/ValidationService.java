package Service.lower;

import Model.Goal;
import Model.Habit;
import Model.User;
import Validator.GoalValidator;
import Validator.HabitValidator;
import Validator.UserValidator;


/**
 * Class which offers validation utilities for the models inside the application.
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
     * @throws Validator.ValidatorException if the user is invalid
     */
    public void validateUser(final User user) {
        userValidator.validateUser(user);
    }

    /**
     * Checks if a habit is valid.
     *
     * @param habit the habit to be validated
     * @throws Validator.ValidatorException if the habit is invalid
     */
    public void validateHabit(final Habit habit) {
        habitValidator.validateHabit(habit);
    }

    /**
     * Checks if a goal is valid.
     *
     * @param goal the goal to be validated
     * @throws Validator.ValidatorException if the goal is invalid
     */
    public void validateGoal(final Goal goal) {
        goalValidator.validateGoal(goal);
    }
}
