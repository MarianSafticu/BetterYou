package Repository;

import Model.Habit;
import Model.UserGoal;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.resource.transaction.spi.TransactionStatus;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Repository
public class HabitsRepo extends AbstractRepo<Long, Habit> {
    public HabitsRepo() {
        super(Habit.class);
    }
    public HabitsRepo(SessionFactory sessionFactory){
        super(Habit.class,sessionFactory);
    }
    public List<Habit> getUsersHabits(final long userId) {
        return new ArrayList<>();
    }

    public long addHabitToUser(Habit habit) throws RepoException{
        Session s = sessionFactory.openSession();
        Transaction tx = s.beginTransaction();
        try {

            if (get(habit.getId()) == null) {
                s.save(habit);
            }
            long habitId = (Long) s.save(habit);
            tx.commit();
            return habitId;
        } catch (Exception ex) {
            if (tx.getStatus() == TransactionStatus.ACTIVE
                    || tx.getStatus() == TransactionStatus.MARKED_ROLLBACK) {
                tx.rollback();
            }
            throw new RepoException("Invalid habit\n");
        } finally {
            s.close();
        }
    }

}
