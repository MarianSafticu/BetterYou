package ServerUI.Requests.friends;


public class CreateFriendRequest {
    private final String usernameReceiver;

    public CreateFriendRequest(String token, String usernameReceiver) {
        this.usernameReceiver = usernameReceiver;
    }
    public CreateFriendRequest(String usernameReceiver) {
        this.usernameReceiver = usernameReceiver;
    }

    public String getUsernameReceiver() {
        return usernameReceiver;
    }
}
