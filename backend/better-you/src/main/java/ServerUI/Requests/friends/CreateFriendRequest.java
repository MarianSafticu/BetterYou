package ServerUI.Requests.friends;


public class CreateFriendRequest {
    private String usernameReceiver;

    public CreateFriendRequest() {

    }

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
