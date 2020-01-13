package ServerUI.Requests.data;

import Model.Goal;

import java.time.LocalDate;


public class GoalRequest {
    private Goal goal;
    private String token;
    private boolean isPublic;
    private LocalDate endDate;


    public GoalRequest() {
    }

    public GoalRequest(Goal goal, String token, boolean isPublic, LocalDate endDate) {
        this.goal = goal;
        this.token = token;
        this.isPublic = isPublic;
        this.endDate = endDate;
    }

    public Goal getGoal() {
        return goal;
    }

    public void setGoal(Goal goal) {
        this.goal = goal;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
