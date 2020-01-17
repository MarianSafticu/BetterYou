package ServerUI;

import Model.Category;
import Model.Habit;
import Model.User;
import Model.UserGoal;
import ServerUI.Requests.Authorization;
import ServerUI.Requests.Filter;
import ServerUI.Requests.FilterHabits;
import ServerUI.Requests.IdRequest;
import ServerUI.Requests.data.ChallengeAcceptanceRequest;
import ServerUI.Requests.data.ChallengeRequest;
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
import ServerUI.Responses.*;
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

import java.util.ArrayList;
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
            return new ResponseEntity<>(new UserGoalsResponse(userGoals), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/goals/random", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getRandomGoals(@RequestParam int amount) {
        try {
            return new ResponseEntity<>(new GoalsResponse(crudServices.getRandomGoals(amount)), HttpStatus.OK);
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
            return new ResponseEntity<>(new HabitsResponse(userHabits), HttpStatus.OK);
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
            long goalId = crudServices.addUserGoal(goalRequest.getGoal(), userId, goalRequest.isPublic(), goalRequest.getEndDate());
            return new ResponseEntity<>(new IdResponse(goalId), HttpStatus.OK);
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
     * @param idRequest - the id of the user goal to be deleted
     * @return true if the goal can be deleted else an error message
     */
    @RequestMapping(value = "/goal", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteGoal(@RequestHeader Authorization authorization, @RequestBody IdRequest idRequest) {
        try {
            long userId = authService.getUserIdFromJWT(authorization.getToken());
            crudServices.deleteUserGoal(idRequest.getId(), userId);
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
    public ResponseEntity<?> addHabit(@RequestHeader Authorization authorization, @RequestBody HabitRequest habitRequest) {
        try {
            LOG.info("adding habit");
            validationService.validateHabit(habitRequest.getHabit());
            long userId = authService.getUserIdFromJWT(authorization.getToken());
            long habitId = crudServices.addHabit(habitRequest.getHabit(), userId);
            return new ResponseEntity<>(new IdResponse(habitId), HttpStatus.OK);

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
     * @param idRequest- a JSON with habit id to be deleted
     * @return true if the habit can be deleted else an error message
     */
    @RequestMapping(value = "/habit", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteHabit(@RequestHeader Authorization authorization, @RequestBody IdRequest idRequest) {
        try {
            long userId = authService.getUserIdFromJWT(authorization.getToken());
            crudServices.deleteHabit(idRequest.getId(), userId);
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

    @RequestMapping(value = "/user/info", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserInfo(@RequestHeader Authorization authorization) {
        try {
            return new ResponseEntity<>(
                    new UserInfoResponse(crudServices.getUserFromId(authService.getUserIdFromJWT(authorization.getToken()))),
                    HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/users", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> searchUsers(@RequestHeader Authorization authorization,
                                         @RequestBody SearchUsersRequest searchUsersRequest) {
        try {
            return new ResponseEntity<>(new UsersSearchResponse(
                    crudServices.getUsersByUsernamePrefix(
                            searchUsersRequest.getUsernamePrefix(),
                            authService.getUserIdFromJWT(authorization.getToken()))),
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
            return new ResponseEntity<>(
                    new FriendRequestsResponse(crudServices.getFriendshipRequests(authService.getUserIdFromJWT(authorization.getToken()))),
                    HttpStatus.OK);
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

    /**
     * Returns the list of friends of the user with the given token.
     */
    @RequestMapping(value = "/friends", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getFriends(@RequestHeader Authorization authorization) {
        try {
            return new ResponseEntity<>(
                    new FriendsResponse(
                            crudServices.getUserFriends(authService.getUserIdFromJWT(authorization.getToken()))),
                    HttpStatus.OK);
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


    /**
     * This method receives a JSON with a token and a filter type and return all the goals of that user with the filter
     *
     * @param filter        - the filter
     * @param authorization - a JSON with an token
     * @return all the goals if the token si ok or the error message
     */
    @RequestMapping(value = "/filter-goal", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> filterGoals(@RequestHeader Authorization authorization, @RequestBody Filter filter) {
        try {
            List<UserGoal> userGoals = null; // = crudServices.getUsersGoals(authService.getUserIdFromJWT(authorization.getToken()));
            long userId = authService.getUserIdFromJWT(authorization.getToken());
            if (filter.getCompleted() != null) {
                if (filter.getCompleted()) {
                    userGoals = crudServices.getCompletedGoals(userId);
                } else {
                    userGoals = crudServices.getGoalsInProgress(userId);
                }
            } else if (filter.getVisibility() != null) {
                if (filter.getVisibility()) {
                    userGoals = crudServices.getPublicGoals(userId);
                } else {
                    userGoals = crudServices.getPrivateGoals(userId);
                }
            } else {
                userGoals = crudServices.getGoalsByCategory(userId, Category.valueOf(filter.getCategory()));
            }
            return new ResponseEntity<>(new UserGoalsResponse(userGoals), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * This method receives a JSON with an token and a filter and return all the habits of that user with that filter
     *
     * @param filter        - the filter
     * @param authorization - a JSON with an token
     * @return all the goals if the token si ok or the error message
     */
    @RequestMapping(value = "/filter-habits", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> filterHabits(@RequestHeader Authorization authorization, @RequestBody FilterHabits filter) {
        try {
            List<Habit> userHabits = null;
            long userId = authService.getUserIdFromJWT(authorization.getToken());
            if (filter.getCategory() != null) {
                userHabits = crudServices.getHabitsByCategory(userId, Category.valueOf(filter.getCategory()));
            } else {
                if (filter.getBestStreak()) {
                    userHabits = crudServices.getBestStreakHabits(userId);
                } else {
                    // null case
                    // if the body was empty
                    userHabits = new ArrayList<>();
                }
            }
            return new ResponseEntity<>(new HabitsResponse(userHabits), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/challenge", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> challenge(@RequestHeader Authorization authorization, @RequestBody ChallengeRequest challengeRequest) {
        try {
            crudServices.addGoalChallenge(authService.getUserIdFromJWT(authorization.getToken()),
                    challengeRequest.getReceiverUsername(),
                    challengeRequest.getGoalId());
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/challenge/accept", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> acceptChallenge(@RequestHeader Authorization authorization, @RequestBody ChallengeAcceptanceRequest challengeAcceptanceRequest) {
        try {
            crudServices.setAcceptanceForChallenge(authService.getUserIdFromJWT(
                    authorization.getToken()),
                    challengeAcceptanceRequest.getId(),
                    true,
                    challengeAcceptanceRequest.isPublic(),
                    challengeAcceptanceRequest.getEndDate());
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/challenge/reject", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> rejectChallenge(@RequestHeader Authorization authorization, @RequestBody IdRequest idRequest) {
        try {
            crudServices.setAcceptanceForChallenge(
                    authService.getUserIdFromJWT(authorization.getToken()),
                    idRequest.getId(),
                    false,
                    false,
                    null);
            return new ResponseEntity<>(new BooleanResponse(true), HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/challenges", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getChallenges(@RequestHeader Authorization authorization) {
        try {
            return new ResponseEntity<>(new ChallengesListResponse(
                    crudServices.getReceivedGoalChallenges(authService.getUserIdFromJWT(authorization.getToken()))),
                    HttpStatus.OK);
        } catch (ServiceException e) {
            return new ResponseEntity<>(new ErrorResponse(e.getMessage()), HttpStatus.OK);
        } catch (Exception e) {
            LOG.error("Unhandled exception reached REST controller: {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse("Server error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
