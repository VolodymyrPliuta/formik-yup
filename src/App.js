import React, { Component } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import InputForm from "./scenes/InputForm";

const theme = createMuiTheme();

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <InputForm />
      </ThemeProvider>
    );
  }
}

export default App;
