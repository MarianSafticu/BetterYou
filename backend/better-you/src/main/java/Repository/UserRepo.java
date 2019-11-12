package Repository;

import Model.User;

public class UserRepo extends AbstractRepo<Long, User> {
    public UserRepo(){
        super(User.class);
    }

}
