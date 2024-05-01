import React, { Fragment, useState, useEffect } from "react";
import {
  isMobile,
  isBrowser,
  MobileView,
  BrowserView,
} from "react-device-detect";
import SearchInput from "../form/searchInput";
import DropdownButton from "../form/dropdownButton";
import {
  SearchOutlined,
  EnvironmentOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import Swiper from "../../components/swiper/index";
import { crudService } from "../../_services";

function ConsultantFilter({ data, setState, setSearchText, isCompany }) {
  //   const [searchText, setSearchText] = useState();
  const [skills, setSkills] = useState();
  const [subSkills, setSubSkills] = useState([]);
  const [location, setLocation] = useState();
  const [filterSkills, setFilterSkills] = useState([]);

  const [searchInput, setSearchInput] = useState();
  //fetch menu data
  useEffect(() => {
    crudService._getAll("skills").then((res) => {
      if (res.status == 200) {
        setSkills(res.data);
      }
    });

    crudService._getAll("location").then((res) => {
      if (res.status == 200) {
        setLocation(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (data.skills && data.skills.length) {
      const skillIds = data.skills.map((data) => data.id);
      crudService
        ._getAll("sub-skills", { skillIds: JSON.stringify(skillIds) })
        .then((res) => {
          if (res.status == 200) {
            setSubSkills(res.data);
          }
        });
    } else {
      setSubSkills([]);
    }
  }, [data.skills]);

  // search
  useEffect(() => {
    if (searchInput == null) {
      return false;
    }

    const timerId = setTimeout(() => {
      //   handleFetchConsultant({ search: searchInput });
      setSearchText(searchInput);
      // make a request after 3 second since there's no typing
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchInput]);

  const handleFilterOld = ({ type, payload }) => {
    console.log("FilterDataFuncCall", { type, payload });
    if (payload.length) {
      let filteredSkills = [];
      let parentIds = [...new Set(payload.map((data) => data.parent_id))];
      if (data.skills && data.skills.length) {
        filteredSkills = [...data.skills];
        const skillIds = data.skills.map((data) => data.id);
        parentIds = parentIds.filter(
          (parentId) => !skillIds.includes(parentId)
        );
      }
      const newSkills =
        skills && skills.filter((skill) => parentIds.includes(skill.id));
      if (type == "subskills" && newSkills) {
        filteredSkills = [...filteredSkills, ...newSkills];
        setState((preState) => ({
          ...preState,
          [type]: payload,
          ["skills"]: filteredSkills,
        }));
      } else {
        setState((preState) => ({ ...preState, [type]: payload }));
      }
    } else {
      setState((current) => {
        //create a copy of the state object
        const copy = { ...current };
        //remove the key from the object
        delete copy[type];
        if (type == "skills") {
          delete copy["subskills"];
        }
        return copy;
      });
    }
  };

  const handleFilter = ({ type, payload }) => {
    console.log("FilterDataFuncCall", { type, payload });
    if (payload.length) {
      if (type == "skills" && data.subskills && data.subskills.length) {
        const parentIds = payload.map((data) => data.id);
        const newSubSkillList = data.subskills.filter((data) =>
          parentIds.includes(data.parent_id)
        );
        setState((current) => {
          const copy = { ...current };
          copy[type] = payload;
          if (newSubSkillList.length) {
            copy["subskills"] = newSubSkillList;
          } else {
            delete copy["subskills"];
          }

          return copy;
        });
      } else {
        setState((preState) => ({ ...preState, [type]: payload }));
      }
    } else {
      setState((current) => {
        //create a copy of the state object
        const copy = { ...current };
        //remove the key from the object
        delete copy[type];
        if (type == "skills") {
          delete copy["subskills"];
        }
        return copy;
      });
    }
  };

  const clearAll = () => {
    setState({});
  };

  const handleRemoveFilterOld = (key, id) => {
    // console.log("Key:", key, "\nId:", id, "\nData:", data);
    const newList = data[key].filter((data) => data.id != id);

    if (newList.length) {
      if (key == "skills") {
        const newSubSkillList = data["subskills"].filter(
          (data) => data.parent_id != id
        );
        setState((preState) => ({
          ...preState,
          [key]: newList,
          ["subskills"]: newSubSkillList,
        }));
      } else {
        setState((preState) => ({
          ...preState,
          [key]: newList,
        }));
      }
    } else {
      setState((current) => {
        //create a copy of the state object
        const copy = { ...current };

        //remove the key from the object
        delete copy[key];
        if (key == "skills") {
          delete copy["subskills"];
        }
        return copy;
      });
    }
  };
  const handleRemoveFilter = (key, id) => {
    // console.log("Key:", key, "\nId:", id, "\nData:", data);
    const newList = data[key].filter((data) => data.id != id);

    if (newList.length) {
      setState((preState) => ({
        ...preState,
        [key]: newList,
      }));
    } else {
      setState((current) => {
        //create a copy of the state object
        const copy = { ...current };

        //remove the key from the object
        delete copy[key];
        return copy;
      });
    }
  };

  return (
    <Fragment>
      {
        isMobile == false && <BrowserView>
        <div className="filter-section">
          <SearchInput
            placeholder={
              isCompany ? "Find a Service Provider" : "Find Consultant"
            }
            className="testSearchInput"
            onChange={(value) => setSearchInput(value)}
            suffix={<SearchOutlined />}
          />
          <DropdownButton
            label="Location"
            name="location"
            onChange={handleFilter}
            checkedList={data.location}
            items={location}
          />
          <DropdownButton
            label="Skills"
            name="skills"
            onChange={handleFilter}
            checkedList={data.skills}
            items={skills}
          />
          <DropdownButton
            label="Subskills"
            name="subskills"
            onChange={handleFilter}
            checkedList={data.subskills}
            items={subSkills}
          />
        </div>
      </BrowserView>
      }
      {
        isMobile == true && <MobileView>
        <div className="filter-section">
          <SearchInput
            placeholder={
              isCompany ? "Find Service Provider" : "Find Consultant"
            }
            className="search-input"
            onChange={(value) => setSearchInput(value)}
            suffix={<SearchOutlined />}
          />
          <Swiper
            spaceBetween={5}
            nodes={[
              <DropdownButton
                label="Location"
                name="location"
                onChange={handleFilter}
                checkedList={data.location}
                items={location}
              />,
              <DropdownButton
                label="Skills"
                name="skills"
                onChange={handleFilter}
                checkedList={data.skills}
                items={skills}
              />,
              <DropdownButton
                label="Subskills"
                name="subskills"
                onChange={handleFilter}
                checkedList={data.subskills}
                items={subSkills}
              />,
            ]}
          />
        </div>
      </MobileView>
      }
      {Object.keys(data).length > 0 && (
        <div className="filtered-item-container">
          {Object.keys(data).map((key) =>
            data[key].map((subData) => (
              <div className="filtered-item-wrapper" key={subData.id}>
                <p className="filtered-item-lable">
                  {key}:{subData.label}
                </p>

                <CloseOutlined
                  className="clear-btn"
                  onClick={() => handleRemoveFilter(key, subData.id)}
                />
              </div>
            ))
          )}

          <p className="clear-all-btn" onClick={clearAll}>
            Clear all
          </p>
        </div>
      )}
    </Fragment>
  );
}

export default ConsultantFilter;
