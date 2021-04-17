import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Col, Row, ListGroup } from "react-bootstrap";
import { playlistIcon } from "../../constants/icon";
import { isEmpty } from "lodash";
import useLocalStorage from "../../hooks/useLocalStorage";
import Icon from "../Icon";
import AddListItem from "./AddListItem";
import ListItem from "./ListItem";
import NoResultsRow from "../NoResultsRow";

const KabanlistItems = ({ listItems, removeItem, onDragEnd }) => {
  return (
    <>
      {isEmpty(listItems) && <NoResultsRow message={"No List found."} />}
      {!isEmpty(listItems) && (
        <Row className="mt-4">
          <Col xs={12}>
            <ListGroup>
              <ListGroup.Item className="header">
                <Row>
                  <Col className="col-auto pr-0">
                    <Icon icon={playlistIcon} fixedWidth={true} />
                  </Col>
                  <Col>Your Board</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="min-vh-100">
                <Row>
                  <DragDropContext
                    onDragEnd={(result) => onDragEnd(result, listItems)}
                  >
                    {listItems.map((item) => (
                      <ListItem
                        item={item}
                        removeItem={removeItem}
                        key={item.id}
                      />
                    ))}
                  </DragDropContext>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

const ListWrapper = () => {
  const [listItems, setListItems] = useState([]);
  const { setItem, value } = useLocalStorage("kanbanList");

  const addItem = (item) => {
    // assuming no duplicates for demo purposes
    const a = [...listItems, item];
    setListItems(a);
    setItem(a);
  };

  const removeItem = (itemToBeDeleted) => {
    const remainingPlaylists = listItems.filter(
      (item) => itemToBeDeleted.id !== item.id
    );
    setListItems(remainingPlaylists);
    setItem(remainingPlaylists);
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("kanbanList"));
    if (items) {
      setListItems(items);
    } else {
      setItem(items);
    }
  }, [setItem]);

  const onDragEnd = (result, listItems) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = listItems.find((e) => e.id === source.droppableId);

      const remainingSourceItems = sourceColumn.items.filter(
        (i, index) => index !== source.index
      );
      const destColumn = listItems.find(
        (e) => e.id === destination.droppableId
      );

      const sourceItems = [...sourceColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      const destItems = [...destColumn.items];
      destItems.splice(destination.index, 0, removed);
      sourceColumn.items = remainingSourceItems.slice(0);
      destColumn.items = destItems.slice(0);

      setItem(listItems);
    } else {
      const column = listItems.find((e) => e.id === source.droppableId);
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      column.items = copiedItems.slice(0);
      setItem(listItems);
    }
  };

  return (
    <>
      <AddListItem onAddItem={addItem} />
      <KabanlistItems
        listItems={listItems}
        removeItem={removeItem}
        onDragEnd={onDragEnd}
      />
    </>
  );
};

export default ListWrapper;
