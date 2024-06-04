import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { isBrowser, isMobile } from "react-device-detect";
import AngleUp from "../../public/images/angleup.svg";
import AngleDown from "../../public/images/angledown.svg";
import QuestionTooltip from "./questionTooltip";
class MultiRadio extends React.PureComponent {
  constructor(props) {
    super(props);
    let subResponse = Object.assign(
      {},
      ...props.value.map((key, index) => ({ [key]: props.subValue[index] }))
    );

    const showResponse = Object.assign(
      {},
      ...props.value.map((key) => ({ [key]: true }))
    );
    this.state = {
      priorityClick: false,
      setIndex: 0,
      showHidePriority:
        Object.keys(showResponse).length == 0 ? {} : showResponse,
    };
  }

  setPriority = (e, data, value) => {
    if (!(this.props.value && this.props.value.includes(data.id))) {
      let newObj = {};
      newObj.name = e.props.label;
      newObj.question_id = data.pivot.question_id;
      (newObj.option_type = true), (newObj.isSubOption = false);
      (newObj.label = data.name), (newObj.value = data.id);
      newObj.subOptionLength = data.have_priority == 1 ? 1 : 0;
      this.props.onChange(newObj);
    }
  };

  onChange = (e, value, isSubOption, list = "") => {
    let newObj = {};
    newObj.name = e.props.label;
    newObj.question_id = value.pivot.question_id;
    (newObj.option_type = true), (newObj.isSubOption = isSubOption);

    if (isSubOption) {
      newObj.parent_id = value.pivot.option_id;
      (newObj.label = list), (newObj.value = list);
      newObj.parent_label = value.name;
      this.props.onOptionChange(newObj, isSubOption);
    } else {
      (newObj.label = value.name), (newObj.value = value.id);
      newObj.subOptionLength = value.have_priority == 1 ? 1 : 0;
      this.props.onChange(newObj);
    }
  };

  onChangePriority = (e, value, isSubOption, list = "") => {
    let newObj = {};
    newObj.name = e.props.label;
    newObj.question_id = value.pivot.question_id;
    (newObj.option_type = true), (newObj.isSubOption = isSubOption);

    newObj.parent_id = value.pivot.option_id;
    (newObj.label = list), (newObj.value = list);
    newObj.parent_label = value.name;
    this.props.onChangePriority(newObj);
  };

  render() {
    const { label, notes, id, options, value, priority } = this.props;
    const priorityList = ["1", "2", "3", "4"];
    return (
      <React.Fragment>
        <Label className="sub-title">
          <div>
            <p style={{ display: "contents" }}>{label}</p>

            <QuestionTooltip id={id} title={label} notes={notes} modal={true} />
          </div>
        </Label>
        <div className="select-category-block following-os">
          <div className="category-select-btn">
            {options &&
              options.map((data, index) => {
                return (
                  <div className="following-box">
                    <div className="category-checkbox mb-0">
                      <Input
                        type="checkbox"
                        id={data.id}
                        checked={value.length && value.includes(data.id)}
                        onChange={() => {}}
                      />
                      <Label
                        onClick={() => {
                          this.onChange(this, data, false);
                        }}
                        for={data.id}
                        className="category-btn"
                      >
                        {data.name}
                      </Label>
                    </div>

                    {isBrowser && data.have_priority == 1 && (
                      <div className="web-priority">
                        <h6>Priority</h6>
                        {priorityList &&
                          priorityList.map((list) => (
                            <span
                              className={
                                priority[data.id] == list ? "active" : ""
                              }
                              onClick={() => {
                                this.setPriority(this, data, list);
                                this.onChangePriority(this, data, true, list);
                              }}
                            >
                              {list}
                            </span>
                          ))}
                      </div>
                    )}

                    {isMobile && data.have_priority == 1 && (
                      <div className="mobile-following-count">
                        {priorityList &&
                          priorityList.map((list) => (
                            <span
                              className={
                                priority[data.id] == list ? "active" : ""
                              }
                              onClick={() => {
                                this.setPriority(this, data, list);
                                this.onChangePriority(this, data, true, list);
                              }}
                            >
                              {list}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MultiRadio;
