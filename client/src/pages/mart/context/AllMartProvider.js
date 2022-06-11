import React, { createContext, useState } from "react";

export const AllMartContext = createContext();
export const AllMartProvider = ({ children }) => {
  const [datas, setData] = useState(genData(20));

  return (
    <AllMartContext.Provider value={{ datas: datas }}>
      {children}
    </AllMartContext.Provider>
  );
};

function genData(number = 5) {
  let data = [];
  for (let i = 0; i < number; i++) {
    let obj = {
      id: i + 1,
      name: "seven",
      image:
        "https://res.cloudinary.com/d2u-service/image/upload/v1644891467/samples/food/dessert.jpg",
      description: "this shop is sale something!",
      category: "food",
      tag: "[junk,sweet,salt]",
    };
    data.push(obj);
  }
  return data;
}
