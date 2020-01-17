package ServerUI.Responses;

import Model.UserGoal;

import java.util.List;

public class UserGoalsResponse {
    List<UserGoal> goals;

    public UserGoalsResponse(List<UserGoal> userGoals) {
        this.goals = userGoals;
    }

    public List<UserGoal> getUserGoals() {
        return goals;
    }

    public void setUserGoals(List<UserGoal> userGoals) {
        this.goals = userGoals;
    }
}
