package ServerUI.Requests;

public class FilterHabits {
    private String category;
    private Boolean bestStreak;

    public FilterHabits(String category, Boolean bestStreak) {
        this.category = category;
        this.bestStreak = bestStreak;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Boolean getBestStreak() {
        return bestStreak;
    }

    public void setBestStreak(Boolean bestStreak) {
        this.bestStreak = bestStreak;
    }
}
