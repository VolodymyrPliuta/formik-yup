import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FormHelperText, TextField } from "@material-ui/core";

import useStyles from "./styles";

const FormikFieldTextField = ({
  field,
  form: { touched, errors },
  variant,
  helperText,
  readOnly,
  maxLength,
  ...props
}) => {
  const [chrCount, setChrCount] = React.useState(0);
  const classes = useStyles();
  const helperLineClass = classNames({
    [classes.helperLine]: true,
    [classes.helperLineOutlinedOrFilled]: variant !== "standard"
  });

  const handleChange = e => {
    if (maxLength) {
      setChrCount(String(e.currentTarget.value).length);
    }
    field.onChange();
  };

  const hasError = touched[field.name] && Boolean(errors[field.name]);

  return (
    <div>
      <TextField
        error={hasError}
        variant={variant}
        fullWidth
        InputProps={{
          readOnly
        }}
        inputProps={{
          maxLength
        }}
        {...field}
        onChange={handleChange}
        {...props}
      />
      <div className={helperLineClass}>
        <FormHelperText error={hasError}>
          {hasError ? errors[field.name] : helperText || ""}
        </FormHelperText>
        <FormHelperText className={classes.characterCount}>
          {maxLength && `${chrCount}/${maxLength}`}
        </FormHelperText>
      </div>
    </div>
  );
};

FormikFieldTextField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(["standard", "outlined", "filled"]),
  helperText: PropTypes.string,
  readOnly: PropTypes.bool,
  maxLength: PropTypes.number
};
FormikFieldTextField.defaultProps = {
  variant: "outlined",
  readOnly: false,
  maxLength: null
};

export default FormikFieldTextField;
