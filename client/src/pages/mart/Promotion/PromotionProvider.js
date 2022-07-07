import React, { createContext, useEffect, useState } from "react";
import Firebase from "../../../Firebase/firebaseConfig";

export const PromotionContext = createContext();
export const PromotionProvider = ({ children }) => {
  // useSearchParams
  const [promotions, setPromotions] = useState([]);
  const [show, setShow] = useState(10);

  useEffect(() => {
    Firebase.database().ref('/promotion').on('value' , (snapshot)=>{
      if(snapshot.val()){
          let result = snapshot.val();
          let data = [];
          Object.keys(result).forEach((id)=>{
            let item = {
              code:id,
              name:result[id]?.name,
              category: result[id]?.category,
              price: result[id]?.price,
              image: result[id]?.image,
              description: result[id]?.description,
            };
            data.push(item);
          })
          setPromotions(data)
      }else{
          setPromotions([])
      }
    })
    return () => {
        Firebase.database().ref('/promotion').off();
    }

    // setPromotions(generate_promotion(show));
  }, []);
  return (
    <PromotionContext.Provider
      value={{ promotions: promotions, setShow: setShow }}
    >
      {children}
    </PromotionContext.Provider>
  );
};
