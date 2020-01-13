package Repository;

import Model.Goal;
import Model.User;
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
public class GoalRepo extends AbstractRepo<Long, Goal> {
    public GoalRepo() {
        super(Goal.class);
    }
    public GoalRepo(SessionFactory sf) {
        super(Goal.class,sf);
    }
    public List<Goal> getUsersGoals(User u) {
        return new ArrayList<>(u.getGoals());
    }

    /**
     * add a user to a goal
     * if the goal does not exist the function add the goal to the database then add the goal to user
     * @param user the user
     * @param goal the goal
     * @throws RepoException in case a user does not exist in database
     */
    public void addUserToGoal(User user, Goal goal, boolean isPublic, LocalDate endDate) throws RepoException {
        Session s = sessionFactory.openSession();
        Transaction tx = s.beginTransaction();
        try {

            if (get(goal.getId()) == null) {
                s.save(goal);
            }
            UserGoal ug = new UserGoal(user, goal, 0, isPublic, LocalDate.now(), endDate);
            ug.setUpvotes(1);

            s.save(ug);
            tx.commit();
        } catch (Exception ex) {
            if (tx.getStatus() == TransactionStatus.ACTIVE
                    || tx.getStatus() == TransactionStatus.MARKED_ROLLBACK) {
                tx.rollback();
            }
            throw new RepoException("Existent username\n");
        } finally {
            s.close();
        }
    }
}
