package ServerUI.Responses;


public class AreFriendsResponse {
    public boolean areFriends;

    public AreFriendsResponse() {
    }

    public AreFriendsResponse(boolean areFriends) {
        this.areFriends = areFriends;
    }

    public boolean isAreFriends() {
        return areFriends;
    }

    public void setAreFriends(boolean areFriends) {
        this.areFriends = areFriends;
    }
}
