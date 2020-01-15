package Repository;

import Model.RegistrationLink;
import org.hibernate.Session;
import org.springframework.stereotype.Component;
import utils.HibernateSesionFactory;

import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;


/**
 * Repository for {@link RegistrationLink}
 */
@Component
public class RegistrationLinkRepo extends AbstractRepo<Long, RegistrationLink> {
    private static final String CODE_FIELD = "link";

    public RegistrationLinkRepo() {
        super(RegistrationLink.class);
    }

    public RegistrationLinkRepo(Class<RegistrationLink> clazz) {
        super(clazz);
    }

    public RegistrationLink getByCode(String code) {
        try (Session session = HibernateSesionFactory.getFactory().openSession()) {
            CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
            CriteriaQuery<RegistrationLink> criteriaQuery = criteriaBuilder.createQuery(RegistrationLink.class);
            Root<RegistrationLink> root = criteriaQuery.from(RegistrationLink.class);
            criteriaQuery.select(root);
            criteriaQuery.where(criteriaBuilder.equal(root.get(CODE_FIELD), code));
            return session.createQuery(criteriaQuery).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }
}
