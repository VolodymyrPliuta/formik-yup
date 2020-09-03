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
  const [chrCount, setChrCount] = React.useState(
    field.value ? field.value.length : 0
  );
  const classes = useStyles();
  const helperLineClass = classNames({
    [classes.helperLine]: true,
    [classes.helperLineOutlinedOrFilled]: variant !== "standard"
  });

  const handleKeyUp = e => {
    setChrCount(String(e.target.value).length);
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
        onKeyUp={maxLength ? handleKeyUp : null}
        {...field}
        {...props}
      />
      <div className={helperLineClass}>
        {(hasError || helperText) && (
          <FormHelperText error={hasError}>
            {hasError ? errors[field.name] : helperText || ""}
          </FormHelperText>
        )}
        {maxLength && (
          <FormHelperText className={classes.characterCount}>
            {`${chrCount}/${maxLength}`}
          </FormHelperText>
        )}
      </div>
    </div>
  );
};

FormikFieldTextField.propTypes = {
  field: PropTypes.shape().isRequired,
  form: PropTypes.shape().isRequired,
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
