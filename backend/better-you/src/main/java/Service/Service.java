package Service;

import Model.Goal;
import Model.Habit;

import java.time.LocalDate;
import java.util.List;


public interface Service {
    /**
     * Logs in the given user
     *
     * @param email    the users email
     * @param password the users password
     * @return the session token
     * @throws ServiceException if the login fails
     */
    String login(final String email, final String password);

    /**
     * Registers a new user
     *
     * @param username    the users username
     * @param profileName the users profile name
     * @param password    the users password
     * @param email       the users email
     * @param birthDate   the users birth date
     * @return the session token
     * @throws ServiceException if the register fails
     */
    String register(final String username, final String profileName, final String password, final String email, final LocalDate birthDate);

    /**
     * Checks if an user with the given email exists and sends a "recover password" email to it.
     *
     * @param email the users email
     * @return true if the "recover password" email is sent successfully, false otherwise
     * @throws ServiceException if the recover password process fails
     */
    boolean recoverPassword(final String email);

    /**
     * Resets the password for a given user
     *
     * @param jwtToken    the users JWT token
     * @param newPassword the users new password
     * @return true if the password is reset successfully, false otherwise
     * @throws ServiceException if the reset password process fails
     */
    boolean resetPassword(final String jwtToken, final String newPassword);

    /**
     * Returns the list of goals of the user which has the given token
     *
     * @param jwtToken user's token
     * @return the goals list
     */
    List<Goal> getUserGoals(final String jwtToken);

    /**
     * Returns the list of habits of the user which has the given token
     *
     * @param jwtToken user's token
     * @return the goals list
     */
    List<Habit> getUserHabits(final String jwtToken);

    /* Toate arunca service exception daca crapa ceva */
    void addGoal(final Goal goal, final  String jwtToken);
    void deleteGoal(final Goal goal, final  String jwtToken);
    void updateGoal(final Goal goal, final  String jwtToken);
}
