import { render, screen } from "@testing-library/react";
import Sneakers, { Card } from "./Sneakers";

test("Sneakers should contain cards when created", () => {
  render(<Sneakers />);
  const cardsElement = screen.findByTestId("card-component");
  expect(cardsElement).toBeInTheDocument();
});
