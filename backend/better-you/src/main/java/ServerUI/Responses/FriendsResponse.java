package ServerUI.Responses;

import Model.User;

import java.util.List;


public class FriendsResponse {
    private List<User> friends;

    public FriendsResponse(List<User> friends) {
        this.friends = friends;
    }

    public List<User> getFriends() {
        return friends;
    }

    public void setFriends(List<User> friends) {
        this.friends = friends;
    }
}
