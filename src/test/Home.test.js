import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";

test("Sneakers should contain cards when created", () => {
  render(<Home />);
  const cardsElement = screen.findByTestId("card-component");
  expect(cardsElement).toContainHTML;
});
