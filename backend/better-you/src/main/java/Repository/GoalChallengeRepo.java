package Repository;

import Model.GoalChallenge;
import org.springframework.stereotype.Component;


@Component
public class GoalChallengeRepo extends AbstractRepo<Long, GoalChallenge> {
    public static final String SENDER_FIELD = "to";
    public static final String RECEIVER_FIELD = "from";

    public GoalChallengeRepo() {
        super(GoalChallenge.class);
    }

    public GoalChallengeRepo(Class<GoalChallenge> clazz) {
        super(clazz);
    }
}
