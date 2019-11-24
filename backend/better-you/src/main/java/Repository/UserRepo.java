package Repository;

import Model.User;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;
import utils.HibernateSesionFactory;

import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;


@Repository
public class UserRepo extends AbstractRepo<Long, User> {
    private static final String EMAIL_FIELD = "email";

    public UserRepo() {
        super(User.class);
    }

    /**
     * Searches for an user with the given email
     *
     * @param email the email for the user to be searched
     * @return the user with the given id if exists, null otherwise
     */
    public User getUserByEmail(final String email) {
        Session s = HibernateSesionFactory.getFactory().openSession();
        Transaction tx = s.beginTransaction();
        try {
            CriteriaBuilder cb = s.getCriteriaBuilder();
            CriteriaQuery<User> criteriaQuery = cb.createQuery(User.class);
            Root<User> root = criteriaQuery.from(User.class);
            criteriaQuery.select(root);
            criteriaQuery.where(cb.equal(root.get(EMAIL_FIELD), email));
            User user = s.createQuery(criteriaQuery).getSingleResult();
            tx.commit();
            return user;
        } catch (NoResultException e) {
            tx.rollback();
            return null;
        } finally {
            s.close();
        }
    }
}
