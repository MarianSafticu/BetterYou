package utils;

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
}
