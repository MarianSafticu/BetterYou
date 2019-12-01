package Repository;

import Model.User;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import utils.HibernateSesionFactoryTest;

import java.time.LocalDate;

public class UserRepoTest {
    public AbstractRepo<Long, User> repo = new UserRepo(HibernateSesionFactoryTest.getFactory());

    @Before
    public void addData(){

        try {
            repo.add(new User("u1","u1","password","email", LocalDate.now()));
            repo.add(new User("u2","u1","password","email", LocalDate.now()));
        } catch (RepoException e) {
            e.printStackTrace();
        }
    }
    @After
    public void removeData() {
        try {
            for (User u : repo.getAll()) {
                repo.delete(u.getId());
            }
        } catch (RepoException e) {
            e.printStackTrace();
        }
    }

    @Test
    // abstract repo
    public void badAdd(){
        try{
            repo.add(new User("u2","u1","pass","email",LocalDate.now()));
            Assert.fail();
        } catch (RepoException e) {
        }
    }

    @Test
    // abstract repo
    // unique column error
    public void badUpdate(){
        User u = repo.getAll().get(0);
        User u1 = new User("u2",u.getProfile_name(),"pass","email",u.getBirthDate());
        try{
            repo.update(u.getId(),u1);
            for(User user : repo.getAll()){
                System.err.println("USER : " + user.getUsername());
            }
            Assert.fail();
        } catch (RepoException e) {

        }
    }
}
