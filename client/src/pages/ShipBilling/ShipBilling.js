import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Styles = styled.div`
  margin: 20px 20px 20px 20px;
`;

export const ShipBilling = () => {
  const [roundBoats, setRoundBoats] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const FetchRoundBoat = async () => {
    const res = await fetch("/group/round_boat").then((res) => res.json());
    const data = res.data;
    return data;
  };
  const FetchUsername = async (round_boat) => {
    const res = await fetch("/username?round_boat=" + round_boat).then((res) =>
      res.json()
    );
    const data = res.data;
    return data;
  };
  useEffect(() => {
    async function getInitial() {
      let round_boats = await FetchRoundBoat();
      setRoundBoats(round_boats);
    }
    getInitial();
  }, []);

  const handleSelect = async (select) => {
    console.log(select);
    let data = await FetchUsername(select);
    setUsernames(data);
  };
  return (
    <Styles>
      <div>
        <label>Voyage:</label>
        <select onChange={(e) => handleSelect(e.target.value)}>
          {roundBoats.length > 0 ? (
            <>
              <option>select</option>
              {roundBoats.map((item, index) => (
                <option key={index} value={item.round_boat}>
                  {item.round_boat} ({item.count})
                </option>
              ))}
            </>
          ) : (
            <option>loading...</option>
          )}
        </select>
        <>
          {/* {usernames !== undefined && usernames.length > 0 && (
            <>
              <label>username</label>
              <input list="usernameOptions" placeholder="Type to search..." />
              <datalist id="usernameOptions">
                {usernames.map((item) => (
                  <option key={item.username} value={item.username} />
                ))}
              </datalist>
            </>
          )} */}
        </>
      </div>
    </Styles>
  );
};
