import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import QuestionTooltip from "./questionTooltip";
import { isBrowser } from "react-device-detect";
class RadioBox extends React.PureComponent {
  onChange = (e, value) => {
    let newObj = {};
    newObj.name = e.props.label;
    newObj.value = value.id;
    if (!value.isSearch) {
      newObj.question_id = value.pivot.question_id;
    }
    newObj.label = value.name;
    this.props.onChange(newObj);
  };

  render() {
    const { options, label, notes, id, name, value } = this.props;

    let columnClass = "";
    if (isBrowser) {
      if (!!options && options.length > 4) {
        columnClass = "column-class";
      } else {
        columnClass = "";
      }
    }

    return (
      <React.Fragment>
        {label && (
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
        )}
        <div
          style={{ marginTop: "10px" }}
          className={`radio-box-wrapper ${columnClass}`}
        >
          <div>
            {options &&
              options.map((data, key) => {
                return (
                  <FormGroup key={key}>
                    <Label
                      key={data.id}
                      className={value == data.id ? "labelChecked" : ""}
                    >
                      <Input
                        type="radio"
                        defaultChecked={value == data.id}
                        name={name}
                        onClick={() => {
                          this.onChange(this, data);
                        }}
                      />
                      {data.name}
                    </Label>
                  </FormGroup>
                );
              })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RadioBox;
