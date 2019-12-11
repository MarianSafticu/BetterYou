package Repository;

import Model.User;
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


@Repository
public class UserRepo extends AbstractRepo<Long, User> {
    private static final String EMAIL_FIELD = "email";

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
}
