package Service;


import Model.Goal;
import Model.Habbit;

import java.util.Date;
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
    String register(final String username, final String profileName, final String password, final String email, final Date birthDate);

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
     * @param email       the users email
     * @param newPassword the users new password
     * @return true if the password is reset successfully, false otherwise
     * @throws ServiceException if the reset password process fails
     */
    boolean resetPassword(final String email, final String newPassword);

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
    List<Habbit> getUserHabits(final String jwtToken);
}
