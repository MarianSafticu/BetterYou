package ServerUI.Requests;

public class Filter {
    private String category;
    private Boolean completed;
    private Boolean visibility;

    public Filter() {

    }

    public Filter(String category, Boolean completed, Boolean visibility) {
        this.category = category;
        this.completed = completed;
        this.visibility = visibility;
    }

    public String getCategory() {
        return category;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public Boolean getVisibility() {
        return visibility;
    }

}
