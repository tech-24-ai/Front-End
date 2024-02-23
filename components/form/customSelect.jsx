import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { crudService } from "../../_services";

function CustomSelect({ value, onChange, options, ...more }) {
  const [optionData, setOptionData] = useState(options);
  // console.log("options", options);

  useEffect(() => {
    setOptionData(options);
  }, [options]);

  useEffect(() => {
    if (more.connectFormField?.url) {
      crudService
        ._getAll(more.connectFormField.url)
        .then((res) => {
          if (res.status == 200) {
            let data = res.data.map((data) => ({
              value: data.id,
              label: data.label,
            }));
            setOptionData(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [more?.connectFormField?.url]);

  return (
    <div className="custom-select-box">
      <Select
        // defaultValue={value}
        value={value}
        // style={{
        //   width: 120,
        // }}
        onChange={onChange}
        placeholder={
          more.connectFormField ? more.connectFormField.placeholder : ""
        }
        options={optionData}
        showSearch
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        optionFilterProp="label"
        {...more}
      />
    </div>
  );
}

export default CustomSelect;
