package Repository;

import Model.Category;
import Model.Goal;
import Model.User;
import Model.UserGoal;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.resource.transaction.spi.TransactionStatus;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class GoalRepo extends AbstractRepo<Long, Goal> {
    public GoalRepo() {
        super(Goal.class);
    }

    public GoalRepo(SessionFactory sf) {
        super(Goal.class, sf);
    }

    public List<Goal> getUsersGoals(User u) {
        return new ArrayList<>(u.getGoals());
    }

    public List<UserGoal> getUserGoals(User u) {
        return new ArrayList<>(u.getUserGoals());
    }

    /**
     * add a user to a goal
     * if the goal does not exist the function add the goal to the database then add the goal to user
     *
     * @param user the user
     * @param goal the goal
     * @throws RepoException in case a user does not exist in database
     */
    public long addUserToGoal(User user, Goal goal, boolean isPublic, LocalDate endDate) throws RepoException {
        Session s = sessionFactory.openSession();
        Transaction tx = s.beginTransaction();
        try {

            if (get(goal.getId()) == null) {
                s.save(goal);
            }
            UserGoal ug = new UserGoal(user, goal, 0, isPublic, LocalDate.now(), endDate);
            ug.setUpvotes(1);

            long goalId = (Long) s.save(ug);
            tx.commit();
            return goalId;
        } catch (Exception ex) {
            if (tx.getStatus() == TransactionStatus.ACTIVE
                    || tx.getStatus() == TransactionStatus.MARKED_ROLLBACK) {
                tx.rollback();
            }
            throw new RepoException("Invalid goal\n");
        } finally {
            s.close();
        }
    }

//    goal-uri completed

    /**
     * get completed goals for an user (as a list of userGoal)
     * @param u the user
     * @return a list of UserGoal
     */
     public List<UserGoal> getCompletedGoals(User u){
         Session s = sessionFactory.openSession();
         Transaction tx = s.beginTransaction();

         CriteriaBuilder cb = s.getCriteriaBuilder();
         CriteriaQuery<UserGoal> criteriaQuery = cb.createQuery(UserGoal.class);
         Root<UserGoal> root = criteriaQuery.from(UserGoal.class);
         criteriaQuery.select( root ).where(cb.equal(root.get("user"),u));
         List<UserGoal> all = s.createQuery(criteriaQuery).getResultList().stream().filter(x-> x.getCurrentProgress() == x.getGoal().getProgressToReach()).collect(Collectors.toList());

         tx.commit();
         s.close();
         return all;
     }
//    in progress
    /**
     * get goals in progress for an user (as a list of userGoal)
     * @param u the user
     * @return a list of UserGoal
     */
    public List<UserGoal> getGoalsInProgress(User u) {
        Session s = sessionFactory.openSession();
        Transaction tx = s.beginTransaction();

        CriteriaBuilder cb = s.getCriteriaBuilder();
        CriteriaQuery<UserGoal> criteriaQuery = cb.createQuery(UserGoal.class);
        Root<UserGoal> root = criteriaQuery.from(UserGoal.class);
        criteriaQuery.select(root).where(cb.equal(root.get("user"), u));
        List<UserGoal> all = s.createQuery(criteriaQuery).getResultList().stream().filter(x-> x.getCurrentProgress() < x.getGoal().getProgressToReach()).collect(Collectors.toList());

        tx.commit();
        s.close();
        return all;
    }

    /**
     * get all goals for a user that have category c
     * @param u is the user
     * @param c is the category
     * @return all goals that a user have with the category c
     */
    public List<UserGoal> getUserGoalsByCategory(User u, Category c) {
        Session s = sessionFactory.openSession();
        Transaction tx = s.beginTransaction();

        CriteriaBuilder cb = s.getCriteriaBuilder();
        CriteriaQuery<UserGoal> criteriaQuery = cb.createQuery(UserGoal.class);
        Root<UserGoal> root = criteriaQuery.from(UserGoal.class);
        criteriaQuery.select(root).where(cb.equal(root.get("user"), u));
        List<UserGoal> all = s.createQuery(criteriaQuery).getResultList().stream().filter(x-> x.getGoal().getCategory().equals(c)).collect(Collectors.toList());

        tx.commit();
        s.close();
        return all;
    }

    /**
     * get all goals that have category c
     * @param c the category
     * @return a list of goals with category c
     */
    public List<Goal> getGoalsByCategory(Category c) {
        Session s = sessionFactory.openSession();
        Transaction tx = s.beginTransaction();

        CriteriaBuilder cb = s.getCriteriaBuilder();
        CriteriaQuery<Goal> criteriaQuery = cb.createQuery(Goal.class);
        Root<Goal> root = criteriaQuery.from(Goal.class);
        criteriaQuery.select(root).where(cb.equal(root.get("category"), c));
        List<Goal> all = s.createQuery(criteriaQuery).getResultList();

        tx.commit();
        s.close();
        return all;
    }


    //    publice/private
    /**
     * get public goals for an user (as a list of userGoal)
     * @param u the user
     * @return a list of UserGoal
     */
    public List<UserGoal> getPublicGoals(User u){
        Session s = sessionFactory.openSession();
        Transaction tx = s.beginTransaction();

        CriteriaBuilder cb = s.getCriteriaBuilder();
        CriteriaQuery<UserGoal> criteriaQuery = cb.createQuery(UserGoal.class);
        Root<UserGoal> root = criteriaQuery.from(UserGoal.class);
        criteriaQuery.select( root ).where(cb.equal(root.get("user"),u));
        List<UserGoal> all = s.createQuery(criteriaQuery).getResultList().stream().filter(UserGoal::isPublic).collect(Collectors.toList());

        tx.commit();
        s.close();
        return all;
    }

    /**
     * get private goals for an user (as a list of userGoal)
     * @param u the user
     * @return a list of UserGoal
     */
    public List<UserGoal> getPrivateGoals(User u){
        Session s = sessionFactory.openSession();
        Transaction tx = s.beginTransaction();

        CriteriaBuilder cb = s.getCriteriaBuilder();
        CriteriaQuery<UserGoal> criteriaQuery = cb.createQuery(UserGoal.class);
        Root<UserGoal> root = criteriaQuery.from(UserGoal.class);
        criteriaQuery.select( root ).where(cb.equal(root.get("user"),u));
        List<UserGoal> all = s.createQuery(criteriaQuery).getResultList().stream().filter(x->!x.isPublic()).collect(Collectors.toList());

        tx.commit();
        s.close();
        return all;
    }





}
