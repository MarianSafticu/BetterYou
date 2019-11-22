package Model;


import javax.persistence.*;

@Entity
@Table(name = "habits")
public class Habit implements HasId<Long> {
    @Id @GeneratedValue
    @Column(name = "habitID")
    private long id;

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
