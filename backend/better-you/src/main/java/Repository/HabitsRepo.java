package Repository;

import Model.Habit;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class HabitsRepo extends AbstractRepo<Long, Habit> {
    public HabitsRepo() {
        super(Habit.class);
    }
    public HabitsRepo(SessionFactory sf) {
        super(Habit.class,sf);
    }

    public List<Habit> getUsersHabits(final long userId) {
        return new ArrayList<>();
    }
}
