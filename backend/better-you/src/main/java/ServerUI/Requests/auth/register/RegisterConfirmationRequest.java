package ServerUI.Requests.auth.register;


public class RegisterConfirmationRequest {
    private String confirmationCode;

    public RegisterConfirmationRequest() {
    }

    public RegisterConfirmationRequest(String confirmationCode) {
        this.confirmationCode = confirmationCode;
    }

    public String getConfirmationCode() {
        return confirmationCode;
    }

    public void setConfirmationCode(String confirmationCode) {
        this.confirmationCode = confirmationCode;
    }
}
