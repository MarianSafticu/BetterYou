package ServerUI;

import Model.Habit;
import Model.User;
import Model.UserGoal;
import ServerUI.Requests.Authorization;
import ServerUI.Requests.auth.TokenRequest;
import ServerUI.Requests.data.GoalRequest;
import ServerUI.Requests.data.HabitRequest;
import ServerUI.Requests.data.UserGoalRequest;
import ServerUI.Requests.auth.LoginRequest;
import ServerUI.Requests.auth.ResetRequest;
import ServerUI.Requests.auth.recover.RecoverAccountProcessRequest;
import ServerUI.Requests.auth.recover.RecoverAccountRequestRequest;
import ServerUI.Requests.auth.register.RegisterConfirmationRequest;
import ServerUI.Requests.auth.register.RegisterRequest;
import ServerUI.Requests.friends.AcceptFriendRequest;
import ServerUI.Requests.friends.CreateFriendRequest;
import ServerUI.Requests.friends.SearchUsersRequest;
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
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * This method receives a JSON with all the information about the user and try to put them into the database
     *
     * @param registerConfirmationRequest- here are all the information about the confirmation
     * @return An string with the token if the register is successful or the error message
     */
    @RequestMapping(value = "/confirm_register", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerConfirmation(@RequestBody RegisterConfirmationRequest registerConfirmationRequest) {
        try {
            authService.confirmRegistration(registerConfirmationRequest.getConfirmationCode());
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
    public ResponseEntity<?> reset(@RequestHeader Authorization authorization, @RequestBody ResetRequest resetRequest) {
        try {
            authService.resetPassword(authorization.getToken(), resetRequest.getPassword());
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
     * @param authorization - a JSON with an token
     * @return all the goals if the token si ok or the error message
     */
    @RequestMapping(value = "/goals", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getGoals(@RequestHeader Authorization authorization) {
        try {
            List<UserGoal> userGoals = crudServices.getUsersGoals(authService.getUserIdFromJWT(authorization.getToken()));
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
     * @param authorization - a JSON with an token
     * @return all the goals if the token si ok or the error message
     */
    @RequestMapping(value = "/habits", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getHabits(@RequestHeader Authorization authorization) {
        try {
            List<Habit> userHabits = crudServices.getUsersHabits(authService.getUserIdFromJWT(
                    authorization.getToken()));
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
     * @param goalRequest- a JSON with an token and a goal
     * @return true if the goal can be added else an error message
     */
    @RequestMapping(value = "/goal", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addGoal(@RequestHeader Authorization authorization, @RequestBody GoalRequest goalRequest) {
        try {
            validationService.validateGoal(goalRequest.getGoal());
            long userId = authService.getUserIdFromJWT(authorization.getToken());
            crudServices.addUserGoal(goalRequest.getGoal(), userId, goalRequest.isPublic(), goalRequest.getEndDate());
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
     * @param userGoalRequest- a JSON with an token and a user goal
     * @return true if the goal can be updated else an error message
     */
    @RequestMapping(value = "/goal", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateGoal(@RequestHeader Authorization authorization, @RequestBody UserGoalRequest userGoalRequest) {
        try {
            validationService.validateUserGoal(userGoalRequest.getUserGoal());
            long userId = authService.getUserIdFromJWT(authorization.getToken());
            crudServices.updateUserGoal(userGoalRequest.getUserGoal(), userId);
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * This method receives a JSON with an token and a goal and return true if the goal can be deleted or an error
     * message
     *
     * @param goalRequest- a JSON with an token and a goal
     * @return true if the goal can be deleted else an error message
     */
    @RequestMapping(value = "/goal", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteGoal(@RequestHeader Authorization authorization, @RequestBody UserGoalRequest goalRequest) {
        try {
            long userId = authService.getUserIdFromJWT(authorization.getToken());
            crudServices.deleteUserGoal(goalRequest.getUserGoal().getId(), userId);
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.FORBIDDEN);
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
    public ResponseEntity<?> addGoal(@RequestHeader Authorization authorization, @RequestBody HabitRequest habitRequest) {
        try {
            validationService.validateHabit(habitRequest.getHabit());
            long userId = authService.getUserIdFromJWT(authorization.getToken());
            crudServices.addHabit(habitRequest.getHabit(), userId);
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
    public ResponseEntity<?> updateHabit(@RequestHeader Authorization authorization, @RequestBody HabitRequest habitRequest) {
        try {
            validationService.validateHabit(habitRequest.getHabit());
            long userId = authService.getUserIdFromJWT(authorization.getToken());
            crudServices.updateHabit(habitRequest.getHabit(), userId);
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.FORBIDDEN);
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
    public ResponseEntity<?> deleteHabit(@RequestHeader Authorization authorization, @RequestBody HabitRequest habitRequest) {
        try {
            long userId = authService.getUserIdFromJWT(authorization.getToken());
            crudServices.deleteHabit(habitRequest.getHabit(), userId);
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/account/recover/request", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> requestRecoverAccount(@RequestBody RecoverAccountRequestRequest recoverAccountRequestRequest) {
        try {
            authService.recoverAccount(recoverAccountRequestRequest.getEmail());
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/account/recover/process", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> requestRecoverAccount(@RequestBody RecoverAccountProcessRequest recoverAccountProcessRequest) {
        try {
            authService.setAccountRecovered(recoverAccountProcessRequest.getToken(), recoverAccountProcessRequest.getNewPassword());
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/users", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> searchUsers(@RequestHeader Authorization authorization,
                                         @RequestBody SearchUsersRequest searchUsersRequest) {
        try {
            return new ResponseEntity<>(
                    crudServices.getUsersByUsernamePrefix(
                            searchUsersRequest.getUsernamePrefix(),
                            authService.getUserIdFromJWT(authorization.getToken())),
                    HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/friend/request", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> friendRequest(@RequestHeader Authorization authorization,
                                           @RequestBody CreateFriendRequest createFriendRequest) {
        try {
            crudServices.addFriendshipRequest(authService.getUserIdFromJWT(authorization.getToken()),
                    createFriendRequest.getUsernameReceiver());
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/friend/request/list", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> acceptFriendRequest(@RequestHeader Authorization authorization) {
        try {
            return new ResponseEntity<>(crudServices.getFriendshipRequests(authService.getUserIdFromJWT(authorization.getToken())), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/friend/request/accept", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> acceptFriendRequest(@RequestHeader Authorization authorization,
                                                 @RequestBody AcceptFriendRequest acceptFriendRequest) {
        try {
            crudServices.acceptFriendRequest(authService.getUserIdFromJWT(authorization.getToken()),
                    acceptFriendRequest.getUsernameSender());
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/friend/request/reject", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> rejectFriendRequest(@RequestHeader Authorization authorization,
                                                 @RequestBody AcceptFriendRequest acceptFriendRequest) {
        try {
            crudServices.rejectFriendRequest(authService.getUserIdFromJWT(authorization.getToken()),
                    acceptFriendRequest.getUsernameSender());
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/friend/request", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> removeFriend(@RequestHeader Authorization authorization,
                                          @RequestBody CreateFriendRequest createFriendRequest) {
        try {
            crudServices.removeFriend(authService.getUserIdFromJWT(authorization.getToken()),
                    createFriendRequest.getUsernameReceiver());
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! USE WITH CAUTION !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    @RequestMapping(value = "/hades", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> requestRecoverAccount() {
        try {
            crudServices.eraseData();
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/gaia", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> verifyAllUsers() {
        try {
            LOG.warn("Setting all users to verified!");
            for (User user : crudServices.getAllUsers()) {
                user.setVerified(true);
                crudServices.updateUser(user.getId(), user);
            }
            LOG.warn("All users set to verified successfully");
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
