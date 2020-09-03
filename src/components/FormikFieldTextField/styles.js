import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  helperLine: {
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "space-between"
  },
  helperLineOutlinedOrFilled: {
    paddingLeft: 12,
    paddingRight: 12
  },
  characterCount: {
    marginLeft: "auto",
    paddingLeft: 12
  }
}));

export default useStyles;
