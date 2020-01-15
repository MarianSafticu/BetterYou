package ServerUI.Requests;

public class Authorization {
    private String token;

    public Authorization() {
    }

    public Authorization(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
