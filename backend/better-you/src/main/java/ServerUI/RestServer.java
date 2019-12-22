package ServerUI;

import Model.Goal;
import Model.Habit;
import Model.User;
import ServerUI.Requests.*;
import ServerUI.Responses.BooleanResponse;
import ServerUI.Responses.ErrorResponse;
import ServerUI.Responses.TokenResponse;
import Service.ServiceException;
import Service.AuthService;
import Service.CRUDServices;
import Service.ValidationService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin
@RestController
@EnableWebSecurity
@ComponentScan("Service")
@RequestMapping("/app/better-you")
public class RestServer {
    private static final Logger LOG = LogManager.getLogger(RestServer.class);
    private static final String template = "Hello, %s!";

    private final AuthService authService;
    private final CRUDServices crudServices;
    private final ValidationService validationService;

    @Autowired
    public RestServer(final AuthService authService,
                      final CRUDServices crudServices,
                      final ValidationService validationService) {
        this.authService = authService;
        this.crudServices = crudServices;
        this.validationService = validationService;
    }

    /**
     * This method is just for testing if the server is online
     *
     * @param name example parameter
     * @return "Hello, Word!"
     */
    @RequestMapping("/greeting")
    public String greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        return String.format(template, name);
    }

    /**
     * This method receives a JSON with the email and password and checks if they are ok
     *
     * @param loginRequest- here are the email and password stored
     * @return An string with the token if the login is successful or the error message
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            String token = authService.login(loginRequest.getEmail(), loginRequest.getPassword());
            return new ResponseEntity<>(new TokenResponse(token), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * This method receives a JSON with all the information about the user and try to put them into the database
     *
     * @param registerRequest- here are all the information about the user
     * @return An string with the token if the register is successful or the error message
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            User newUser = new User(registerRequest.getUsername(),
                    registerRequest.getProfile_name(),
                    registerRequest.getPassword(),
                    registerRequest.getEmail(),
                    registerRequest.getBirthDate());
            validationService.validateUser(newUser);
            String token = authService.register(newUser);
            return new ResponseEntity<>(new TokenResponse(token), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * This method receives a JSON with an email of an account and try to recover it
     *
     * @param recoverRequest- a JSON with an email
     * @return true if the recover is done and false if the email is invalid
     */
    @RequestMapping(value = "/recover", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> recover(@RequestBody RecoverRequest recoverRequest) {
        try {
            authService.recoverAccount(recoverRequest.getEmail());
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * This method receives a JSON with an email and a new password of an account and try to update the password
     *
     * @param resetRequest- a JSON with an email and a password
     * @return true if the reset is done and false if the email is invalid
     */
    @RequestMapping(value = "/reset", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> reset(@RequestBody ResetRequest resetRequest) {
        try {
            authService.resetPassword(resetRequest.getToken(), resetRequest.getPassword());
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * This method receives a JSON with an token an return all the goals of that user
     *
     * @param getGoalRequest- a JSON with an token
     * @return all the goals if the token si ok or the error message
     */
    @RequestMapping(value = "/goals", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getGoals(@RequestBody GetGoalRequest getGoalRequest) {
        try {
            List<Goal> userGoals = crudServices.getUsersGoals(authService.getUserIdFromJWT(getGoalRequest.getToken()));
            return new ResponseEntity<>(userGoals, HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * This method receives a JSON with an token an return all the habits of that user
     *
     * @param getHabitsRequest- a JSON with an token
     * @return all the goals if the token si ok or the error message
     */
    @RequestMapping(value = "/habits", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getHabits(@RequestBody GetHabitsRequest getHabitsRequest) {
        try {
            List<Habit> userHabits = crudServices.getUsersHabits(authService.getUserIdFromJWT(
                    getHabitsRequest.getToken()));
            return new ResponseEntity<>(userHabits, HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * This method receives a JSON with an token and a goal and return true if the goal can be added or an error
     * message
     *
     * @param postGoalRequest- a JSON with an token and a goal
     * @return true if the goal can be added else an error message
     */
    @RequestMapping(value = "/goal", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addGoal(@RequestBody PostGoalRequest postGoalRequest) {
        try {
            validationService.validateGoal(postGoalRequest.getGoal());
            long userId = authService.getUserIdFromJWT(postGoalRequest.getToken());
            crudServices.addGoal(postGoalRequest.getGoal(), userId);
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * This method receives a JSON with an token and a goal and return true if the goal can be updated or an error
     * message
     *
     * @param putGoalRequest- a JSON with an token and a goal
     * @return true if the goal can be updated else an error message
     */
    @RequestMapping(value = "/goal", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateGoal(@RequestBody PutGoalRequest putGoalRequest) {
        try {
            validationService.validateGoal(putGoalRequest.getGoal());
            long userId = authService.getUserIdFromJWT(putGoalRequest.getToken());
            crudServices.updateGoal(putGoalRequest.getGoal(), userId);
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * This method receives a JSON with an token and a goal and return true if the goal can be deleted or an error
     * message
     *
     * @param deleteGoalRequest- a JSON with an token and a goal
     * @return true if the goal can be deleted else an error message
     */
    @RequestMapping(value = "/goal", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteGoal(@RequestBody DeleteGoalRequest deleteGoalRequest) {
        try {
            long userId = authService.getUserIdFromJWT(deleteGoalRequest.getToken());
            crudServices.deleteGoal(deleteGoalRequest.getGoal().getId(), userId);
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * This method receives a JSON with an token and a habit and return true if the habit can be added or an error
     * message
     *
     * @param habitRequest- a JSON with an token and a goal
     * @return true if the goal can be added else an error message
     */
    @RequestMapping(value = "/habit", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addGoal(@RequestBody HabitRequest habitRequest) {
        try {
            validationService.validateHabit(habitRequest.getHabit());
            long userId = authService.getUserIdFromJWT(habitRequest.getToken());
            crudServices.addHabit(habitRequest.getHabit(),userId);
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * This method receives a JSON with an token and a habit and return true if the goal can be updated or an error
     * message
     *
     * @param habitRequest- a JSON with an token and a habit
     * @return true if the habit can be updated else an error message
     */
    @RequestMapping(value = "/habit", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateHabit(@RequestBody HabitRequest habitRequest) {
        try {
            validationService.validateHabit(habitRequest.getHabit());
            long userId = authService.getUserIdFromJWT(habitRequest.getToken());
            crudServices.updateHabit(habitRequest.getHabit(), userId);
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * This method receives a JSON with an token and a habit and return true if the goal can be deleted or an error
     * message
     *
     * @param habitRequest- a JSON with an token and a habit
     * @return true if the habit can be deleted else an error message
     */
    @RequestMapping(value = "/habit", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> dalatwHabit(@RequestBody HabitRequest habitRequest) {
        try {
            long userId = authService.getUserIdFromJWT(habitRequest.getToken());
            crudServices.deleteHabit(habitRequest.getHabit(), userId);
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
