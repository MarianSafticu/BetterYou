package utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Date;
public class AppUtils {

    /**
     * Generates a 12 digit random code based on the current time and a random value
     * @return code - type String
     */
    public static String generateCode(){
        Date date = new Date();
        return (date.getTime() % 1000000) + String.valueOf((int)(Math.random() * 1000000));
    }

    /**
     * Encode a password with BCrypt
     * @param password - type : String
     * @return the encoded version of the password - type : String
     */
    public static String encode(String password)
    {
        BCryptPasswordEncoder crypt = new BCryptPasswordEncoder();
        return crypt.encode(password);
    }

    /**
     * Verify if a password match the encoded version of the password
     * @param password - type : String
     * @param encodedPassword - type : String
     * @return true - if they match
     *          false - otherwise
     */
    public static Boolean verifyPassword(String password, String encodedPassword)
    {
        BCryptPasswordEncoder crypt = new BCryptPasswordEncoder();
        return crypt.matches(password,encodedPassword);
    }
}
