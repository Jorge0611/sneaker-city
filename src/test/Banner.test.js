import { render, screen } from "@testing-library/react";
import Banner from "../components/Banner";

test("Renders without crashing", () => {
  render(<Banner />);
});

test("Image is being loaded", () => {
  const { getByAltText } = render(<Banner />);
  const image = getByAltText("banner");
  expect(image).toHaveAttribute("src", "/sneaker/banner.png");
});
