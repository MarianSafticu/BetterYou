package Repository;

import Model.UserGoal;
import org.hibernate.SessionFactory;


public class UserGoalRepo extends AbstractRepo<Long, UserGoal> {
    public UserGoalRepo(SessionFactory sf) {
        super(UserGoal.class, sf);
    }
}
