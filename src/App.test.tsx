import { render } from "@testing-library/react";
import App from "./App";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import configureMockStore from "redux-mock-store";

test("renders home component", () => {
  const history = createMemoryHistory({ initialEntries: ["/"] });
  const mockStore = configureMockStore();
  const store = mockStore({
    home: {
      playerId: "",
      game: undefined,
    },
  });

  render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
  expect(history.location.pathname).toBe("/");
});
