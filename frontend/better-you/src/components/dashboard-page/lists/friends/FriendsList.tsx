import React from "react";
import FriendCard from "./FriendCard";
import { url } from "../../../../services/HttpService";
import { getSafeHeaders } from "../../../../services/interfaces/IHttpService";
import Friend from "../../../../models/Friend";


const friendsList = [
    {
        profile_name: "Friend1",
        image: "https://i.ya-webdesign.com/images/default-avatar-png-18.png",
        username: "user1"
    },
    {
        profile_name: "Friend2",
        image: "https://i.ya-webdesign.com/images/default-avatar-png-18.png",
        username: "user2"
    },
    {
        profile_name: "Friend3",
        image: "https://i.ya-webdesign.com/images/default-avatar-png-18.png",
        username: "user3"
    }
];

interface IState {
    friendsList: Friend[];
}

class FriendsList extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = { friendsList: [] }
    }

    // async fetchFriends(): Promise<FetchFriendsResponse[]> {
    //     return await fetch(`${url}/friends`, {
    //       method: "get",
    //       headers: getSafeHeaders(),
    //     })
    //       .then(response => response.json())
    //       .then(body => {
    //         return body;
    //       })
    //       .catch(error => {
    //         return error;
    //       });
    //   }

    async componentDidMount() {
        return await fetch(`${url}/friends`, {
            method: "get",
            headers: getSafeHeaders()
        })
            .then(response => response.json())
            .then(data => {
                console.log("DATA", Object.values(data))
                this.setState({ friendsList: Object.values(data) })
            })
    }


    render() {
        return (
            // TODO: style
            <div>
                {
                    this.state.friendsList.map(friend => {
                        return (
                            <div>
                                <FriendCard
                                    // image={item.image}
                                    name={friend.profile_name}
                                    username={friend.username}
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default FriendsList