package Model;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "GOALS")
public class Goal {
    // TODO: adaugat categorie
    @Id
    @GeneratedValue
    @Column(name = "goalID")
    private long id;
    @Column(name="title")
    private String title;
    @Column(name="description")
    private String description;
    @Column(name="currentProgress")
    private int currentProgress;
    @Column(name="progressToReach")
    private int progressToReach;
    @Column(name="StartDate")
    @Temporal(TemporalType.DATE)
    private Date startDate;
    @Temporal(TemporalType.DATE)
    @Column(name="EndDate")
    private Date endDate;
    @Column(name="isPublic")
    private boolean isPublic;

    public Goal() {
    }

    public Goal(String title, String description, int currentProgress, int progressToReach, Date startDate, Date endDate, boolean isPublic) {
        this.title = title;
        this.description = description;
        this.currentProgress = currentProgress;
        this.progressToReach = progressToReach;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isPublic = isPublic;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getCurrentProgress() {
        return currentProgress;
    }

    public void setCurrentProgress(int currentProgress) {
        this.currentProgress = currentProgress;
    }

    public int getProgressToReach() {
        return progressToReach;
    }

    public void setProgressToReach(int progressToReach) {
        this.progressToReach = progressToReach;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }
}
