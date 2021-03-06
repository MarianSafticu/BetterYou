package utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import org.junit.Test;

import static org.junit.Assert.*;

public class AppUtilsTest {
    AppUtils appUtils = new AppUtils("g4g74i4ugh45gueivbetheb");

    @Test
    public void encode() {
        String password = "better-you";
        String encodedPassword = appUtils.encode(password);
        assertNotEquals(password, encodedPassword);
    }

    @Test
    public void verifyPassword() {
        String password = "better-you";
        String wrongPassword = "better";
        String encodedPassword = appUtils.encode(password);
        assertTrue(appUtils.verifyPassword(password, encodedPassword));
        assertFalse(appUtils.verifyPassword(wrongPassword, encodedPassword));
    }


    @Test
    public void createAndDecodeJWT() {

        String jwtId = "SOMEID1234";

        String jwt = appUtils.createJWT(
                jwtId // claim = jti
        );

        Claims claims = appUtils.decodeJWT(jwt);

        assertEquals(jwtId, claims.getId());
    }

    /*
        Attempt to decode a bogus JWT and expect an exception
     */
    @Test(expected = MalformedJwtException.class)
    public void decodeShouldFail() {

        String notAJwt = "This is not a JWT";

        // This will fail with expected exception listed above
        appUtils.decodeJWT(notAJwt);
    }

    /*
    Create a simple JWT, modify it, and try to decode it
    */
    @Test(expected = SignatureException.class)
    public void createAndDecodeTamperedJWT() {

        String jwtId = "SOMEID1234";

        String jwt = appUtils.createJWT(
                jwtId // claim = jti
        );

        // tamper with the JWT

        StringBuilder tamperedJwt = new StringBuilder(jwt);
        tamperedJwt.setCharAt(22, 'I');

        assertNotEquals(jwt, tamperedJwt);

        // this will fail with a SignatureException

        appUtils.decodeJWT(tamperedJwt.toString());
    }
}