import React from "react";
import PropTypes from "prop-types";
import { FormControlLabel, FormHelperText, Checkbox } from "@material-ui/core";

const FormikFieldCheckbox = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched },
  id,
  label,
  value: propsValue,
  helperText,
  displayError,
  color,
  ...props
}) => {
  const isTouchedAndHasError =
    displayError && touched[name] && Boolean(errors[name]);
  return (
    <>
      <FormControlLabel
        name={name}
        label={label}
        control={
          <Checkbox
            id={id}
            onChange={onChange}
            onBlur={onBlur}
            value={String(propsValue) || String(value)}
            color={color}
          />
        }
        {...props}
        checked={Boolean(value)}
      />
      {(isTouchedAndHasError || helperText) && (
        <FormHelperText error={isTouchedAndHasError}>{isTouchedAndHasError ? errors[name] : helperText || ""}</FormHelperText>
      )}
    </>
  );
};

FormikFieldCheckbox.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  helperText: PropTypes.string,
  color: PropTypes.oneOf(["primary", "secondary", "default"]),
  displayError: PropTypes.bool
};

FormikFieldCheckbox.defaultProps = {
  color: "primary",
  displayError: true
};

export default FormikFieldCheckbox;
