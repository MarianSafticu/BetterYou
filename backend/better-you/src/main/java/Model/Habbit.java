package Model;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "HABBITS")
public class Habbit implements HasId<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "habbitID")
    private long id;
    @Column(name="title")
    private String title;
    @Column(name="description")
    private String description;
    @Column(name="StartDate")
    @Temporal(TemporalType.DATE)
    private Date startDate;
    @Column(name="RepetitionType")
    private Repetition repetitionType;
    @Column(name="category")
    private Category category;
    @Column(name="dates")
    @Temporal(TemporalType.DATE)
    private Date[] dates;

    public Habbit() {
    }

    public Habbit(String title, String description, Date startDate, Repetition repetitionType, Category category, Date[] dates) {
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

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
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

    public Date[] getDates() {
        return dates;
    }

    public void setDates(Date[] dates) {
        this.dates = dates;
    }
}
