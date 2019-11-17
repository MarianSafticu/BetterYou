package Repository;


import java.util.HashMap;
import java.util.Map;


/**
 * In memory JWT token repository.
 */
public class JWTTokenRepo {
    private static final Map<Long, String> tokensMap = new HashMap<>();

    /**
     * Saves a token for an user
     *
     * @param userId the user's id
     * @param token  the new token to be saved
     */
    public void setUserToken(final long userId, final String token) {
        tokensMap.put(userId, token);
    }

    /**
     * Getter for an user's token
     *
     * @param userId the user's id
     * @return the token for the given user or null if it does not exist
     */
    public String getUserToken(final long userId) {
        return tokensMap.get(userId);
    }
}
