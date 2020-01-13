package ServerUI.Requests;


public class RecoverAccountRequestRequest {
    private String email;

    public RecoverAccountRequestRequest(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
