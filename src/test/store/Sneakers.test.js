import { render, screen } from "@testing-library/react";
import Sneakers from "../../components/Sneakers";
import { BrowserRouter } from "react-router-dom";

const sneakers = [
  {
    id: 5,
    brandId: 1,
    model: "Air Force 1",
    price: 65.99,
    image: "/sneaker/nike/nike-air-force-1.png",
    publishedAt: "1989-02-10",
  },
  {
    id: 2,
    brandId: 2,
    model: "Forum Home Alone",
    price: 110,
    image: "/sneaker/adidas/adidas-forum-home-alone.png",
    publishedAt: "1996-06-08",
  },
  {
    id: 18,
    brandId: 3,
    model: "BMW MMS RS",
    price: 83.79,
    image: "/sneaker/puma/puma-bmw-mms-rs.png",
    publishedAt: "2017-03-08",
  },
];

const brands = [
  {
    id: 1,
    name: "Nike",
  },
  {
    id: 2,
    name: "Adidas",
  },
  {
    id: 3,
    name: "Puma",
  },
];

test("Sneakers list should have 3 cards", () => {
  render(
    <BrowserRouter>
      <Sneakers sneakers={sneakers} brand={brands} />
    </BrowserRouter>
  );
  let content = screen.getAllByTestId("card-sneakers");
  expect(content.length).toEqual(3);
});
