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


    /***
     * The user is verify if the name and the password are correct and the account is verified the answer is true or false
     * @param user
     * @return true/false
     */
    public boolean login(User user){
         Query query = factory.createEntityManager().createQuery("SELECT u.userID From USERS u WHERE u.email=?1 and u.password=?2 and u.isVerified=?3");
         query.setParameter(1,user.getEmail());
         query.setParameter(2,user.getPassword());
         query.setParameter(3,user.isVerified());

         int i= query.getResultList().size();

        return i==1;
    }

    /***
     * The user is inserted into the database if the emil isn't already token then the function returns true else the function return false
     * @param user
     * @return true/false
     */

    public boolean register(User user){
        Query query = factory.createEntityManager().createQuery("SELECT u.userID From USERS u WHERE u.email=?1");
        query.setParameter(1,user.getEmail());

        int i= query.getResultList().size();
        if(i==1)
            return false;
        else {
            Query queryAdd = factory.createEntityManager().createQuery("INSERT INTO USERS(userID,username,profile_name,password,email,BirthDate,isVerified,confirmCode) " +
                                                                                "VALUES(?1,?2,?3,?4,?5,?6,?7,?8)");
            queryAdd.setParameter(1,user.getId());
            queryAdd.setParameter(2,user.getUsername());
            queryAdd.setParameter(3,user.getProfile_name());
            queryAdd.setParameter(4,user.getPassword());
            queryAdd.setParameter(5,user.getEmail());
            queryAdd.setParameter(6,user.getBirthDate());
            queryAdd.setParameter(7,user.isVerified());
            queryAdd.setParameter(8,user.getConfirmCode());

            queryAdd.executeUpdate();

            return true;
        }
    }

}
