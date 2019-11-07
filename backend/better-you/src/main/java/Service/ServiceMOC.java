package Service;

import org.springframework.stereotype.Component;
import utils.AppUtils;

import java.util.Date;

@Component
public class ServiceMOC {

    public String login(String email,String password){
       return AppUtils.generateCode();
    }

    public boolean register(String username, String profile_name, String password, String email, Date BirthDate){
        return true;
    }

    public boolean revocer(String email){
        return true;
    }

}
