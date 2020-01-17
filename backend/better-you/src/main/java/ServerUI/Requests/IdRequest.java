package ServerUI.Requests;


public class IdRequest {
    private long id;

    public IdRequest() {
    }

    public IdRequest(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
