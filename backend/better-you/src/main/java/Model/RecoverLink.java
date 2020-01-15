package Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "recover_link")
public class RecoverLink implements HasId<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "recover_link_id")
    private long id;
    @Column(name = "user_id", nullable = false, unique = true)
    private long userId;
    @Column(name = "token", nullable = false, unique = true)
    private String token;

    public RecoverLink() {
    }

    /**
     * @param userId the user to whom the token was assigned
     * @param token   the assigned token
     */
    public RecoverLink(long userId, String token) {
        this.userId = userId;
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "RecoverLink{" +
                "id=" + id +
                ", userId=" + userId +
                ", token='" + token + '\'' +
                '}';
    }
}
