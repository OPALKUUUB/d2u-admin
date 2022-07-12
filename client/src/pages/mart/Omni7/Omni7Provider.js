import React, { createContext, useEffect, useState } from "react";
import Firebase from "../../../Firebase/firebaseConfig";

export const Omni7Context = createContext();
export const Omni7Provider = ({ children }) => {
  // useSearchParams
  const [omni7Data, setOmni7Data] = useState([]);
  const [show, setShow] = useState(10);

  useEffect(() => {
    Firebase.database()
      .ref("/omni7")
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          let result = snapshot.val();
          let data = [];
          Object.keys(result).forEach((id) => {
            let item = {
              code: id,
              name: result[id]?.name,
              category: result[id]?.category,
              price: result[id]?.price,
              expire_date: result[id]?.expire_date,
              image: result[id]?.image,
              description: result[id]?.description,
            };
            data.push(item);
          });
          setOmni7Data(data);
        } else {
          setOmni7Data([]);
        }
      });
    return () => {
      Firebase.database().ref("/omni7").off();
    };

    // setPromotions(generate_promotion(show));
  }, []);
  return (
    <Omni7Context.Provider value={{ omni7Data: omni7Data, setShow: setShow }}>
      {children}
    </Omni7Context.Provider>
  );
};
