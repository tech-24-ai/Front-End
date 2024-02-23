import React from "react";
import { FormGroup, Label, Row, Col, CustomInput } from "reactstrap";
import QuestionTooltip from "./questionTooltip";
class CheckBox extends React.PureComponent {
  onChange = (e, value, isSubOption, data = []) => {
    let newObj = {};
    newObj.name = e.props.label;
    newObj.value = value.id;
    newObj.question_id = value.pivot.question_id;
    (newObj.option_type = true),
      (newObj.label = value.name),
      (newObj.isSubOption = isSubOption);

    if (isSubOption) {
      newObj.parent_id = value.pivot.option_id;
      newObj.parent_label = data.name;
      this.props.onOptionChange(newObj);
    } else {
      newObj.subOptionLength = value.sub_options.length;
      this.props.onChange(newObj);
    }
  };

  render() {
    const { options, label, notes, id, name, value, subValue } = this.props;
    let childrenClass;
    let isChildren;

    return (
      <React.Fragment>
        <div className="check-box-wrapper">
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
          <FormGroup>
            <Row>
              {options &&
                options.map((data) => {
                  if (data.sub_options.length != 0) {
                    childrenClass = "category-type";
                    isChildren = true;
                  } else {
                    childrenClass = "";
                    isChildren = false;
                  }
                  return (
                    <Col sm={6} key={`${data.id}`}>
                      <div className="datascale-block">
                        <div className="select-category-block applications">
                          <div className="category-select-btn">
                            <div
                              className={`checkbox-password ${childrenClass}`}
                            >
                              <CustomInput
                                type="checkbox"
                                id={`${data.id}-${data.pivot.question_id}`}
                                label={data.name}
                                checked={value && value.includes(data.id)}
                                name={name}
                                onChange={() => {}}
                                onClick={() => {
                                  this.onChange(this, data, false);
                                }}
                                children={
                                  isChildren && (
                                    <ul>
                                      {data.sub_options.map((subOpt) => {
                                        return (
                                          <li key={`${subOpt.id}`}>
                                            <CustomInput
                                              type="checkbox"
                                              id={`${subOpt.id}-${data.id}`}
                                              defaultChecked={
                                                subValue &&
                                                subValue.includes(subOpt.id)
                                              }
                                              label={subOpt.name}
                                              name={subOpt.name}
                                              onClick={() => {
                                                this.onChange(
                                                  this,
                                                  subOpt,
                                                  true,
                                                  data
                                                );
                                              }}
                                            />
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  );
                })}
            </Row>
          </FormGroup>
        </div>
      </React.Fragment>
    );
  }
}

export default CheckBox;
