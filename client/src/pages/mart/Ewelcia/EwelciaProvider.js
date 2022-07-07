import React, { createContext, useEffect, useState } from "react";
import Firebase from "../../../Firebase/firebaseConfig";

export const EwelciaContext = createContext();
export const EwelciaProvider = ({ children }) => {
  // useSearchParams
  const [ewilciaData, setEwilciaData] = useState([]);
  const [show, setShow] = useState(10);
  useEffect(() => {
    Firebase.database().ref('/ewelcia').on('value' , (snapshot)=>{
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
            setEwilciaData(data)
        }else{
            setEwilciaData([])
        }
      })
      return () => {
          Firebase.database().ref('/ewelcia').off();
      }
  }, []);

  return (
    <EwelciaContext.Provider
      value={{ ewelciaData: ewilciaData, setShow: setShow }}
    >
      {children}
    </EwelciaContext.Provider>
  );
};