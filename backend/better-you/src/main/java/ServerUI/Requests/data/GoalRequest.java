package ServerUI.Requests.data;

import Model.Goal;

import java.time.LocalDate;


public class GoalRequest {
    private Goal goal;
    private boolean isPublic;
    private LocalDate endDate;


    public GoalRequest() {
    }

    public GoalRequest(Goal goal, boolean isPublic, LocalDate endDate) {
        this.goal = goal;
        this.isPublic = isPublic;
        this.endDate = endDate;
    }

    public Goal getGoal() {
        return goal;
    }

    public void setGoal(Goal goal) {
        this.goal = goal;
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
