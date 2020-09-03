import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import FormikFieldCheckbox from "../FormikFieldCheckbox";
import {
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel
} from "@material-ui/core";

const FormikCheckboxGroup = ({
  value,
  error,
  touched,
  name,
  label,
  children,
  options,
  optionLabelKey,
  optionValueKey,
  helperText,
  onChange,
  onBlur,
  ...props
}) => {
  const handleChange = e => {
    const target = e.target;
    let valueArray = [...value] || [];

    if (target.checked) {
      valueArray.push(target.value);
    } else {
      valueArray.splice(valueArray.indexOf(target.value), 1);
    }
    // setFieldValue method prop call
    onChange(name, valueArray);
  };

  const handleBlur = () => {
    // setFieldTouched method prop call
    onBlur(name, [true]);
  };

  const generateCheckboxField = (checkboxValue, checkboxLabel) => {
    return (
      <Field
        key={`${name}-${checkboxValue}`}
        component={FormikFieldCheckbox}
        name={name}
        id={`${name}-${checkboxValue}`}
        label={checkboxLabel}
        value={checkboxValue}
        field={{
          name,
          value: value.includes(checkboxValue),
          onChange: handleChange,
          onBlur: handleBlur
        }}
        displayError={false}
      />
    );
  };

  const renderedOptions = Array.isArray(options)
    ? options.map(option =>
        generateCheckboxField(
          option[optionValueKey],
          option[optionLabelKey]
        )
      )
    : typeof options !== "undefined" &&
      Object.keys(options).map(k =>
        generateCheckboxField(k, options[k])
      );

  const isTouchedAndHasError = Boolean(touched) && Boolean(error);

  return (
    <FormControl component="fieldset">
      {label && (
        <FormLabel component="legend" focused={false}>
          {label}
        </FormLabel>
      )}
      <FormGroup {...props}>
        {renderedOptions
          ? renderedOptions
          : typeof children !== "undefined"
          ? React.Children.map(children, child => {
              return React.cloneElement(child, {
                field: {
                  name,
                  value: value.includes(child.props.value),
                  onChange: handleChange,
                  onBlur: handleBlur
                },
                displayError: false
              });
            })
          : ""}
      </FormGroup>
      {(isTouchedAndHasError || helperText) && (
        <FormHelperText error={isTouchedAndHasError}>
          {isTouchedAndHasError ? error : helperText ? helperText : ""}
        </FormHelperText>
      )}
    </FormControl>
  );
};

FormikCheckboxGroup.propTypes = {
  value: PropTypes.array.isRequired,
  error: PropTypes.string,
  touched: PropTypes.array,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  helperText: PropTypes.string,
  children: PropTypes.node,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.shape()
  ]),
  optionValueKey: PropTypes.string,
  optionLabelKey: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
};

FormikCheckboxGroup.defaultProps = {
  optionValueKey: "id",
  optionLabelKey: "value"
};

export default FormikCheckboxGroup;
