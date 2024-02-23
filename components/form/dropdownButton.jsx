import React, { useEffect, useState } from "react";
import { UserOutlined, DownOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Space,
  Button,
  Dropdown,
  message,
  Menu,
  Checkbox,
  Card,
  Input,
  Tooltip,
} from "antd";
const items = [
  {
    label: "1st menu item",
    id: 1,
  },
  {
    label: "2nd menu item",
    id: 2,
  },
  {
    label: "3rd menu item",
    id: 3,
  },
  {
    label: "4rd menu item",
    id: 4,
  },
];

const DropdownButton = ({
  label = "Button",
  name = "button",
  checkedList = [],
  onChange = () => {},
  items,
}) => {
  const handleMenuClick = (e) => {
    // message.info("Click on menu item.");
    // console.log("click", e);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState();
  const [itemData, setItemData] = useState();

  const handleChange = (e, item) => {
    let selectedList = [...checkedList];
    if (e.target.checked) {
      selectedList.push(item);
    } else {
      const idx = selectedList.findIndex((data) => data.id == item.id);
      if (idx > -1) {
        selectedList.splice(idx, 1);
      }
    }
    onChange({ type: name, payload: selectedList });
    setSearch("");
    setIsOpen(false);
  };

  // check box checked or not
  const isExist = (id) => {
    const idx = checkedList.findIndex((data) => data.id == id);
    if (idx > -1) {
      return true;
    } else {
      return false;
    }
  };

  // search menu item
  useEffect(() => {
    // let copyItems = [...items];

    if (search) {
      const searchedItems = items.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
      );
      setItemData(searchedItems);
    } else {
      setItemData(items);
    }
  }, [search, items]);

  const menuList = () => {
    return (
      <Card className="custom-dropdown-menu-card" hoverable>
        <Input
          placeholder="Search"
          value={search}
          size="large"
          className="custom-dropdown-menu-search-box"
          onInput={(e) => setSearch(e.target.value)}
          prefix={<SearchOutlined />}
        />
        {itemData && itemData.length > 0 ? (
          <Menu
            className="custom-dropdown-menu-item-list"
            // onClick={(e) => handleMenuClick(e)}
          >
            {itemData &&
              itemData.map((item) => (
                <Menu.Item
                  key={item.id}
                  // onClick={(e) => handleMenuClick(e)}
                  className="custom-dropdown-menu-item"
                >
                  <Checkbox
                    onChange={(e) => handleChange(e, item)}
                    checked={isExist(item.id)}
                  >
                    {item.label}
                  </Checkbox>
                </Menu.Item>
              ))}
          </Menu>
        ) : (
          <p className="no-option-found">No options</p>
        )}
      </Card>
    );
  };

  return (
    <Tooltip
      title={menuList}
      trigger="click"
      placement="bottomLeft"
      className="custom-dropdown"
      overlayClassName="custom-dropdown-menu"
      visible={isOpen}
      onVisibleChange={(e) => setIsOpen(e)}
    >
      <Button>
        <Space>
          {label}
          <DownOutlined />
        </Space>
      </Button>
    </Tooltip>
  );
};

export default DropdownButton;
