package ServerUI.Requests.friends;


public class AcceptFriendRequest {
    private String usernameSender;

    public AcceptFriendRequest() {

    }

    public AcceptFriendRequest(String token, String usernameSender) {
        this.usernameSender = usernameSender;
    }
    public AcceptFriendRequest(String usernameSender) {
        this.usernameSender = usernameSender;
    }

    public String getUsernameSender() {
        return usernameSender;
    }
}
