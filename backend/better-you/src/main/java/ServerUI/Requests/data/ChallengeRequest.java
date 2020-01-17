package ServerUI.Requests.data;

import java.util.Objects;


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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChallengeRequest that = (ChallengeRequest) o;
        return goalId == that.goalId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(goalId);
    }
}
