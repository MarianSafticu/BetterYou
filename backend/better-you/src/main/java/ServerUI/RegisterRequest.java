package ServerUI;

import java.time.LocalDate;
import java.util.Date;

public class RegisterRequest {

    private String username;
    private String profile_name;
    private String password;
    private String email;
    private LocalDate BirthDate;
    private String token;

    public RegisterRequest() {
    }

    public RegisterRequest(String username, String profile_name, String password, String email, LocalDate birthDate) {
        this.username = username;
        this.profile_name = profile_name;
        this.password = password;
        this.email = email;
        BirthDate = birthDate;
    }

    public RegisterRequest(String username, String profile_name, String password, String email, LocalDate birthDate, String token) {
        this.username = username;
        this.profile_name = profile_name;
        this.password = password;
        this.email = email;
        BirthDate = birthDate;
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProfile_name() {
        return profile_name;
    }

    public void setProfile_name(String profile_name) {
        this.profile_name = profile_name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getBirthDate() {
        return BirthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        BirthDate = birthDate;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
