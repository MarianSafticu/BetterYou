package Service;


import Model.*;
import Repository.FriendRequestRepo;
import Repository.GoalChallengeRepo;
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
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;


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
    private final FriendRequestRepo friendRequestRepo;
    private final GoalChallengeRepo goalChallengeRepo;

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
                        final RecoverLinkRepo recoverLinkRepo,
                        final FriendRequestRepo friendRequestRepo,
                        final GoalChallengeRepo goalChallengeRepo) {
        this.userRepo = userRepo;
        this.habitsRepo = habitsRepo;
        this.goalRepo = goalRepo;
        this.registrationLinkRepo = registrationLinkRepo;
        this.recoverLinkRepo = recoverLinkRepo;
        this.friendRequestRepo = friendRequestRepo;
        this.goalChallengeRepo = goalChallengeRepo;
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

    public User getUserFromUsername(final String username) {
        LOG.info("Getting user with username {}", username);
        return userRepo.getUserByUsername(username);
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

    public List<Goal> getRandomGoals(final int numberGoals) {
        List<Goal> allGoals = goalRepo.getAll();

        Collections.shuffle(allGoals);

        List<Goal> randomGoals = new ArrayList<>();

        for (int i = 0; i < Math.min(numberGoals, allGoals.size()); i++) {
            randomGoals.add(allGoals.get(i));
        }

        return randomGoals;
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
    public long addUserGoal(final Goal goal, final long userId, boolean isPublic, LocalDate endDate) {
        LOG.info("Adding goal {} for user with id {}", goal, userId);
        User goalOwner = userRepo.get(userId);

        if (goalOwner == null) {
            LOG.info("There is no user with id {}", userId);
            throw new ServiceException("There is no user with id " + userId);
        }

        try {
            long goalId = goalRepo.addUserToGoal(goalOwner, goal, isPublic, endDate);
            LOG.info("Successfully saved goal to repo");
            return goalId;
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
            userRepo.removeUserGoal(userId, userGoalId);
            LOG.info("Successfully updated goal {}", userGoalId);
        } catch (RepoException e) {
            LOG.error("Error occurred while deleting user goal in repo: {}", e.getMessage());
            throw new ServiceException("Cannot delete", e);
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

    public long addHabit(final Habit habit, final long userId) {
        LOG.info("Adding habit {} for user with id {}", habit, userId);
        User userOwner = userRepo.get(userId);

        if (userOwner == null) {
            LOG.info("There is no user with id {}", userId);
            throw new ServiceException("User with given id does not exist");
        }

        habit.setUser(userOwner);

        try {
            long habitId = habitsRepo.addHabitToUser(habit);
            LOG.info("Successfully saved habit to repo");
            return habitId;
        } catch (RepoException e) {
            e.printStackTrace();
            LOG.error("Could not save habit to repo");
            throw new ServiceException("Error occurred while adding new habit");
        }
    }

    public void updateHabit(final Habit habit, final long userId) {
        LOG.info("Updating {} for userId={}", habit, userId);
        Habit originalHabit = habitsRepo.get(habit.getId());

        if (originalHabit == null) {
            LOG.warn("No habit found for {}", habit);
            throw new ServiceException("Habit not found with the given id");
        }

        User owner = userRepo.get(userId);

        if (owner == null) {
            LOG.warn("No user found with id={}", userId);
            throw new ServiceException("User not found");
        }

        if (originalHabit.getUser().getId() != userId) {
            LOG.warn("Habit {} does not belong to userId={}", habit, userId);
            throw new ServiceException("Habit does not belong to this user");
        }

        habit.setUser(owner);

        try {
            habitsRepo.update(habit.getId(), habit);
            LOG.info("Habit {} for userId={} updated successfully", habit, userId);
        } catch (RepoException e) {
            LOG.error("Repo exception occurred while updating habit: {}", e.getMessage());
            throw new ServiceException("Something went wrong while updating habit", e);
        }
    }

    public void deleteHabit(final long habitId, final long userId) {
        Habit originalHabit = habitsRepo.get(habitId);

        if (originalHabit == null) {
            throw new ServiceException("Habit not found with the given id");
        }

        if (originalHabit.getUser().getId() != userId) {
            throw new ServiceException("Habit does not belong to this user");
        }

        try {
            habitsRepo.delete(habitId);
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

    public List<User> getUsersByUsernamePrefix(final String usernamePrefix, final long userId) {
        LOG.info("Searching for users with prefix='{}'", usernamePrefix);
        if (userRepo.get(userId) == null) {
            LOG.warn("Provided userId is invalid!");
            throw new ServiceException("Not authenticated");
        }
        return userRepo.getByUsernamePrefix(usernamePrefix, userId);
    }

    /**
     * @param userId            the user who wants to send a friend request
     * @param requestedUsername the user to be requested
     */
    public void addFriendshipRequest(final long userId, final String requestedUsername) {
        LOG.info("Friendship requested by userId={} to username={}", userId, requestedUsername);

        User requester = getUserFromId(userId);
        if (requester == null) {
            LOG.warn("User not found with id={}", userId);
            throw new ServiceException("No user found");
        }

        User requested = getUserFromUsername(requestedUsername);
        if (requested == null) {
            LOG.warn("No user found with username='{}'", requestedUsername);
            throw new ServiceException("No user found with username='" + requestedUsername + "'");
        }

        if (requested.getId().equals(requester.getId())) {
            LOG.warn("Cannot send friend request to self");
            throw new ServiceException("Cannot send friend request to self");
        }

        if (requested.getFriends().contains(requester)) {
            LOG.warn("User {} and {} are already friends", requested.getEmail(), requester.getEmail());
            throw new ServiceException("Already friend with " + requested.getEmail());
        }

        try {
            friendRequestRepo.add(new FriendRequest(requester, requested));
            LOG.info("Friend request from {} to {} sent successfully", requester.getEmail(), requested.getEmail());
        } catch (RepoException e) {
            LOG.warn("Friend request failed: {}", e.getMessage());
            throw new ServiceException("Friend request already exists");
        }
    }

    public List<FriendRequest> getFriendshipRequests(final long userId) {
        LOG.info("Retrieving friendship requests for userId={}", userId);

        User receiver = getUserFromId(userId);
        if (receiver == null) {
            LOG.warn("User not found with id={}", userId);
            throw new ServiceException("No user found");
        }

        return friendRequestRepo.getUserReceivedFriendshipRequests(userId);
    }

    public void acceptFriendRequest(final long userId, final String requesterUsername) {
        LOG.info("userId={} wants to accept friendship requested by username={}", userId, requesterUsername);

        User receiver = getUserFromId(userId);
        if (receiver == null) {
            LOG.warn("User not found with id={}", userId);
            throw new ServiceException("No user found");
        }

        User sender = getUserFromUsername(requesterUsername);
        if (sender == null) {
            LOG.warn("No user found with username='{}'", requesterUsername);
            throw new ServiceException("No user found with username='" + requesterUsername + "'");
        }

        if (sender.getId().equals(receiver.getId())) {
            LOG.warn("Cannot send friend request to self");
            throw new ServiceException("No friend request found");
        }

        FriendRequest friendRequest = friendRequestRepo.friendRequestFromTo(sender, receiver);
        if (friendRequest == null) {
            LOG.warn("No friend request from {}", sender.getUsername());
            throw new ServiceException("No friend request from " + sender.getUsername());
        }

        try {
            LOG.info("Setting friendship between {} and {}", sender.getUsername(), receiver.getUsername());
            userRepo.setFriends(sender.getId(), receiver.getId());
            LOG.info("Deleting friend request between {} and {}", sender.getUsername(), receiver.getUsername());
            friendRequestRepo.delete(friendRequest.getId());
            LOG.info("Friendship established between {} and {}", sender.getUsername(), receiver.getUsername());
        } catch (RepoException e) {
            LOG.error("Error occurred while establish");
        }
    }

    public void rejectFriendRequest(final long userId, final String requesterUsername) {
        LOG.info("userId={} wants to reject friendship requested by username={}", userId, requesterUsername);

        User receiver = getUserFromId(userId);
        if (receiver == null) {
            LOG.warn("User not found with id={}", userId);
            throw new ServiceException("No user found");
        }

        User sender = getUserFromUsername(requesterUsername);
        if (sender == null) {
            LOG.warn("No user found with username='{}'", requesterUsername);
            throw new ServiceException("No user found with username='" + requesterUsername + "'");
        }

        if (sender.getId().equals(receiver.getId())) {
            LOG.warn("Cannot send friend request to self");
            throw new ServiceException("No friend request found");
        }

        FriendRequest friendRequest = friendRequestRepo.friendRequestFromTo(sender, receiver);
        if (friendRequest == null) {
            LOG.warn("No friend request from {}", sender.getUsername());
            throw new ServiceException("No friend request from " + sender.getUsername());
        }

        try {
            LOG.info("rejecting friendship between {} and {}", sender.getUsername(), receiver.getUsername());
            LOG.info("Deleting friend request between {} and {}", sender.getUsername(), receiver.getUsername());
            friendRequestRepo.delete(friendRequest.getId());
            LOG.info("Request deleted between {} and {}", sender.getUsername(), receiver.getUsername());
        } catch (RepoException e) {
            LOG.error("Error occurred while establish");
        }
    }

    /**
     * @param userId   the user who wants to remove a friend
     * @param username the friend to be removed
     */
    public void removeFriend(final long userId, final String username) {
        LOG.info("User with id={} wants to remove friend with username={}", userId, username);

        User user = userRepo.get(userId);
        if (user == null) {
            LOG.warn("Invalid user id");
            throw new ServiceException("Invalid user id");
        }

        User toBeRemoved = userRepo.getUserByUsername(username);
        if (toBeRemoved == null) {
            LOG.warn("No user found with username={}", username);
            throw new ServiceException("No user found with username='" + username + "'");
        }

        if (!user.getFriends().contains(toBeRemoved)) {
            LOG.warn("User {} and {} are not friends", user.getUsername(), toBeRemoved.getUsername());
            throw new ServiceException("User is not friend with " + username);
        }

        try {
            userRepo.removeFriends(user.getId(), toBeRemoved.getId());
            LOG.info("Users {} and {} removed friendship successfully", user.getUsername(), toBeRemoved.getUsername());
        } catch (RepoException e) {
            LOG.error("Unable to remove friendship between {} and {}: {}",
                    user.getUsername(), toBeRemoved.getUsername(), e.getMessage());
            throw new ServiceException("Unable to remove friendship");
        }
    }

    public List<FriendRequest> getUserSentFriendRequests(final long userId) {
        LOG.info("Retrieving sent friend requests for id={}", userId);

        if (userRepo.get(userId) == null) {
            LOG.warn("No user found with id={}", userId);
            throw new ServiceException("No user found");
        }

        return friendRequestRepo.getUserSentFriendshipRequests(userId);
    }

    public List<User> getUserFriends(final long userId) {
        LOG.info("Retrieving friends for user with id={}", userId);

        User user = userRepo.get(userId);

        if (user == null) {
            LOG.warn("No user found with id={}", userId);
            throw new ServiceException("No user found");
        }

        return new ArrayList<>(user.getFriends());
    }

    // !!!!!!!!!!!!!!!!!!!!!!!! USE WITH CAUTION !!!!!!!!!!!!!!!!!!!!!!!!!!
    public void eraseData() {
        LOG.warn("!! ERASING ALL DATA !!");

        List<User> users = userRepo.getAll();
        List<Habit> habits = habitsRepo.getAll();
        List<Goal> goals = goalRepo.getAll();
        List<RecoverLink> recoverLinks = recoverLinkRepo.getAll();
        List<RegistrationLink> registrationLinks = registrationLinkRepo.getAll();
        List<FriendRequest> friendRequests = friendRequestRepo.getAll();

        try {
            LOG.warn("Erasing friend requests");
            for (FriendRequest friendRequest : friendRequests) {
                friendRequestRepo.delete(friendRequest.getId());
            }
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
            LOG.warn("Removing all friendships :(");
            for (User user : users) {
                List<User> friends = new ArrayList<>(user.getFriends());
                LOG.warn("Erasing friends for user with id={}", user.getId());
                for (User friend : friends) {
                    try {
                        LOG.warn("Erasing friendship between {} and {}", user.getId(), friend.getId());
                        userRepo.removeFriends(user.getId(), friend.getId());
                    } catch (Exception e) {
                        LOG.error(e.getMessage());
                    }
                }
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

    public List<UserGoal> getCompletedGoals(long userId) {
        return goalRepo.getCompletedGoals(userRepo.get(userId));
    }

    public List<UserGoal> getGoalsInProgress(long userId) {
        return goalRepo.getGoalsInProgress(userRepo.get(userId));
    }

    public List<UserGoal> getGoalsByCategory(long userId, Category c) {
        return goalRepo.getUserGoalsByCategory(userRepo.get(userId), c);
    }

    public List<UserGoal> getPublicGoals(long userId) {
        return goalRepo.getPublicGoals(userRepo.get(userId));
    }

    public List<UserGoal> getPrivateGoals(long userId) {
        return goalRepo.getPrivateGoals(userRepo.get(userId));
    }

    public List<Habit> getBestStreakHabits(long userId) {
        return habitsRepo.getBestStreakHabbits(userRepo.get(userId));
    }

    public List<Habit> getHabitsByCategory(long userId, Category c) {
        return habitsRepo.getHabbitsByCategory(userRepo.get(userId), c);
    }

    public List<User> getAllUsers() {
        return userRepo.getAll();
    }

    public List<GoalChallenge> getReceivedGoalChallenges(final long userId) {
        LOG.info("Retrieving challenges received by userId={}", userId);
        User user = userRepo.get(userId);
        if (user == null) {
            LOG.warn("User not found");
            throw new ServiceException("User not found");
        }
        return new ArrayList<>(user.getGoalChallenges());
    }

    public List<GoalChallenge> getSendGoalChallengers(final long userId) {
        return null;
    }

    public void addGoalChallenge(final long userId, final String receiverUsername, final long goalId) {
        LOG.info("Adding goal challenge from userId={} to username={} for goalId={}", userId, receiverUsername, goalId);

        User sender = userRepo.get(userId);
        if (sender == null) {
            LOG.warn("No user found with id={}", userId);
            throw new ServiceException("Invalid request");
        }

        User receiver = userRepo.getUserByUsername(receiverUsername);
        if (receiver == null) {
            LOG.warn("No user found with username={}", receiverUsername);
            throw new ServiceException("User to be challenged not found");
        }

        if (sender.getId().equals(receiver.getId())) {
            LOG.warn("Cannot send challenge to yourself");
            throw new ServiceException("Cannot challenge yourslef!");
        }

        Goal goal = goalRepo.get(goalId);
        if (goal == null) {
            LOG.warn("No goal found with id={}", goalId);
            throw new ServiceException("Goal not found");
        }

        GoalChallenge goalChallenge = new GoalChallenge(sender, receiver, goal);
        try {
            goalChallengeRepo.add(goalChallenge);
            LOG.info("Goal challenge added successfully");
        } catch (RepoException e) {
            LOG.error("Error occurred while adding goal challenge: {}", e.getMessage());
            throw new ServiceException("Unable to save goal request");
        }
    }

    public void setAcceptanceForChallenge(final long userId,
                                          final long challengeId,
                                          final boolean acceptance,
                                          final boolean isPublic,
                                          final LocalDate endDate) {
        LOG.info("Setting acceptance for challengeId={} to acceptance={}", challengeId, acceptance);

        User user = userRepo.get(userId);
        if (user == null) {
            LOG.warn("No user found with id={}", userId);
            throw new ServiceException("Invalid request");
        }

        GoalChallenge goalChallenge = goalChallengeRepo.get(challengeId);
        if (goalChallenge == null) {
            LOG.warn("No goalChallenge found with id={}", challengeId);
            throw new ServiceException("No goal challenge found");
        }

        try {
            LOG.info("Removing challenge id={}", goalChallenge.getId());
            goalChallengeRepo.delete(challengeId);
            if (acceptance) {
                LOG.info("Adding challenged goalId={} to userId={}", goalChallenge.getGoal().getId(), userId);
                goalRepo.addUserToGoal(user, goalChallenge.getGoal(), isPublic, endDate);
            }
            LOG.info("Challenge acceptance set!");
        } catch (RepoException e) {
            LOG.error("Cannot accept/reject the goal challenge: {}", e.getMessage());
            throw new ServiceException("Cannot accept/reject the goal challenge", e);
        }
    }

    public List<UserGoal> getFriendGoals(long userId, String username) {
        LOG.info("Retrieving user goals for friend username={}", username);

        User requester = userRepo.get(userId);
        if (requester == null) {
            LOG.warn("Invalid token");
            throw new ServiceException("Invalid user id");
        }

        User friend = userRepo.getUserByUsername(username);
        if (friend == null) {
            LOG.warn("No user found with username={}", username);
            throw new ServiceException("No user found with username=" + username);
        }

        if (!friend.getFriends().contains(requester)) {
            LOG.warn("userId={} is not friend with username={}", userId, username);
            throw new ServiceException("Not friend with " + username);
        }

        return friend.getUserGoals().stream().filter(UserGoal::isPublic).collect(Collectors.toList());
    }

    public boolean areFriends(long userId, String username) {
        LOG.info("Retrieving user goals for friend username={}", username);

        User requester = userRepo.get(userId);
        if (requester == null) {
            LOG.warn("Invalid token");
            throw new ServiceException("Invalid user id");
        }

        User friend = userRepo.getUserByUsername(username);
        if (friend == null) {
            LOG.warn("No user found with username={}", username);
            throw new ServiceException("No user found with username=" + username);
        }

        return friend.getFriends().contains(requester);
    }
}
