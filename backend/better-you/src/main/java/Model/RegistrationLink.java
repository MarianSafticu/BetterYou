package Model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "Registration_Link")
public class RegistrationLink implements HasId<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "registration_link_id")
    private long id;
    @Column(name = "user_id", nullable = false, unique = true)
    private long userId;
    @Column(name = "link", nullable = false, unique = true)
    private String link;

    /**
     * @param userId the user to whom the link was assigned
     * @param link   the assigned link
     */
    public RegistrationLink(long userId, String link) {
        this.userId = userId;
        this.link = link;
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

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
