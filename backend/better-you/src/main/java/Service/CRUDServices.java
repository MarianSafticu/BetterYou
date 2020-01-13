package Service;


import Model.Goal;
import Model.Habit;
import Model.RecoverLink;
import Model.RegistrationLink;
import Model.User;
import Model.UserGoal;
import Repository.GoalRepo;
import Repository.HabitsRepo;
import Repository.RecoverLinkRepo;
import Repository.RegistrationLinkRepo;
import Repository.RepoException;
import Repository.UserRepo;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


/**
 * Class which offers create, read, write and delete operations to repositories.
 */
@Component
@ComponentScan("Repository")
public class CRUDServices {
    private static final Logger LOG = LogManager.getLogger(CRUDServices.class);

    private final UserRepo userRepo;
    private final HabitsRepo habitsRepo;
    private final GoalRepo goalRepo;
    private final RegistrationLinkRepo registrationLinkRepo;
    private final RecoverLinkRepo recoverLinkRepo;

    /**
     * @param userRepo             repository for {@link User}
     * @param habitsRepo           repository for {@link Habit}
     * @param goalRepo             repository for {@link Goal}
     * @param registrationLinkRepo repository for {@link RegistrationLink}
     */
    public CRUDServices(final UserRepo userRepo,
                        final HabitsRepo habitsRepo,
                        final GoalRepo goalRepo,
                        final RegistrationLinkRepo registrationLinkRepo,
                        final RecoverLinkRepo recoverLinkRepo) {
        this.userRepo = userRepo;
        this.habitsRepo = habitsRepo;
        this.goalRepo = goalRepo;
        this.registrationLinkRepo = registrationLinkRepo;
        this.recoverLinkRepo = recoverLinkRepo;
    }

    /**
     * Adds an user to the repository
     *
     * @param user the user to be added (THE USER MUST HAVE THE PASSWORD HASHED)
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
        long userId = user.getId();
        LOG.info("Found id for email {}: {}", email, userId);
        return userId;
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

    public RegistrationLink getRegistrationLinkByCode(final String code) {
        LOG.info("Retrieving registration code with code={}", code);
        return registrationLinkRepo.getByCode(code);
    }

    public void deleteRegistrationLink(Long id) {
        LOG.info("Deleting registration link with id={}", id);
        try {
            registrationLinkRepo.delete(id);
            LOG.info("Successfully deleted registration link with id={}", id);
        } catch (RepoException e) {
            LOG.error("Error occurred while deleting registration link with id={}", id);
            throw new ServiceException("Unable to delete registration link");
        }
    }

    /**
     * Returns an user's goals
     *
     * @param userId the user's id
     * @return a list of all of the user's goals
     */
    public List<UserGoal> getUsersGoals(final long userId) {
        LOG.info("Getting all goals for user with id {}", userId);
        User user = userRepo.get(userId);
        if (user == null) {
            LOG.info("No user found with id {}", userId);
            throw new ServiceException("No user found with given id!");
        }
        return new ArrayList<>(user.getUserGoals());
    }

    /**
     * Returns an user's habits
     *
     * @param userId the user's id
     * @return a list of all of the user's habits
     */
    public List<Habit> getUsersHabits(final long userId) {
        LOG.info("Getting all habits for user with id {}", userId);
        User user = userRepo.get(userId);
        if (user == null) {
            LOG.info("No user found with id {}", userId);
            throw new ServiceException("No user found with given id!");
        }
        return new ArrayList<>(user.getHabits());
    }

    /**
     * Adds a new goal for an user
     *
     * @param goal   the new goal to be added
     * @param userId the owner's id of the goal (i.e. the user who owns the goal)
     * @throws ServiceException if any error occurs while saving the goal
     */
    public void addUserGoal(final Goal goal, final long userId, boolean isPublic, LocalDate endDate) {
        LOG.info("Adding goal {} for user with id {}", goal, userId);
        User goalOwner = userRepo.get(userId);

        if (goalOwner == null) {
            LOG.info("There is no user with id {}", userId);
            throw new ServiceException("There is no user with id " + userId);
        }

        try {
            goalRepo.addUserToGoal(goalOwner, goal, isPublic, endDate);
            LOG.info("Successfully saved goal to repo");
        } catch (RepoException e) {
            LOG.error("Error occurred while adding goal to repo: {}", e.getMessage());
            throw new ServiceException("Error occurred while adding goal to repo");
        }
    }

    /**
     * Updates a goal.
     *
     * @throws ServiceException if any error occurs while updating the goal
     */
    public void updateUserGoal(final UserGoal userGoal, final long userId) {
        LOG.info("Updating user goal for userid={}", userId);
        try {
            userRepo.updateUserGoal(userId, userGoal.getId(), userGoal.getEndDate(), userGoal.isPublic(), userGoal.getCurrentProgress());
        } catch (RepoException e) {
            LOG.error("Error occurred while updating goal in repo: {}", e.getMessage());
            throw new ServiceException("Error occurred while updating goal in repo");
        }
    }

    /**
     * Deletes a goal.
     *
     * @param userGoalId the user-goal's to be deleted id
     * @param userId     the goal owner's id
     */
    public void deleteUserGoal(final long userGoalId, final long userId) {
        LOG.info("Deleting user goal with id {}", userGoalId);
        try {
            userRepo.removeUserGoal(userGoalId, userId);
            LOG.info("Successfully updated goal {}", userGoalId);
        } catch (RepoException e) {
            LOG.error("Error occurred while deleting user goal in repo: {}", e.getMessage());
            throw new ServiceException("Error occurred while deleting goal in repo");
        }
    }

