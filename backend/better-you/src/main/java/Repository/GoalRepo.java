package Repository;

import Model.Goal;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class GoalRepo extends AbstractRepo<Long, Goal> {
    public GoalRepo() {
        super(Goal.class);
    }
    public GoalRepo(SessionFactory sf) {
        super(Goal.class,sf);
    }
    public List<Goal> getUsersGoals(final long userId) {
        return new ArrayList<>();
    }
}
