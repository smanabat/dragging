import React from "react";
import { useState, useRef } from "react";
import styled from "styled-components";
import _ from "lodash";

const DraggableContainer = styled.div`
  position: relative;
  z-index: 10;
  background-color: aliceblue;
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
`;

const Draggable = (props) => {
  const { listItem, index } = props;
  const dragRef = useRef(null);
  const handleDragStart = (e, x) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text", index);
    dragRef.current.style.backgroundColor = "red";
  };
  const handleDragEnter = (e) => {
    console.log(e);
  };
  const handleDragOver = (e) => {
    console.log(e);
  };
  const handleDragLeave = (e) => {
    console.log(e);
  };
  const handleDrop = (e) => {
    console.log(e);
  };
  const handleDragEnd = (e) => {
    dragRef.current.style.backgroundColor = null;
    console.log(e);
  };

  return (
    <DraggableContainer
      ref={dragRef}
      draggable="true"
      onDragStart={(ev) => handleDragStart(ev)}
      onDragEnd={(ev) => handleDragEnd(ev)}
    >
      {listItem.name}
    </DraggableContainer>
  );
};

const DragDividerContainer = styled.div`
  background-color: aliceblue;
  height: 35px;
  width: 100%;
  margin-top: -10px;
  position: relative;
`;

const DragDividerLine = styled.div`
  height: 1px;
  width: 100%;
  background-color: red;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DragDivider = (props) => {
  const { index, isBefore, reorder } = props;
  const dragDividerRef = useRef(null);

  const isAfter = !isBefore;

  const handleOnDrop = (ev) => {
    ev.preventDefault();
    const oldIndex = parseInt(ev.dataTransfer.getData("text"));
    dragDividerRef.current.style.backgroundColor = null;

    if (oldIndex > index) {
      if (isAfter) {
        reorder(oldIndex, index + 1);
      } else {
        reorder(oldIndex, index);
      }
    } else if (oldIndex < index) {
      if (isAfter) {
        reorder(oldIndex, index);
      } else {
        reorder(oldIndex, index - 1);
      }
    }
  };

  const handleOnDragEnter = (e) => {
    console.log(e);
  };

  const handleOnDragOver = (ev) => {
    console.log("handleOnDragOver");
    dragDividerRef.current.style.backgroundColor = "purple";
    ev.preventDefault();
  };

  const handleOnDragLeave = (e) => {
    console.log(e);
    dragDividerRef.current.style.backgroundColor = null;
  };

  return (
    <DragDividerContainer
      ref={dragDividerRef}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      onDragEnter={handleOnDragEnter}
      onDragLeave={handleOnDragLeave}
    >
      <DragDividerLine />
    </DragDividerContainer>
  );
};

const initialList = [
  { name: "sheldon" },
  { name: "catherine" },
  { name: "paige" },
  { name: "penn" },
  { name: "pepper" },
];

export function DragConcept() {
  const [list, setList] = useState(initialList);

  const reorder = (oldIndex, newIndex) => {
    let clonedArray = _.cloneDeep(list);
    if (oldIndex >= clonedArray.length) {
      var k = newIndex - clonedArray.length + 1;
      while (k--) {
        clonedArray.push(undefined);
      }
    }
    clonedArray.splice(newIndex, 0, clonedArray.splice(oldIndex, 1)[0]);
    setList(clonedArray);
  };

  return (
    <div style={{ marginTop: "25px" }}>
      {list.map((listItem, index) => {
        return (
          <div>
            <DragDivider index={index} isBefore={true} reorder={reorder} />
            <Draggable index={index} listItem={listItem} />
            <DragDivider index={index} before={false} reorder={reorder} />
          </div>
        );
      })}
    </div>
  );
}
