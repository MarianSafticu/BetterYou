import React from "react";
import FriendCard from "./FriendCard";


const friendsList = [
    {
        profile_name: "Friend1",
        image: "https://i.ya-webdesign.com/images/default-avatar-png-18.png"
    },
    {
        profile_name: "Friend2",
        image: "https://i.ya-webdesign.com/images/default-avatar-png-18.png"
    },
    {
        profile_name: "Friend3",
        image: "https://i.ya-webdesign.com/images/default-avatar-png-18.png"
    }
];


class FriendsList extends React.Component {
    render() {
        return (
            // TODO: style
            <div> 
                {
                    friendsList.map(function (item, index) {
                        return (
                            <div>
                                <FriendCard
                                    image={item.image}
                                    name={item.profile_name}
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