import Friend from "../Friend";

export default interface FetchFriendRequestsResponse {
    id: number;
    sender: Friend;
    receiver: Friend;
}