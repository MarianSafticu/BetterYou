package Model;


import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "GOALS")
public class Goal implements HasId<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
    private LocalDate startDate;
    @Column(name="EndDate")
    private LocalDate endDate;
    @Column(name="category")
    private Category category;
    @Column(name="isPublic")
    private boolean isPublic;

    public Goal() {
    }

    public Goal(String title, String description, int currentProgress, int progressToReach, LocalDate startDate, LocalDate endDate, Category category, boolean isPublic) {
        this.title = title;
        this.description = description;
        this.currentProgress = currentProgress;
        this.progressToReach = progressToReach;
        this.startDate = startDate;
        this.endDate = endDate;
        this.category = category;
        this.isPublic = isPublic;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }
}
