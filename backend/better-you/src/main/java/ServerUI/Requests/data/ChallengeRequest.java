package ServerUI.Requests.data;


public class ChallengeRequest {
    private String receiverUsername;
    private long goalId;

    public ChallengeRequest() {

    }

    public ChallengeRequest(String receiverUsername, long goalId) {
        this.receiverUsername = receiverUsername;
        this.goalId = goalId;
    }

    public String getReceiverUsername() {
        return receiverUsername;
    }

    public void setReceiverUsername(String receiverUsername) {
        this.receiverUsername = receiverUsername;
    }

    public long getGoalId() {
        return goalId;
    }

    public void setGoalId(long goalId) {
        this.goalId = goalId;
    }
}
