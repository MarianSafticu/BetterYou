package ServerUI.Requests.data;

import java.time.LocalDate;


public class ChallengeAcceptanceRequest {
    private long id;
    private boolean isPublic;
    private LocalDate endDate;


    public ChallengeAcceptanceRequest() {
    }

    public ChallengeAcceptanceRequest(long id, boolean isPublic, LocalDate endDate) {
        this.id = id;
        this.isPublic = isPublic;
        this.endDate = endDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
