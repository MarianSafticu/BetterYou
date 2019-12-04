import React from "react";
import NewsfeedCard from "./NewsfeedCard";
import "../../../../assets/scss/dashboard-page/NewsfeedListStyle.scss";

const newsfeedList = [
  {
    image:
      "https://www.feinberg.northwestern.edu/research/images/people/jindanyu-tall.jpg",
    name: "Alice",
    action: 'added a new goal "Citeste 2 carti"'
  },
  {
    image:
      "https://www.feinberg.northwestern.edu/research/images/people/n-maull-tall1.jpg",
    name: "Bob",
    action: 'added a new goal "Citeste 5 carti"'
  },
  {
    image: "",
    name: "Pati",
    action: 'added a new goal "Citeste 2 carti"'
  },
  {
    image:
      "https://www.feinberg.northwestern.edu/research/images/people/e-pugh-tall.jpg",
    name: "Maria",
    action:
      'added a new goal "Citeste 10 carti" ala bala portocala unu doi trei patru cinci sase sapte opt. Ala bala potrocala!'
  },
  {
    image:
      "https://www.feinberg.northwestern.edu/research/images/people/e-pugh-tall.jpg",
    name: "Maria",
    action:
      'added a new goal "Citeste 10 carti" ala bala portocala unu doi trei patru cinci sase sapte opt. Ala bala potrocala!'
  },
  {
    image:
      "https://www.feinberg.northwestern.edu/research/images/people/e-pugh-tall.jpg",
    name: "Maria",
    action:
      'added a new goal "Citeste 10 carti" ala bala portocala unu doi trei patru cinci sase sapte opt. Ala bala potrocala!'
  },
  {
    image:
      "https://www.feinberg.northwestern.edu/research/images/people/e-pugh-tall.jpg",
    name: "Maria",
    action:
      'added a new goal "Citeste 10 carti" ala bala portocala unu doi trei patru cinci sase sapte opt. Ala bala potrocala!'
  },
  {
    image:
      "https://www.feinberg.northwestern.edu/research/images/people/e-pugh-tall.jpg",
    name: "Maria",
    action:
      'added a new goal "Citeste 10 carti" ala bala portocala unu doi trei patru cinci sase sapte opt. Ala bala potrocala!'
  },
  {
    image:
      "https://www.feinberg.northwestern.edu/research/images/people/e-pugh-tall.jpg",
    name: "Maria",
    action:
      'added a new goal "Citeste 10 carti" ala bala portocala unu doi trei patru cinci sase sapte opt. Ala bala potrocala!'
  },
  {
    image:
      "https://www.feinberg.northwestern.edu/research/images/people/e-pugh-tall.jpg",
    name: "Maria",
    action:
      'added a new goal "Citeste 10 carti" ala bala portocala unu doi trei patru cinci sase sapte opt. Ala bala potrocala!'
  },
  {
    image:
      "https://www.feinberg.northwestern.edu/research/images/people/e-pugh-tall.jpg",
    name: "Maria",
    action:
      'added a new goal "Citeste 10 carti" ala bala portocala unu doi trei patru cinci sase sapte opt. Ala bala potrocala!'
  },
  {
    image:
      "https://www.feinberg.northwestern.edu/research/images/people/e-pugh-tall.jpg",
    name: "Maria",
    action:
      'added a new goal "Citeste 10 carti" ala bala portocala unu doi trei patru cinci sase sapte opt. Ala bala potrocala!'
  },
];

class NewsfeedList extends React.Component {
  render() {
    return (
      <div>
        {newsfeedList.map(function(item, index) {
          return (
            <div key={index}>
              <NewsfeedCard
                image={item.image}
                name={item.name}
                action={item.action}
              />
            </div>
          );
        })}
      </div>
    );
  }

  handleClick(e: any) {}
}

export default NewsfeedList;
