package Service;

import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class ServiceMOC {

    public boolean login(String email,String password){
        return true;
    }

    public boolean register(String username, String profile_name, String password, String email, Date BirthDate){
        return true;
    }

    public boolean revocer(String email){
        return true;
    }

}
