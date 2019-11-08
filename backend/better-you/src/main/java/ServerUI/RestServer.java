package ServerUI;

import Service.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/app/better-you")
@ComponentScan("Service")
public class RestServer {

    @Autowired
    private ServiceImpl service;

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
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest ) {
        try{
            String token=service.register(registerRequest.getUsername(),registerRequest.getProfile_name(),registerRequest.getPassword(),registerRequest.getEmail(),registerRequest.getBirthDate());
            return new ResponseEntity<String>(token, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/recover", method = RequestMethod.POST)
    public ResponseEntity<?> recover(@RequestBody RecoverRequest registerRequest ) {
        try{
            boolean ok=service.recoverPassword(registerRequest.getEmail());
            return new ResponseEntity<Boolean>(ok, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<Boolean>(false, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/reset", method = RequestMethod.POST)
    public ResponseEntity<?> reset(@RequestBody ResetRequest registerRequest ) {
        try{
            boolean ok=service.resetPassword(registerRequest.getEmail(),registerRequest.getPassword());
            return new ResponseEntity<Boolean>(ok, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<Boolean>(false, HttpStatus.OK);
        }
    }


}





