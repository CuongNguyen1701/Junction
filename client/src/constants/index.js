import { cuong, hnam, pnam, anon, thanh, hadinh } from "../assets";

const members = [
  {
    name: "Nguyen Truc Cuong",
    image: cuong,
    role: "Front-end Developer",
    description: "Description",
  },
  {
    name: "Tran Duc Hoang Nam",
    image: hnam,
    role: "Back-end Developer",
    description: "Description",
  },
  {
    name: "Le Phuong Nam",
    image: pnam,
    role: "Back-end Developer",
    description: "Description",
  },
  {
    name: "Do Chi Thanh",
    image: thanh,
    role: "Business Advisor",
    description: "Description",
  },
  {
    name: "Dinh Viet Ha",
    image: hadinh,
    role: "AI Engineer",
    description: "Description",
  },
];

export const navLinks = [
  {
    id: "home",
    title: "Home",
    pathname: "/",
  },
  {
    id: "service",
    title: "Service",
    pathname: "/",
  },
  {
    id: "about",
    title: "About",
    pathname: "/",
  },
];

export { members };
