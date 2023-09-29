import React from 'react';
import {twoPointsDistanceInter} from './Interfaces';

const DistanceBetweenTwoPoints = (
  twoPointsDistance: twoPointsDistanceInter,
): number => {
  // JavaScript program to calculate Distance Between Two Points on Earth

  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  twoPointsDistance.lon1 = (twoPointsDistance.lon1 * Math.PI) / 180;
  twoPointsDistance.lon2 = (twoPointsDistance.lon2 * Math.PI) / 180;
  twoPointsDistance.lat1 = (twoPointsDistance.lat1 * Math.PI) / 180;
  twoPointsDistance.lat2 = (twoPointsDistance.lat2 * Math.PI) / 180;

  // Haversine formula
  let dlon = twoPointsDistance.lon2 - twoPointsDistance.lon1;
  let dlat = twoPointsDistance.lat2 - twoPointsDistance.lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(twoPointsDistance.lat1) *
      Math.cos(twoPointsDistance.lat2) *
      Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers.
  let r = 6371;

  // calculate the result
  const distanceInMeter = Math.floor(c * r * 1000);
  return distanceInMeter;
};

export default DistanceBetweenTwoPoints;
