package Repository;

import Model.FriendRequest;
import org.springframework.stereotype.Component;


@Component
public class FriendRequestRepo extends AbstractRepo<Long, FriendRequest> {

    public FriendRequestRepo() {
        super(FriendRequest.class);
    }

    public FriendRequestRepo(Class<FriendRequest> clazz) {
        super(clazz);
    }
}
