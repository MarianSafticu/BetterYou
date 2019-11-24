package Repository;

import Model.Habit;
import org.springframework.stereotype.Repository;

@Repository
public class HabitsRepo extends AbstractRepo<Long, Habit> {
    public HabitsRepo() {
        super(Habit.class);
    }
}
