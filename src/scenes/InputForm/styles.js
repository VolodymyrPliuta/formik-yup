import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(5)
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto"
  }
}));

export default useStyles;
