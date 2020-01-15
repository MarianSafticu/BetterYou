package ServerUI.Requests.data;

import Model.UserGoal;


public class UserGoalRequest {
    private UserGoal userGoal;

    public UserGoalRequest(UserGoal userGoal) {
        this.userGoal = userGoal;
    }

    public UserGoal getUserGoal() {
        return userGoal;
    }

    public void setUserGoal(UserGoal userGoal) {
        this.userGoal = userGoal;
    }

}
