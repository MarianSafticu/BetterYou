package Repository;

import Model.FriendRequest;
import Model.User;
import org.hibernate.Session;
import org.springframework.stereotype.Component;
import utils.HibernateSesionFactory;

import javax.persistence.NoResultException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;


@Component
public class FriendRequestRepo extends AbstractRepo<Long, FriendRequest> {
    public static final String SENDER_FIELD = "sender";
    public static final String RECEIVER_FIELD = "receiver";

    public FriendRequestRepo() {
        super(FriendRequest.class);
    }

    public FriendRequestRepo(Class<FriendRequest> clazz) {
        super(clazz);
    }

    public FriendRequest friendRequestFromTo(User sender, User receiver) {
        try (Session session = HibernateSesionFactory.getFactory().openSession()) {
            CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
            CriteriaQuery<FriendRequest> criteriaQuery = criteriaBuilder.createQuery(FriendRequest.class);
            Root<FriendRequest> root = criteriaQuery.from(FriendRequest.class);
            criteriaQuery.select(root);
            criteriaQuery.where(criteriaBuilder.and(
                    criteriaBuilder.equal(root.join(SENDER_FIELD).get("id"), sender.getId()),
                    criteriaBuilder.equal(root.join(RECEIVER_FIELD).get("id"), receiver.getId())
            ));
            return session.createQuery(criteriaQuery).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    // Returns the received friend requests for an user
    public List<FriendRequest> getUserReceivedFriendshipRequests(final long receiverUserId) {
        try (Session session = HibernateSesionFactory.getFactory().openSession()) {
            CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
            CriteriaQuery<FriendRequest> criteriaQuery = criteriaBuilder.createQuery(FriendRequest.class);
            Root<FriendRequest> root = criteriaQuery.from(FriendRequest.class);
            criteriaQuery.select(root);
            criteriaQuery.where(criteriaBuilder.and(
                    criteriaBuilder.equal(root.join(RECEIVER_FIELD).get("id"), receiverUserId)
            ));
            return session.createQuery(criteriaQuery).getResultList();
        } catch (NoResultException e) {
            return new ArrayList<>();
        }
    }

    // Returns the sent friend requests for an user
    public List<FriendRequest> getUserSentFriendshipRequests(final long sentUserId) {
        try (Session session = HibernateSesionFactory.getFactory().openSession()) {
            CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
            CriteriaQuery<FriendRequest> criteriaQuery = criteriaBuilder.createQuery(FriendRequest.class);
            Root<FriendRequest> root = criteriaQuery.from(FriendRequest.class);
            criteriaQuery.select(root);
            criteriaQuery.where(criteriaBuilder.and(
                    criteriaBuilder.equal(root.join(SENDER_FIELD).get("id"), sentUserId)
            ));
            return session.createQuery(criteriaQuery).getResultList();
        } catch (NoResultException e) {
            return new ArrayList<>();
        }
    }
}
