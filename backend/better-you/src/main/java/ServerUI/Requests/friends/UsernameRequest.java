package ServerUI.Requests.friends;


public class UsernameRequest {
    private String username;

    public UsernameRequest() {
    }

    public UsernameRequest(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
