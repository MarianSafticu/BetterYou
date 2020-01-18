package Repository;

import Model.User;
import Model.UserGoal;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;
import utils.HibernateSesionFactory;

import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;


@Repository
public class UserRepo extends AbstractRepo<Long, User> {
    private static final String EMAIL_FIELD = "email";
    private static final String USERNAME_FIELD = "username";

    public UserRepo() {
        super(User.class);
    }

    public UserRepo(SessionFactory sf) {
        super(User.class, sf);
    }

    /**
     * Searches for an user with the given email
     *
     * @param email the email for the user to be searched
     * @return the user with the given id if exists, null otherwise
     */
    public User getUserByEmail(final String email) {
        try (Session session = HibernateSesionFactory.getFactory().openSession()) {
            CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
            CriteriaQuery<User> criteriaQuery = criteriaBuilder.createQuery(User.class);
            Root<User> root = criteriaQuery.from(User.class);
            criteriaQuery.select(root);
            criteriaQuery.where(criteriaBuilder.equal(root.get(EMAIL_FIELD), email));
            return session.createQuery(criteriaQuery).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    public User getUserByUsername(String username) {
        try (Session session = HibernateSesionFactory.getFactory().openSession()) {
            CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
            CriteriaQuery<User> criteriaQuery = criteriaBuilder.createQuery(User.class);
            Root<User> root = criteriaQuery.from(User.class);
            criteriaQuery.select(root);
            criteriaQuery.where(criteriaBuilder.equal(root.get(USERNAME_FIELD), username));
            return session.createQuery(criteriaQuery).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    /**
     * Checks if a given email is already used.
     *
     * @param email the email to be checked
     * @return true if the email is not used, false otherwise
     */
    public boolean emailNotUsed(final String email) {
        try (Session session = HibernateSesionFactory.getFactory().openSession()) {
            Query query = session.createSQLQuery("SELECT COUNT(*) FROM USERS WHERE email = :email_value");
            query.setParameter("email_value", email);
            BigInteger usersFound = (BigInteger) query.getSingleResult();
            return usersFound.compareTo(BigInteger.ZERO) == 0;
        }
    }

    /**
     * Checks if a given username is already used.
     *
     * @param username the username to be checked
     * @return true if the username is not used, false otherwise
     */
    public boolean usernameNotUsed(final String username) {
        try (Session session = HibernateSesionFactory.getFactory().openSession()) {
            Query query = session.
                    createSQLQuery("SELECT COUNT(*) FROM USERS WHERE username = :username_value");
            query.setParameter("username_value", username);
            BigInteger usersFound = (BigInteger) query.getSingleResult();
            return usersFound.compareTo(BigInteger.ZERO) == 0;
        }
    }

    synchronized public void setFriends(final long userId1, final long userId2) throws RepoException {
        User user1 = get(userId1);
        User user2 = get(userId2);
        user1.getFriends().add(user2);
        user2.getFriends().add(user1);
        update(userId1, user1);
        update(userId2, user2);
    }

    synchronized public void removeFriends(final long userId1, final long userId2) throws RepoException {
        User user1 = get(userId1);
        User user2 = get(userId2);
        user1.getFriends().remove(user2);
        user2.getFriends().remove(user1);
        update(userId1, user1);
        update(userId2, user2);
    }


    /**
     * updates a goal info for a user
     * if any of the parameters are null then that fields won't be updated
     *
     * @param user_id         the id of the user
     * @param goal_id         the id of the goal
     * @param currentProgress new progress for the goal
     * @param end             new end date for the goal
     * @param isPublic        visibility of the goal for the user
     * @throws RepoException if the goal does not exist in database or the user does't have the goal
     */
    public void updateUserGoal(Long user_id, Long goal_id, LocalDate end, Boolean isPublic, Integer currentProgress) throws RepoException {
        User u = get(user_id);
        List<UserGoal> uglist = u.getUserGoals().stream().filter((UserGoal x) -> x.getId().equals(goal_id)).collect(Collectors.toList());
        if (uglist.isEmpty()) {
            throw new RepoException("The user doesn't have the goal or the goal is not in the database\n");
        }
        UserGoal ug = uglist.get(0);
        if (currentProgress != null) {
            ug.setCurrentProgress(currentProgress);
        }
        if (end != null) {
            ug.setEndDate(end);
        }
        if (isPublic != null) {
            ug.setPublic(isPublic);
        }
        Session s = sessionFactory.openSession();
        Transaction tx = s.beginTransaction();
        try {
            s.update(ug);
            tx.commit();
        } finally {
            s.close();
        }
    }

    public void removeUserGoal(Long user_id, long goal_id) throws RepoException {
        User u = get(user_id);
        List<UserGoal> userGoalList = u.getUserGoals().stream().filter((UserGoal x) -> x.getId() == goal_id).collect(Collectors.toList());
        if (userGoalList.isEmpty()) {
            throw new RepoException("The goal does not exist for the user\n");
        }
        u.getUserGoals().remove(userGoalList.get(0));
        update(user_id, u);
    }

    public List<User> getByUsernamePrefix(final String usernamePrefix, final long userId) {
        return getAll()
                .stream()
                .filter(user ->
                        user.getUsername()
                                .toLowerCase()
                                .startsWith(usernamePrefix.toLowerCase())
                                && user.getId() != userId
                                && user.isVerified())
                .collect(Collectors.toList());
    }
}
