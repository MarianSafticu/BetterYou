package Repository;

import Model.RecoverLink;
import org.hibernate.Session;
import org.springframework.stereotype.Component;
import utils.HibernateSesionFactory;

import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;


@Component
public class RecoverLinkRepo extends AbstractRepo<Long, RecoverLink> {
    public static final String TOKEN_FIELD = "token";

    public RecoverLinkRepo() {
        super(RecoverLink.class);
    }

    public RecoverLinkRepo(Class<RecoverLink> clazz) {
        super(clazz);
    }

    public void deleteByToken(String recoverLinkToken) throws RepoException {
        try (Session session = HibernateSesionFactory.getFactory().openSession()) {
            CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
            CriteriaQuery<RecoverLink> criteriaQuery = criteriaBuilder.createQuery(RecoverLink.class);
            Root<RecoverLink> root = criteriaQuery.from(RecoverLink.class);
            criteriaQuery.select(root);
            criteriaQuery.where(criteriaBuilder.equal(root.get(TOKEN_FIELD), recoverLinkToken));
            RecoverLink recoverLink = session.createQuery(criteriaQuery).getSingleResult();
            delete(recoverLink.getId());
        } catch (NoResultException e) {
            throw new RepoException("Unable to delete recoverLink with link " + recoverLinkToken);
        }
    }

    public RecoverLink getByToken(String link) {
        try (Session session = HibernateSesionFactory.getFactory().openSession()) {
            CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
            CriteriaQuery<RecoverLink> criteriaQuery = criteriaBuilder.createQuery(RecoverLink.class);
            Root<RecoverLink> root = criteriaQuery.from(RecoverLink.class);
            criteriaQuery.select(root);
            criteriaQuery.where(criteriaBuilder.equal(root.get(TOKEN_FIELD), link));
            return session.createQuery(criteriaQuery).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }
}
