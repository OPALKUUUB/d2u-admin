import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const AutoCompleteLayout = styled.div`
  position: relative;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const AutoCompleteBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  list-style: none;
  border: 0.1px solid rgba(0, 0, 0, 0.1);
  max-height: 180px;
  overflow-y: scroll;
  width: 100%;
`;

const ListItem = styled.li`
  cursor: pointer;
  padding: 10px 20px;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const AutoComplete = ({ children, state, setState, datas, filter }) => {
  const [selected, setSelected] = useState("");
  return (
    <>
      {children}
      <AutoCompleteLayout show={state !== ""}>
        <AutoCompleteBox>
          {selected !== state &&
            datas
              .filter((data) =>
                data[filter].toLowerCase().includes(state.toLowerCase())
              )
              .map((filtered) => (
                <ListItem
                  key={uuidv4()}
                  onClick={() => {
                    setState(filtered[filter]);
                    setSelected(filtered[filter]);
                  }}
                >
                  {filtered[filter]}
                </ListItem>
              ))}
        </AutoCompleteBox>
      </AutoCompleteLayout>
    </>
  );
};
