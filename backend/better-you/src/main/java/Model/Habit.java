package Model;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "HABBITS")
public class Habit implements HasId<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "habbitID")
    private long id;
    @Column(name="title")
    private String title;
    @Column(name="description")
    private String description;
    @Column(name="StartDate")
    private LocalDate startDate;
    @Column(name="RepetitionType")
    private Repetition repetitionType;
    @Column(name="category")
    private Category category;
    @ElementCollection
    private List<LocalDate> dates;

    public Habit() {
    }

    public Habit(String title, String description, LocalDate startDate, Repetition repetitionType, Category category, List<LocalDate> dates) {
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.repetitionType = repetitionType;
        this.category = category;
        this.dates = dates;
    }

    @Override
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

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public Repetition getRepetitionType() {
        return repetitionType;
    }

    public void setRepetitionType(Repetition repetitionType) {
        this.repetitionType = repetitionType;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<LocalDate> getDates() {
        return dates;
    }

    public void setDates(List<LocalDate> dates) {
        this.dates = dates;
    }
}
