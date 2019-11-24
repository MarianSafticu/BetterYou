package Repository;

import Model.Goal;
import org.springframework.stereotype.Repository;

@Repository
public class GoalRepo extends AbstractRepo<Long, Goal>{
    public GoalRepo(){
        super(Goal.class);
    }
}
