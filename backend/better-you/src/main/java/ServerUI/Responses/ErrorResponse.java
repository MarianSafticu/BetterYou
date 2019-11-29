package ServerUI.Responses;

public class ErrorResponse {
    private String message;

    public ErrorResponse() {
    }

    public ErrorResponse(String massage) {
        this.message = massage;
    }

    public String getMassage() {
        return message;
    }

    public void setMassage(String massage) {
        this.message = massage;
    }
}
