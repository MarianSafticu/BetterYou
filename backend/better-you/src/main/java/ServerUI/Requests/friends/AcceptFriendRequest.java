package ServerUI.Requests.friends;


public class AcceptFriendRequest {
    private final String token;
    private final String usernameSender;

    public AcceptFriendRequest(String token, String usernameSender) {
        this.token = token;
        this.usernameSender = usernameSender;
    }

    public String getToken() {
        return token;
    }

    public String getUsernameSender() {
        return usernameSender;
    }
}
