package utils;

import org.junit.Test;

import static org.junit.Assert.*;

public class AppUtilsTest {

    @Test
    public void encode() {
        String password = "better-you";
        String encodedPassword = AppUtils.encode(password);
        assertNotEquals(password,encodedPassword);
    }

    @Test
    public void verifyPassword() {
        String password = "better-you";
        String wrongPassword = "better";
        String encodedPassword = AppUtils.encode(password);
        assertTrue(AppUtils.verifyPassword(password,encodedPassword));
        assertFalse(AppUtils.verifyPassword(wrongPassword,encodedPassword));
    }
}