    /**
     * Verifies that the email and username are not already used by someone else.
     *
     * @param user the user to be checked
     * @throws ServiceException if the email or the username are already used by someone else
     */
    public void userDataNotUsed(final User user) {
        final String email = user.getEmail();
        final String username = user.getUsername();

        LOG.info("Verifying that email \"{}\" and username \"{}\" are not already used", email, username);

        String errors = "";

        if (!userRepo.emailNotUsed(email)) {
            LOG.info("Email \"{}\" is already used", email);
            errors += "Email \"" + email + "\" already used!\n";
        }

        if (!userRepo.usernameNotUsed(username)) {
            LOG.info("Username \"{}\" is already used", username);
            errors += "Username \"" + username + "\" already used!\n";
        }

        if (errors.length() > 0) {
            throw new ServiceException(errors);
        }
    }

    public void addHabit(final Habit habit, final long userId) {
        User userOwner = userRepo.get(userId);

        if (userOwner == null) {
            throw new ServiceException("User with given id does not exist");
        }

        habit.setUser(userOwner);

        try {
            habitsRepo.add(habit);
        } catch (RepoException e) {
            e.printStackTrace();
            throw new ServiceException("Error occurred while adding new habit");
        }
    }

    public void updateHabit(final Habit habit, final long userId) {
        Habit originalHabit = habitsRepo.get(habit.getId());

        if (originalHabit == null) {
            throw new ServiceException("Habit not found with the given id");
        }

        User owner = userRepo.get(userId);

        if (owner == null) {
            throw new ServiceException("User not found");
        }
        if (originalHabit.getUser().getId() != userId) {
            throw new ServiceException("Habit does not belong to this user");
        }

        habit.setUser(owner);

        try {
            habitsRepo.update(habit.getId(), habit);
        } catch (RepoException e) {
            LOG.error("Repo exception occurred while updating habit: {}", e.getMessage());
            throw new ServiceException("Something went wrong while updating habit", e);
        }
    }

    public void deleteHabit(final Habit habit, final long userId) {
        Habit originalHabit = habitsRepo.get(habit.getId());

        if (originalHabit == null) {
            throw new ServiceException("Habit not found with the given id");
        }

        if (originalHabit.getUser().getId() != userId) {
            throw new ServiceException("Habit does not belong to this user");
        }

        try {
            habitsRepo.delete(habit.getId());
        } catch (RepoException e) {
            LOG.error("Repo exception occurred while deleting habit: {}", e.getMessage());
            throw new ServiceException("Something went wrong while deleting habit", e);
        }
    }

    public void addRecoverLink(final RecoverLink recoverLink) {
        LOG.info("Add recover link {}", recoverLink);

        try {
            recoverLinkRepo.add(recoverLink);
        } catch (RepoException e) {
            LOG.error("Recover link add failed: {}", e.getMessage());
            throw new ServiceException("Recover link add failed", e);
        }
    }

    public void deleteRecoverLink(final String recoverLinkToken) {
        LOG.info("Delete recover link with token='{}'", recoverLinkToken);

        try {
            recoverLinkRepo.deleteByToken(recoverLinkToken);
        } catch (RepoException e) {
            LOG.error("Recover link deletion failed: {}", e.getMessage());
            throw new ServiceException("Recover link deletion failed", e);
        }
    }

    public RecoverLink getRecoverLinkByToken(final String token) {
        LOG.info("Retrieving recover link with token='{}'", token);
        return recoverLinkRepo.getByToken(token);
    }


    // !!!!!!!!!!!!!!!!!!!!!!!! USE WITH CAUTION !!!!!!!!!!!!!!!!!!!!!!!!!!
    public void eraseData() {
        LOG.warn("!! ERASING ALL DATA !!");

        List<User> users = userRepo.getAll();
        List<Habit> habits = habitsRepo.getAll();
        List<Goal> goals = goalRepo.getAll();
        List<RecoverLink> recoverLinks = recoverLinkRepo.getAll();
        List<RegistrationLink> registrationLinks = registrationLinkRepo.getAll();

        try {
            LOG.warn("Erasing habits");
            for (Habit habit : habits) {
                habitsRepo.delete(habit.getId());
            }
            LOG.warn("Erasing recovery links");
            for (RecoverLink recoverLink : recoverLinks) {
                recoverLinkRepo.delete(recoverLink.getId());
            }
            LOG.warn("Erasing registration links");
            for (RegistrationLink registrationLink : registrationLinks) {
                registrationLinkRepo.delete(registrationLink.getId());
            }
            LOG.warn("Erasing user and their user goals");
            for (User user : users) {
                List<UserGoal> userGoals = new ArrayList<>(user.getUserGoals());
                LOG.warn("Erasing user goals for user with id={}", user.getId());
                for (UserGoal userGoal : userGoals) {
                    userRepo.removeUserGoal(user.getId(), userGoal.getId());
                }
                userRepo.delete(user.getId());
            }
            LOG.warn("Erasing goals");
            for (Goal goal : goals) {
                goalRepo.delete(goal.getId());
            }
            LOG.warn("!! DATA ERASED SUCCESSFULLY !!");
        } catch (RepoException e) {
            LOG.error(e.getMessage());
            e.printStackTrace();
        }
    }
}
