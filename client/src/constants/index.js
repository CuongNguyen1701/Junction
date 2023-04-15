import { cuong, hnam, pnam, anon, thanh, hadinh } from "../assets";

const members = [
  {
    name: "Tran Duc Hoang Nam",
    image: hnam,
    role: "Back-end Developer",
    description: "Description",
  },
  {
    name: "Junction X Hanoi 2023",
    image: anon,
    role: "Organizer",
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
    role: "Business Analyst",
    description: "Description",
  },
  {
    name: "Nguyen Truc Cuong",
    image: cuong,
    role: "Front-end Developer",
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
