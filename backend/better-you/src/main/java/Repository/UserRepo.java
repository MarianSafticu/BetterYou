package Repository;

import Model.User;

import javax.persistence.Query;


public class UserRepo extends AbstractRepo<Long, User> {
    public UserRepo(){
        super(User.class);
    }


}
