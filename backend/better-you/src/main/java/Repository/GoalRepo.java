package Repository;

import Model.Goal;
<<<<<<< HEAD
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
=======
import org.springframework.stereotype.Repository;

@Repository
public class GoalRepo extends AbstractRepo<Long, Goal>{
    public GoalRepo(){
        super(Goal.class);
    }
>>>>>>> 8ddff828d2f84595c506d819e955577e6c2e1ca7
}
