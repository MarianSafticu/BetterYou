package ServerUI.Requests.data;

public class GetGoalRequest {
    private String token;

    public GetGoalRequest() {
    }

    public GetGoalRequest(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
