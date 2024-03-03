import { useState } from "react";
import data from "./data";
import "./style.css";

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMulti, setEnableMulti] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function showSingleAnswer(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }
  function showMultipleAnswer(getCurrentId) {
    let cpyMulti = [...multiple];
    const findIndexOfCurrentId = cpyMulti.indexOf(getCurrentId);

    if (findIndexOfCurrentId === -1) {
      cpyMulti.push(getCurrentId);
    } else {
      cpyMulti.splice(findIndexOfCurrentId, 1);
    }
    setMultiple(cpyMulti);
  }
  console.log(selected, multiple);
  return (
    <div className="container">
      <button className="btn" onClick={() => setEnableMulti(!enableMulti)}>
        {enableMulti ? (
          <div>Disable Multi Selection </div>
        ) : (
          <div>Enable Multi Selection</div>
        )}
      </button>
      <div className="questions-container">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div key={dataItem.id} className="item">
              <div
                onClick={
                  enableMulti
                    ? () => showMultipleAnswer(dataItem.id)
                    : () => showSingleAnswer(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question} </h3>
                <span>+</span>
              </div>
              {selected === dataItem.id ||
              multiple.indexOf(dataItem.id) !== -1 ? (
                <div className="answer">{dataItem.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div> No data found </div>
        )}
      </div>
    </div>
  );
}
