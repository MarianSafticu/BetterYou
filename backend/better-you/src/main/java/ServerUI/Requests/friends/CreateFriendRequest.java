package ServerUI.Requests.friends;


public class CreateFriendRequest {
    private final String token;
    private final String usernameRequested;

    public CreateFriendRequest(String token, String usernameRequested) {
        this.token = token;
        this.usernameRequested = usernameRequested;
    }

    public String getToken() {
        return token;
    }

    public String getUsernameRequested() {
        return usernameRequested;
    }
}
