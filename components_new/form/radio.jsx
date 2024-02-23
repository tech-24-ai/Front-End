import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import QuestionTooltip from "./questionTooltip";
import { isBrowser } from "react-device-detect";
class RadioBox extends React.PureComponent {
  onChange = (value) => {
    this.props.onChange(value);
  };

  render() {
    const { options, label, id, notes, name, value } = this.props;
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
        <Label className="sub-title">
          <div>
            <p style={{ display: "contents" }}>{label}</p>

            <QuestionTooltip id={id} title={label} notes={notes} modal={true} />
          </div>
        </Label>
        <div className={`radio-box-wrapper ${columnClass}`}>
          {options &&
            options.map((data) => {
              return (
                <FormGroup>
                  <Label
                    key={data.id}
                    className={value == data.id ? "labelChecked" : ""}
                  >
                    <Input
                      type="radio"
                      defaultChecked={value == data.id}
                      name={name}
                      onClick={() => {
                        this.onChange(data);
                      }}
                    />
                    {data.name}
                  </Label>
                </FormGroup>
              );
            })}
        </div>
      </React.Fragment>
    );
  }
}

export default RadioBox;
