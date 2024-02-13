import React, { ChangeEvent, useRef } from "react"; // Ensure React is imported for types
import classNames from "classnames";
import { InputCheckboxComponent } from "./types";

export const InputCheckbox: InputCheckboxComponent = ({
  id,
  checked = false,
  disabled,
  onChange,
}) => {
  const { current: inputId } = useRef(`KaizntreeInputCheckbox-${id}`);

  // Handle change events on form elements like checkboxes or radio buttons
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className="KaizntreeInputCheckbox--container" data-testid={inputId}>
      <label
        className={classNames("KaizntreeInputCheckbox--label", {
          "KaizntreeInputCheckbox--label-checked": checked,
          "KaizntreeInputCheckbox--label-disabled": disabled,
        })}
        htmlFor={inputId}
      />
      <input
        id={inputId}
        type="checkbox"
        className="KaizntreeInputCheckbox--input"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
    </div>
  );
};
