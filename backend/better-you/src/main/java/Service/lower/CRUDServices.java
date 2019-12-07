package Service.lower;


import Model.Goal;
import Model.Habit;
import Model.RegistrationLink;
import Model.User;
import Repository.GoalRepo;
import Repository.HabitsRepo;
import Repository.RegistrationLinkRepo;
import Repository.RepoException;
import Repository.UserRepo;
import Service.ServiceException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import java.util.List;


/**
 * Class which offers create, read, write and delete operations to repositories.
 */
public class CRUDServices {
    private static final Logger LOG = LogManager.getLogger(CRUDServices.class);

    private final UserRepo userRepo;
    private final HabitsRepo habitsRepo;
    private final GoalRepo goalRepo;
    private final RegistrationLinkRepo registrationLinkRepo;

    /**
     * @param userRepo             repository for {@link User}
     * @param habitsRepo           repository for {@link Habit}
     * @param goalRepo             repository for {@link Goal}
     * @param registrationLinkRepo repository for {@link RegistrationLink}
     */
    public CRUDServices(final UserRepo userRepo,
                        final HabitsRepo habitsRepo,
                        final GoalRepo goalRepo,
                        final RegistrationLinkRepo registrationLinkRepo) {
        this.userRepo = userRepo;
        this.habitsRepo = habitsRepo;
        this.goalRepo = goalRepo;
        this.registrationLinkRepo = registrationLinkRepo;
    }

    /**
     * Adds an user to the repository
     *
     * @param user the user to be added
     * @throws ServiceException if the repository is unable to save the user
     */
    public void addUser(final User user) {
        LOG.info("Adding user {}", user);
        try {
            userRepo.add(user);
            LOG.info("User {} was added successfully", user);
        } catch (RepoException e) {
            LOG.warn("Error occurred while adding user {} to repository: {}", user, e.getMessage());
            throw new ServiceException("Unable to save user.");
        }
    }

    /**
     * Returns the user with a given id
     *
     * @param id the user's id
     * @return the user if exists, null otherwise
     */
    public User getUserFromId(final long id) {
        LOG.info("Getting user with id {}", id);
        return userRepo.get(id);
    }

    /**
     * Returns the id of the user which has a specific email
     *
     * @param email the email used for the search
     * @return the user's id if exists
     * @throws ServiceException if there is no user with the given email
     */
    public long getUserIdFromEmail(final String email) {
        LOG.info("Getting user id for email {}", email);
        User user = userRepo.getUserByEmail(email);
        if (user == null) {
            LOG.info("No user found with email {}", email);
            throw new ServiceException("No user found with email " + email);
        }
        return user.getId();
    }

    /**
     * Searches for an user with the given email
     *
     * @param email the email for the user to be searched
     * @return the user with the given id if exists, null otherwise
     */
    public User getUserFromEmail(final String email) {
        LOG.info("Getting user with email {}", email);
        return userRepo.getUserByEmail(email);
    }

    /**
     * Updates an user
     *
     * @param id   the user's id
     * @param user the new data for the user
     * @throws ServiceException if the repository is unable to update the user
     */
    public void updateUser(final long id, final User user) {
        LOG.info("Updating user with id {}", id);
        try {
            userRepo.update(id, user);
            LOG.info("Successfully updated user with id {}", id);
        } catch (RepoException e) {
            LOG.warn("Error occurred while updating user with id {}: {}", id, e.getMessage());
            throw new ServiceException("Unable to update user.");
        }
    }

    /**
     * Saves a registration link
     *
     * @param registrationLink the registration link to be saved
     * @throws ServiceException if the repository is unable to save the registration link
     */
    public void addRegistrationLink(final RegistrationLink registrationLink) {
        LOG.info("Adding registration link {}", registrationLink);
        try {
            registrationLinkRepo.add(registrationLink);
            LOG.info("Registration link {} added successfully", registrationLink);
        } catch (RepoException e) {
            LOG.warn("Unable to add registration link {}: {}", registrationLink, e.getMessage());
            throw new ServiceException("Unable to save registration link.");
        }
    }

    /**
     * Returns an user's goals
     *
     * @param userId the user's id
     * @return a list of all of the user's goals
     */
    public List<Goal> getUsersGoals(final long userId) {
        LOG.info("Getting all goals for user with id {}", userId);
        return userRepo.get(userId).getGoals();
    }

    /**
     * Returns an user's habits
     *
     * @param userId the user's id
     * @return a list of all of the user's habits
     */
    public List<Habit> getUsersHabits(final long userId) {
        throw new NotImplementedException();
    }
}
