package Model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "USER_GOAL")
public class User_Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long Id;

    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumn(name = "goal_id")
    private Goal goal;

    @Column(name = "currentProgress")
    private int currentProgress;

    @Column(name = "isPublic")
    private boolean isPublic;

    @Column(name = "StartDate")
    private LocalDate startDate;

    @Column(name = "EndDate")
    private LocalDate endDate;

    @Column(name = "upvotes")
    private int upvotes;

    @Column(name = "downvotes")
    private int downvotes;

    public User_Goal(){};

    public User_Goal(User user, Goal goal, int currentProgress, boolean isPublic, LocalDate startDate, LocalDate endDate) {
        this.user = user;
        this.goal = goal;
        this.currentProgress = currentProgress;
        this.isPublic = isPublic;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public User_Goal(int currentProgress, boolean isPublic, LocalDate startDate, LocalDate endDate) {
        this.currentProgress = currentProgress;
        this.isPublic = isPublic;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Goal getGoal() {
        return goal;
    }

    public void setGoal(Goal goal) {
        this.goal = goal;
    }

    public int getCurrentProgress() {
        return currentProgress;
    }

    public void setCurrentProgress(int currentProgress) {
        this.currentProgress = currentProgress;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public int getUpvotes() {
        return upvotes;
    }

    public void setUpvotes(int upvotes) {
        this.upvotes = upvotes;
    }

    public int getDownvotes() {
        return downvotes;
    }

    public void setDownvotes(int downvotes) {
        this.downvotes = downvotes;
    }
}
