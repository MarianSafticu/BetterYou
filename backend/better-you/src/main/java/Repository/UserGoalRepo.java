package Repository;

import Model.UserGoal;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;


@Repository
public class UserGoalRepo extends AbstractRepo<Long, UserGoal> {

    public UserGoalRepo(Class<UserGoal> clazz, SessionFactory sf) {
        super(clazz, sf);
    }
}
