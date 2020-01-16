package Repository;

import Model.Category;
import Model.Habit;
import Model.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.resource.transaction.spi.TransactionStatus;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class HabitsRepo extends AbstractRepo<Long, Habit> {
    public HabitsRepo() {
        super(Habit.class);
    }
    public HabitsRepo(SessionFactory sessionFactory){
        super(Habit.class,sessionFactory);
    }
    public List<Habit> getUsersHabits(User u) {
        return new ArrayList<>(u.getHabits());
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
    /**
     * get habits with the best streak for a user
     * @param u the user
     * @return a list of habits with the best streak
     */
    public List<Habit> getBestStreakHabbits(User u){
        int max = u.getHabits().stream().mapToInt(Habit::getBestStreak).max().orElse(0);
        return u.getHabits().stream().filter(x-> x.getBestStreak() == max).collect(Collectors.toList());
    }

    /**
     * get habits with a specific category for a user
     * @param u the user
     * @param c the category
     * @return a list of habits with the category c for the user u
     */
    public List<Habit> getHabbitsByCategory(User u,Category c){
        Session s = sessionFactory.openSession();
        Transaction tx = s.beginTransaction();

        CriteriaBuilder cb = s.getCriteriaBuilder();
        CriteriaQuery<Habit> criteriaQuery = cb.createQuery(Habit.class);
        Root<Habit> root = criteriaQuery.from(Habit.class);
        criteriaQuery.select(root).where(cb.equal(root.get("category"), c)).where(cb.equal(root.get("user"),u));
        List<Habit> all = s.createQuery(criteriaQuery).getResultList();

        tx.commit();
        s.close();
        return all;
    }
}
