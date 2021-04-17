import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { addIcon, deleteIconLight } from "../../../constants/icon";
import useLocalStorage from "../../../hooks/useLocalStorage";
import Icon from "../../Icon";
import AddCard from "./AddCard";
import { v4 as uuidv4 } from "uuid";

const ListItem = ({ item, removeItem }) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [cardsItem, setCardsItem] = useState([]);
  const [allMyCardsItems, setAllMyCardsItems] = useState([]);
  const [currentList, setCurrentList] = useState("");
  const { setItem, value } = useLocalStorage("kanbanList");

  const addItem = (item) => {
    const itemToAdd = {
      id: uuidv4(),
      content: item,
    };

    // assuming no duplicates for demo purposes
    const a = [...cardsItem, itemToAdd];
    setCardsItem(a);
    currentList.items.push(itemToAdd);
    console.log("allMyCardsItems", allMyCardsItems);
    setItem(allMyCardsItems);
  };

  useEffect(() => {
    const allLists = JSON.parse(localStorage.getItem("kanbanList"));

    const myList = allLists.find((playlist) => playlist.id === item.id);
    setAllMyCardsItems(allLists);
    setCardsItem(myList.items);
    setCurrentList(myList);
  }, [item, item.items]);

  console.log("currentList", currentList);
  return (
    <Col>
      <Row>
        <Col>
          <h2 className="mb-0">{item.name}</h2>
        </Col>
        <Col xs="auto" className="my-auto">
          <Icon
            icon={deleteIconLight}
            onClick={(e) => {
              e.preventDefault();
              removeItem(item);
            }}
            className="text-right text-link"
          />
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
          <Button variant="success" onClick={() => setOpenAdd(!openAdd)}>
            <Icon icon={addIcon} className="mr-2" />
            Add
          </Button>
        </Col>
      </Row>
      {openAdd && (
        <Row>
          <Col>
            <AddCard onAddItem={addItem} />
          </Col>
        </Row>
      )}

      <Droppable droppableId={item.id} key={item.id}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
              }}
              className="min-vh-100"
            >
              {item.items.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: "none",
                            padding: 16,
                            margin: "0 0 8px 0",
                            minHeight: "50px",
                            backgroundColor: snapshot.isDragging
                              ? "#263B4A"
                              : "#456C86",
                            color: "white",
                            ...provided.draggableProps.style,
                          }}
                        >
                          {item.content}
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}

              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </Col>
  );
};

export default ListItem;
