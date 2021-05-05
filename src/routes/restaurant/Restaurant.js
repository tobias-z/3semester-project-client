import * as React from "react";
import { useParams } from "react-router-dom";

function Restaurant(props) {
  const { restaurantDATA } = props;
  let { name } = useParams();
  return <div>{name}</div>;
}

export default Restaurant;
