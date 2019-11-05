package Model;

import utils.AppUtils;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name="USERS")
public class User implements HasId<Long> {
    @Id @GeneratedValue
    @Column(name="userID",nullable = false)
    private long id;
    @Column(name="username",nullable = false,unique = true)
    private String username;
    @Column(name="profile_name")
    private String profile_name;
    @Column(name="password")
    private String password;
    @Column(name="email")
    private String email;
    @Column(name="BirthDate")
    @Temporal(TemporalType.DATE)
    private Date birthDate;
    @Column(name="isVerified")
    private boolean isVerified;
    @Column(name="confirmCode")
    private String confirmCode;
    // ??? imagine profil ???
    // private ??? imagine_profil

    public User(){
    }

    public User(String username, String profile_name, String password, String email, Date birthDate) {
        this.username = username;
        this.profile_name = profile_name;
        this.password = password;
        this.email = email;
        this.birthDate = birthDate;
        this.isVerified = false;

        this.generateConfirmCode();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return username.equals(user.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username);
    }

    @Override
    public Long getId() {
        return id;
    }
    @Override
    public void setId(Long id) {
        this.id = id;
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

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
    }

    public String getConfirmCode() {
        return confirmCode;
    }

    public void generateConfirmCode() {
        this.confirmCode = AppUtils.generateCode();
    }
}
