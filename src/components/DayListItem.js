import React from 'react'

import "components/DayListItem.scss"

const classnames = require ('classnames');

export default function DayListItem(props) {
  
  const dayClass = classnames({
    "day-list__item" : true, 
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : !props.spots
  });

  const formatSpots = (spot) => {
    switch (spot) {
      case 0:
        return "no spots";
      case 1:
        return `${spot} spot`;
      default:
        return `${spot} spots`;
    }
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}