package Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import utils.AppUtils;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;


@Entity
@Table(name = "USERS")
public class User implements HasId<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "userID")
    private long id;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "profile_name")
    private String profile_name;

    @Column(name = "password")
    private String password;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "BirthDate")
    private LocalDate birthDate;

    @Column(name = "isVerified")
    private boolean isVerified;

    @Column(name = "confirmCode")
    private String confirmCode;

    @Column(name = "points")
    private long points;

    @OneToMany(mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.EAGER)
    private Set<UserGoal> goals;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Habit> habits;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<User> friends;

    public User() {
    }

    public User(String username, String profile_name, String password, String email, LocalDate birthDate) {
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

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
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

    public Set<UserGoal> getGG(){
        return goals;
    }

    @JsonIgnore
    public Set<Goal> getGoals() {
        return this.goals.stream()
                .map(UserGoal::getGoal)
                .collect(Collectors.toSet());
    }
    @JsonIgnore
    public Set<User> getFriends(){
        return this.friends;
    }

    @JsonIgnore
    public Set<Habit> getHabits() {
        return habits;
    }

    public void generateConfirmCode() {
        this.confirmCode = AppUtils.generateCode();
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", profile_name='" + profile_name + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", birthDate=" + birthDate +
                ", isVerified=" + isVerified +
                '}';
    }

    public long getPoints() {
        return points;
    }

    public void setPoints(long points) {
        this.points = points;
    }
}
