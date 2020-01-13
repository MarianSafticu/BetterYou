package ServerUI.Requests;


public class RecoverAccountProcessRequest {
    private String token;
    private String newPassword;

    public RecoverAccountProcessRequest() {
    }

    public RecoverAccountProcessRequest(String token, String newPassword) {
        this.token = token;
        this.newPassword = newPassword;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
