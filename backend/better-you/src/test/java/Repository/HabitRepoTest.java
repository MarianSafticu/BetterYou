package Repository;

import Model.Category;
import Model.Habit;
import Model.Repetition;
import org.junit.After;
import org.junit.Before;
import utils.HibernateSesionFactoryTest;

import java.time.LocalDate;
import java.util.ArrayList;

public class HabitRepoTest {
    private AbstractRepo<Long, Habit> repo = new HabitsRepo(HibernateSesionFactoryTest.getFactory());

    @Before
    public void addData(){
        try {
            repo.add(new Habit("h1","descr",LocalDate.now(), Repetition.DAILY, Category.DEVELOPMENT,new ArrayList<>()));
            repo.add(new Habit("h2","descr",LocalDate.now(), Repetition.DAILY, Category.DEVELOPMENT,new ArrayList<>()));
        } catch (RepoException e) {
            e.printStackTrace();
        }
    }
    @After
    public void removeData() {
        try {
            for (Habit h : repo.getAll()) {
                repo.delete(h.getId());
            }
        } catch (RepoException e) {
            e.printStackTrace();
        }
    }

}
