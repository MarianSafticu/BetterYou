package Model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;


@Entity
@Table(
        name = "GoalChallenge",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"user_sender_id", "user_receiver_id", "goal_id"})}
)
public class GoalChallenge implements HasId<Long>{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "goalChallengeId")
    private long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_sender_id")
    private User form;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_receiver_id")
    private User to;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "goal_id")
    private Goal goal;

    public GoalChallenge(User form, User to, Goal goal) {
        this.form = form;
        this.to = to;
        this.goal = goal;
    }

    public User getForm() {
        return form;
    }

    public void setForm(User form) {
        this.form = form;
    }

    public User getTo() {
        return to;
    }

    public void setTo(User to) {
        this.to = to;
    }

    public Goal getGoal() {
        return goal;
    }

    public void setGoal(Goal goal) {
        this.goal = goal;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public Long getId() {
        return id;
    }
}
