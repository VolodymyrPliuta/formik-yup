import React from "react";
import PropTypes from "prop-types";
import { FormControlLabel, Radio } from "@material-ui/core";

const FormikFieldRadio = ({ field, form, id, label, value, color, ...props }) => {
  return (
    <FormControlLabel
      name={field.name}
      label={label}
      value={value}
      control={<Radio id={id} color={color} />}
      color="default"
      {...props}
    />
  );
};

FormikFieldRadio.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.oneOf(["primary", "secondary", "default"])
};

FormikFieldRadio.defaultProps = {
  color: "primary"
};

export default FormikFieldRadio;
