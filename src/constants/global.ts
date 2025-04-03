import React from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthOptions = months.map((item) => ({
  value: item,
  label: item,
}));

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
}