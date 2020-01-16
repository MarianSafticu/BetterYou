package ServerUI.Responses;

import Model.User;

import java.util.List;


public class UsersSearchResponse {
    List<User> users;

    public UsersSearchResponse(List<User> users) {
        this.users = users;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
