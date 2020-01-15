package ServerUI.Requests.friends;


public class AcceptFriendRequest {
    private final String usernameSender;

    public AcceptFriendRequest(String token, String usernameSender) {
        this.usernameSender = usernameSender;
    }

    public String getUsernameSender() {
        return usernameSender;
    }
}
