package ServerUI.Responses;

import Model.GoalChallenge;

import java.util.List;


public class ChallengesListResponse {
    private List<GoalChallenge> goalChallenges;

    public ChallengesListResponse() {
    }

    public ChallengesListResponse(List<GoalChallenge> goalChallenges) {
        this.goalChallenges = goalChallenges;
    }

    public List<GoalChallenge> getGoalChallenges() {
        return goalChallenges;
    }

    public void setGoalChallenges(List<GoalChallenge> goalChallenges) {
        this.goalChallenges = goalChallenges;
    }
}
