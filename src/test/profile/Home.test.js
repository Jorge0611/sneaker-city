import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Home from "../../pages/Home";

test("Sneakers should contain cards when created", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const cardsElement = screen.queryByTestId("sneaker-component");
  expect(cardsElement).toBeDefined();
});
