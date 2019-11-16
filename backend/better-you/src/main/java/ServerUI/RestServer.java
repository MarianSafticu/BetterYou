package ServerUI;

import Service.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/app/better-you") //the address of the server
@ComponentScan("Service")
public class RestServer {

    @Autowired
    private ServiceImpl service;

    private static final String template = "Hello, %s!";

    /***
     * This method is just for testing if the server is online
     * @param name
     * @return "Hello, Word!"
     */
    @RequestMapping("/greeting")
    public String greeting(@RequestParam(value="name", defaultValue="World") String name) {
        return String.format(template, name);
    }

    /***
     * This method receives a JSON with the email and password and checks if they are ok
     * @param loginRequest- here are the email and password stored
     * @return An string with the token if the login is successful or the error message
     */
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

    /***
     * This method receives a JSON with all the information about the user and try to put them into the database
     * @param registerRequest- here are all the information about the user
     * @return An string with the token if the register is successful or the error message
     */
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


    /***
     * This method receives a JSON with an email of an account and try to recover it
     * @param registerRequest- a JSON with an email
     * @return true if the recover is done and false if the email is invalid
     */
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

    /***
     * This method receives a JSON with an email and a new password of an account and try to update the password
     * @param registerRequest- a JSON with an email and a password
     * @return true if the reset is done and false if the email is invalid
     */
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





