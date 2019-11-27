package ServerUI;

import Model.Category;
import Model.Goal;
import Model.Habit;
import Model.Repetition;
import Service.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin
@RestController
@EnableWebSecurity
@ComponentScan("Service")
@RequestMapping("/app/better-you") //the address of the server
public class RestServer {

    private final ServiceImpl service;

    @Autowired
    RestServer(final ServiceImpl service) {
        this.service = service;
    }

    private static final String template = "Hello, %s!";

    /***
     * This method is just for testing if the server is online
     * @param name
     * @return "Hello, Word!"
     */
    @RequestMapping("/greeting")
    public String greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        return String.format(template, name);
    }

    /***
     * This method receives a JSON with the email and password and checks if they are ok
     * @param loginRequest- here are the email and password stored
     * @return An string with the token if the login is successful or the error message
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("Ceva");
            String token = service.login(loginRequest.getEmail(), loginRequest.getPassword());
            return new ResponseEntity<String>(token, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
    }

    /***
     * This method receives a JSON with all the information about the user and try to put them into the database
     * @param registerRequest- here are all the information about the user
     * @return An string with the token if the register is successful or the error message
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            String token = service.register(registerRequest.getUsername(), registerRequest.getProfile_name(), registerRequest.getPassword(), registerRequest.getEmail(), registerRequest.getBirthDate());
            return new ResponseEntity<String>(token, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
    }


    /***
     * This method receives a JSON with an email of an account and try to recover it
     * @param registerRequest- a JSON with an email
     * @return true if the recover is done and false if the email is invalid
     */
    @RequestMapping(value = "/recover", method = RequestMethod.POST)
    public ResponseEntity<?> recover(@RequestBody RecoverRequest registerRequest) {
        try {
            boolean ok = service.recoverPassword(registerRequest.getEmail());
            return new ResponseEntity<Boolean>(ok, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
    }

    /***
     * This method receives a JSON with an email and a new password of an account and try to update the password
     * @param registerRequest- a JSON with an email and a password
     * @return true if the reset is done and false if the email is invalid
     */
    @RequestMapping(value = "/reset", method = RequestMethod.POST)
    public ResponseEntity<?> reset(@RequestBody ResetRequest registerRequest) {
        try {
            boolean ok = service.resetPassword(registerRequest.getEmail(), registerRequest.getPassword());
            return new ResponseEntity<Boolean>(ok, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
    }

    /***
     * This method receives a JSON with an token an return all the goals of that user
     * @param getGoalRequest- a JSON with an token
     * @return all the goals if the token si ok or the error message
     */
    @RequestMapping(value = "/goals", method = RequestMethod.POST)
    public ResponseEntity<?> getGoals(@RequestBody GetGoalRequest getGoalRequest ) {
        try{
            List<Goal> all=service.getUserGoals(getGoalRequest.getToken());
            return new ResponseEntity<List<Goal>>(all, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
    }

    /***
     * This method receives a JSON with an token an return all the habits of that user
     * @param getHabitsRequest- a JSON with an token
     * @return all the goals if the token si ok or the error message
     */
    @RequestMapping(value = "/habits", method = RequestMethod.POST)
    public ResponseEntity<?> getHabits(@RequestBody GetHabitsRequest getHabitsRequest ) {
        try{
            List<Habit> all=service.getUserHabits(getHabitsRequest.getToken());
            return new ResponseEntity<List<Habit>>(all, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
    }


}
