package ServerUI.Requests.auth;

public class ResetRequest {
    private String password;

    public ResetRequest() {
    }

    public ResetRequest(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
