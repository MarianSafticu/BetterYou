package Repository;


import org.junit.Before;
import org.junit.Test;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.hamcrest.MatcherAssert.assertThat;


public class JWTTokenRepoTest {
    private static final long USER_ID_1 = 1;
    private static final long USER_ID_2 = 2;
    private static final long USER_ID_3 = 3;
    private static final long USER_ID_4 = 4;
    private static final long USER_ID_WITHOUT_TOKEN = 5;
    private static final String USER_TOKEN_1 = "243tg45gg";
    private static final String USER_TOKEN_2 = "fsh4h56hg";
    private static final String USER_TOKEN_3 = "696969696";
    private static final String USER_TOKEN_4 = "6964t5ge4";

    private JWTTokenRepo jwtTokenRepo;

    @Before
    public void beforeTest() {
        jwtTokenRepo = new JWTTokenRepo();
        jwtTokenRepo.setUserToken(USER_ID_1, USER_TOKEN_1);
        jwtTokenRepo.setUserToken(USER_ID_2, USER_TOKEN_2);
        jwtTokenRepo.setUserToken(USER_ID_3, USER_TOKEN_3);
        jwtTokenRepo.setUserToken(USER_ID_4, USER_TOKEN_4);
    }

    @Test
    public void WHEN_UserDoesNotHaveToken_THEN_NullIsReturned() {
        String actualToken = jwtTokenRepo.getUserToken(USER_ID_WITHOUT_TOKEN);
        assertThat(actualToken, is(nullValue()));
    }

    @Test
    public void WHEN_UserDoesExist_THEN_ExpectedTokenIsReturned() {
        String actualToken = jwtTokenRepo.getUserToken(USER_ID_3);
        assertThat(actualToken, equalTo(USER_TOKEN_3));
    }
}