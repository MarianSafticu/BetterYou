package ServerUI.Responses;

import Model.Goal;

import java.util.List;


public class GoalsResponse {
    private List<Goal> goals;

    public GoalsResponse(List<Goal> goals) {
        this.goals = goals;
    }

    public List<Goal> getGoals() {
        return goals;
    }

    public void setGoals(List<Goal> goals) {
        this.goals = goals;
    }
}
