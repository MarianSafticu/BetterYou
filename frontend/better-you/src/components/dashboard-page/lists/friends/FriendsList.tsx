import React from "react";
import FriendCard from "./FriendCard";


const friendsList = [
    {
        name: "Friend1",
        image: "https://i.ya-webdesign.com/images/default-avatar-png-18.png"
    },
    {
        name: "Friend2",
        image: "https://i.ya-webdesign.com/images/default-avatar-png-18.png"
    },
    {
        name: "Friend3",
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
                                    name={item.name}
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