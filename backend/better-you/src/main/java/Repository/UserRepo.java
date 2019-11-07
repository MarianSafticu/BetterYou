package Repository;

import Model.User;
import org.hibernate.SessionFactory;
import utils.HibernateSesionFactory;

import javax.persistence.Query;


public class UserRepo extends AbstractRepo<Long, User> {
    private SessionFactory factory;
    public UserRepo(){
        factory = HibernateSesionFactory.getFactory();
    }


}
