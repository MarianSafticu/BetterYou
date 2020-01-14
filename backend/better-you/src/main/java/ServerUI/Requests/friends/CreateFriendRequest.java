package ServerUI.Requests.friends;


public class CreateFriendRequest {
    private final String token;
    private final String usernameReceiver;

    public CreateFriendRequest(String token, String usernameReceiver) {
        this.token = token;
        this.usernameReceiver = usernameReceiver;
    }

    public String getToken() {
        return token;
    }

    public String getUsernameReceiver() {
        return usernameReceiver;
    }
}
