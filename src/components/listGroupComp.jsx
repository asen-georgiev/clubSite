import React from 'react';
import ListGroup from "react-bootstrap/ListGroup";

function ListGroupComp(props) {

    const {items, onListSelect, textProperty, valueProperty, selectedItem} = props;

    return (
        <ListGroup horizontal>
            {items.map(item =>
                <ListGroup.Item
                    key={item[valueProperty]}
                    action variant="warning"
                    className={item === selectedItem ? "text-center active" : "text-center"}
                    onClick={() => onListSelect(item)}>
                    {item[textProperty]}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
}

export default ListGroupComp;
