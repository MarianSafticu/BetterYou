package Model;


import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;


@Entity
@Table(name = "GOALS")
public class Goal implements HasId<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "goalID")
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "progressToReach")
    private int progressToReach;

    @Column(name = "category")
    private Category category;

    @OneToMany(mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.EAGER)
    private Set<User_Goal> users;

    public Goal() {}

    public Goal(String title,
                String description,
                int progressToReach,
                Category category) {
        this.title = title;
        this.description = description;
        this.progressToReach = progressToReach;
        this.category = category;
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

    public int getProgressToReach() {
        return progressToReach;
    }

    public void setProgressToReach(int progressToReach) {
        this.progressToReach = progressToReach;
    }

    @JsonIgnore
    public Set<User> getAllUsers() {
        return users.stream().map(User_Goal::getUser).collect(Collectors.toSet());
    }

    public void setUsers(Set<User_Goal> users) {
        this.users = users;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    @Override
    public String toString() {
//        return "";
        return "<Goal id=\"" + id + "\" title=\"" + title + ">";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Goal goal = (Goal) o;
        return id == goal.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
