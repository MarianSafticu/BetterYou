package ServerUI.Responses;

import Model.FriendRequest;

import java.util.List;


public class FriendRequestsResponse {
    private List<FriendRequest> friendRequests;

    public FriendRequestsResponse(List<FriendRequest> friendRequests) {
        this.friendRequests = friendRequests;
    }

    public List<FriendRequest> getFriendRequests() {
        return friendRequests;
    }

    public void setFriendRequests(List<FriendRequest> friendRequests) {
        this.friendRequests = friendRequests;
    }
}
