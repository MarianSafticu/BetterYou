package Model;


import javax.persistence.*;

@Entity
@Table(name = "habbits")
public class Habbit implements HasId<Long> {
    @Id @GeneratedValue
    @Column(name = "habbitID")
    private long id;

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
