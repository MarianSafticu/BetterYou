package utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Date;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;

import io.jsonwebtoken.*;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;


@Component
public class AppUtils {
    private final String jwtSecretKey;

    /**
     * @param jwtSecretKey key used by JWT for signing
     */
    @Autowired
    public AppUtils(@Value("${auth.jwt.secret.key}")String jwtSecretKey) {
        this.jwtSecretKey = jwtSecretKey;
    }

    /**
     * Generates a 12 digit random code based on the current time and a random value
     *
     * @return code - type String
     */
    public static String generateCode() {
        Date date = new Date();
        return (date.getTime() % 1000000) + String.valueOf((int) (Math.random() * 1000000));
    }


    /**
     * Creating a JWT based on the user
     *
     * @param id - the user id/username
     * @return A string containing our JWT
     */
    public String createJWT(String id) {

        // JWT Signature Algorithm
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        // Signing our JWT with our ApiKey secret
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(jwtSecretKey);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        JwtBuilder builder = Jwts.builder().setId(id)
                .setIssuedAt(now)
                .signWith(signatureAlgorithm, signingKey);

        // expiration date
        long ttlMillis = 31556926000L; // One year in milliseconds

        long expMillis = nowMillis + ttlMillis;
        Date exp = new Date(expMillis);
        builder.setExpiration(exp);

        //Builds the JWT and serializes it to a compact, URL-safe string
        return builder.compact();
    }

    /**
     * Decoding the jwt
     * Throws an exception if the JWT is not signed as expected
     *
     * @param jwt
     * @return claims (a JSON map) based on the given JWT
     */
    public Claims decodeJWT(String jwt) {
        Claims claims = Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(jwtSecretKey))
                .parseClaimsJws(jwt).getBody();
        return claims;
    }

    /**
     * Encode a password with BCrypt
     *
     * @param password - type : String
     * @return the encoded version of the password - type : String
     */
    public String encode(String password) {
        BCryptPasswordEncoder crypt = new BCryptPasswordEncoder();
        return crypt.encode(password);
    }

    /**
     * Verify if a password match the encoded version of the password
     *
     * @param password        - type : String
     * @param encodedPassword - type : String
     * @return true - if they match
     * false - otherwise
     */
    public Boolean verifyPassword(String password, String encodedPassword) {
        BCryptPasswordEncoder crypt = new BCryptPasswordEncoder();
        return crypt.matches(password, encodedPassword);
    }
}
