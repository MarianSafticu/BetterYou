package Repository;

import Model.Category;
import Model.Goal;
import Model.User;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import utils.HibernateSesionFactoryTest;

import java.time.LocalDate;
import java.util.List;


public class GoalRepoTest {
    private AbstractRepo<Long, Goal> repo = new GoalRepo(HibernateSesionFactoryTest.getFactory());
    private User user;
    private UserRepo userRepo = new UserRepo(HibernateSesionFactoryTest.getFactory());

    @Before
    public void addData() {
        try {
            userRepo.add(new User("username", "profile_name", "password", "test@yahoo.com", LocalDate.now()));
            user = userRepo.getUserByEmail("test@yahoo.com");
            Goal g1 = new Goal("g1", "d1", 0, 1, LocalDate.now(), LocalDate.now().plusDays(2), Category.DEVELOPMENT, true);
            g1.setUser(user);
            repo.add(g1);
            Goal g2 = new Goal("g2", "d1", 0, 1, LocalDate.now(), LocalDate.now().plusDays(2), Category.DEVELOPMENT, true);
            g2.setUser(user);
            repo.add(g2);
        } catch (RepoException e) {
            e.printStackTrace();
        }
    }

    @After
    public void removeData() {
        try {
            for (Goal g : repo.getAll()) {
                repo.delete(g.getId());
            }
            userRepo.delete(user.getId());
        } catch (RepoException e) {
            e.printStackTrace();
        }
    }

    @Test
    //abstract repo test
    public void goodAdd() {
        Goal goal = new Goal("g3", "d1", 0, 1, LocalDate.now(), LocalDate.now().plusDays(2), Category.DEVELOPMENT, true);
        goal.setUser(user);
        try {
            repo.add(goal);
            Assert.assertEquals(repo.get(goal.getId()).getTitle(), "g3");
        } catch (RepoException e) {
            Assert.fail();
            e.printStackTrace();
        }
    }

    @Test
    //abstract repo test
    public void getAll() {
        List<Goal> all = repo.getAll();
        Assert.assertEquals(2, all.size());
        Assert.assertEquals("g1", all.get(0).getTitle());
        Assert.assertEquals("g2", all.get(1).getTitle());
    }

    @Test
    //abstract repo test
    public void get() {
        Goal g = repo.getAll().get(0);
        Goal g1;
        g1 = repo.get(g.getId());
        Assert.assertEquals(g.getCategory(), g1.getCategory());
        Assert.assertEquals(g.getCurrentProgress(), g1.getCurrentProgress());
        Assert.assertEquals(g.getProgressToReach(), g1.getProgressToReach());
        Assert.assertEquals(g.getDescription(), g1.getDescription());
        Assert.assertEquals(g.getTitle(), g1.getTitle());
        Assert.assertEquals(g.isPublic(), g1.isPublic());
        Assert.assertEquals(g.getEndDate(), g1.getEndDate());
        Assert.assertEquals(g.getStartDate(), g1.getStartDate());
        Assert.assertEquals(g.getId(), g1.getId());

    }

    @Test
    //abstract repo test
    public void goodRemove() {
        Goal g = repo.getAll().get(0);
        try {
            repo.delete(g.getId());
            Assert.assertNull(repo.get(g.getId()));

        } catch (RepoException e) {
            Assert.fail();
            e.printStackTrace();
        }
    }

    @Test
    //abstract repo test
    public void badRemove() {
        try {
            repo.delete(-1l);
            Assert.fail();
        } catch (RepoException e) {

        }
    }

    @Test
    //abstract repo test
    public void goodUpdate() {
        Goal g = repo.getAll().get(0);
        Goal g1 = new Goal(g.getTitle(), "modified", g.getCurrentProgress(), g.getProgressToReach(), g.getStartDate(), g.getEndDate(), g.getCategory(), g.isPublic());
        g1.setUser(g.getUser());
        try {
            repo.update(g.getId(), g1);
            Assert.assertEquals("modified", repo.get(g.getId()).getDescription());
        } catch (RepoException e) {
            Assert.fail();
            e.printStackTrace();
        }
    }

    @Test
    //abstract repo test
    //invalid id
    public void badUpdate() {
        Goal g = repo.getAll().get(0);
        Goal g1 = new Goal(g.getTitle(), "modified", g.getCurrentProgress(), g.getProgressToReach(), g.getStartDate(), g.getEndDate(), g.getCategory(), g.isPublic());
        try {
            repo.update(-1l, g1);
            Assert.fail();
        } catch (RepoException e) {
        }
    }
}
