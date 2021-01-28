import React from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import '../css/admin.css';
import * as PropTypes from "prop-types";


function DropDownComp(props) {

    const {items, valueProperty, textProperty, selectedItem, onSelectDropDown} = props;

    return (
        <Dropdown>
            <Dropdown.Toggle
                className="drd-toggle">
                {selectedItem[textProperty] || selectedItem}
            </Dropdown.Toggle>
            <Dropdown.Menu
                className="drd-menu">
                {items.map(item =>
                    <React.Fragment key={item[valueProperty]}>
                        <Dropdown.Divider/>
                        <Dropdown.Item
                            className="drd-item text-center"
                            onSelect={() => onSelectDropDown(item)}
                        >
                            {item[textProperty]}
                        </Dropdown.Item>
                        <Dropdown.Divider/>
                    </React.Fragment>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}

DropDownComp.propTypes = {
    items: PropTypes.array.isRequired,
    valueProperty: PropTypes.string.isRequired,
    textProperty: PropTypes.string.isRequired,
    selectedItem: PropTypes.object.isRequired,
    onSelectDropDown: PropTypes.func.isRequired,
}

export default DropDownComp;
