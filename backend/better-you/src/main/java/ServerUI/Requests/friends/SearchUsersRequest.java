package ServerUI.Requests.friends;


public class SearchUsersRequest {
    private String usernamePrefix;
    private String token;

    public SearchUsersRequest(String usernamePrefix, String token) {
        this.usernamePrefix = usernamePrefix;
        this.token = token;
    }

    public String getUsernamePrefix() {
        return usernamePrefix;
    }

    public void setUsernamePrefix(String usernamePrefix) {
        this.usernamePrefix = usernamePrefix;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
