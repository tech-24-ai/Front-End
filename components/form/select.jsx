import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { isBrowser, isMobile } from "react-device-detect";
import Select, { components } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Icon } from "react-icons-kit";
import { chevronRight, check } from "react-icons-kit/feather";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import MobileSearch from "../../public/images/input/search2.svg";
import QuestionTooltip from "./questionTooltip";
const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <FontAwesomeIcon
        icon={props.selectProps.menuIsOpen ? faChevronUp : faChevronDown}
        width={10}
      />
    </components.DropdownIndicator>
  );
};

class SelectBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      located: "",
      filterData: [],
    };
  }

  setLocated = (item) => {
    this.setState({
      located: item,
    });
  };

  searchData = (event, finalOptions) => {
    const searchText = event.target.value;
    const data = finalOptions.filter(
      (item) =>
        item.label.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    this.setState({
      filterData: data,
    });
  };

  onChange = (event) => {
    if (event) {
      this.props.onChange(event);
    }
  };

  render() {
    const {
      options,
      label,
      name,
      notes,
      id,
      value,
      question_id,
      placeholder,
      isClearable,
    } = this.props;
    const { located, filterData } = this.state;
    const finalOptions = [];
    let searchData = [];
    if (options && options.length) {
      options.forEach((element) => {
        if (element.children && element.children.length != 0) {
          element.children.forEach((children) => {
            finalOptions.push({
              label: element.name + ` > ${children.name}`,
              value: children.id,
              name: name,
              question_id: question_id,
            });
          });
        } else {
          finalOptions.push({
            label: element.name,
            value: element.id,
            name: name,
            question_id: question_id,
          });
        }
      });
    }
    if (filterData.length != 0) {
      searchData = filterData;
    } else {
      searchData = finalOptions;
    }

    return (
      <React.Fragment>
        <FormGroup className="select-box-wrapper">
          <Label className="sub-title">
            <div>
              <p style={{ display: "contents" }}>{label}</p>

              <QuestionTooltip
                id={id}
                title={label}
                notes={notes}
                modal={true}
              />
            </div>
          </Label>
          <div>
            {isBrowser && (
              <Select
                isClearable={isClearable}
                className="react-select-container"
                classNamePrefix="react-select"
                components={{ DropdownIndicator }}
                value={finalOptions.filter((item) => item.value == value)}
                isSearchable={true}
                name={name}
                options={finalOptions}
                onChange={this.onChange}
                placeholder={placeholder}
              />
            )}
          </div>
          <div className="input-searchbox">
            <div className="select-searchbox open">
              {isMobile && (
                <div className="input-block">
                  {!this.props.istoolKits && (
                    <FormGroup>
                      <Input
                        type="text"
                        placeholder="Search …"
                        autoComplete="off"
                        onChange={(e) => this.searchData(e, finalOptions)}
                      />
                      <div className="search-icon">
                        <img src={MobileSearch.src} className="mobile-search" />
                      </div>
                    </FormGroup>
                  )}
                  <div className="search-list-box">
                    <ul>
                      {searchData.map((item, i) => (
                        <li
                          key={i}
                          onClick={() => {
                            this.setLocated(item.label);
                            this.onChange(item);
                          }}
                          className={located === item.label ? "active" : ""}
                        >
                          {item.label}
                          {isMobile && (
                            <span>
                              {located === item.label ? (
                                <Icon size={18} icon={check} />
                              ) : (
                                <Icon size={18} icon={chevronRight} />
                              )}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </FormGroup>
      </React.Fragment>
    );
  }
}

export default SelectBox;
