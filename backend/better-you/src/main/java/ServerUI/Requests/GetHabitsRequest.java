package ServerUI.Requests;

public class GetHabitsRequest {
    private String token;

    public GetHabitsRequest() {
    }

    public GetHabitsRequest(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
