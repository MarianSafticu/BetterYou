package ServerUI.Responses;

import Model.User;


public class UserInfoResponse {
    private User userInfo;

    public UserInfoResponse(User userInfo) {
        this.userInfo = userInfo;
    }

    public User getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(User userInfo) {
        this.userInfo = userInfo;
    }
}
