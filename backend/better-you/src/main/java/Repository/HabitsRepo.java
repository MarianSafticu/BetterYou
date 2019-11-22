package Repository;

import Model.Habit;

public class HabitsRepo extends AbstractRepo<Long, Habit> {
    public HabitsRepo() {
        super(Habit.class);
    }
}
