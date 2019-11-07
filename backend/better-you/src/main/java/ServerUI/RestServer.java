package ServerUI;

import Model.User;
import Service.ServiceMOC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/app/better-you")
@ComponentScan("Service")
public class RestServer {

    @Autowired
    private ServiceMOC service;

    private static final String template = "Hello, %s!";

    @RequestMapping("/greeting")
    public String greeting(@RequestParam(value="name", defaultValue="World") String name) {
        return String.format(template, name);
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> loggin(@RequestBody LoginRequest loginRequest){
        try{
            String token=service.login(loginRequest.getEmail(),loginRequest.getPassword());
            return new ResponseEntity<String>(token, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public boolean register(@RequestBody RegisterRequest registerRequest ) {
        try{
            boolean ok=service.register(registerRequest.getUsername(),registerRequest.getProfile_name(),registerRequest.getPassword(),registerRequest.getEmail(),registerRequest.getBirthDate());
            return ok;
        }
        catch (Exception e){
            return false;
        }
    }


}





