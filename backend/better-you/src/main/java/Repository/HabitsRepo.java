package Repository;

import Model.Habit;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class HabitsRepo extends AbstractRepo<Long, Habit> {
    public HabitsRepo() {
        super(Habit.class);
    }

    public List<Habit> getUsersHabits(final long userId) {
        return new ArrayList<>();
    }
}
