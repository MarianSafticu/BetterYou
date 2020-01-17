package ServerUI.Requests.friends;


public class SearchUsersRequest {
    private String usernamePrefix;

    public SearchUsersRequest(String usernamePrefix, String token) {
        this.usernamePrefix = usernamePrefix;
    }
    public SearchUsersRequest(String usernamePrefix) {
        this.usernamePrefix = usernamePrefix;
    }

    public String getUsernamePrefix() {
        return usernamePrefix;
    }

    public void setUsernamePrefix(String usernamePrefix) {
        this.usernamePrefix = usernamePrefix;
    }
}
