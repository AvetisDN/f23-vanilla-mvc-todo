import Controller from "./src/classes/Controller";
import Model from "./src/classes/Model";
import View from "./src/classes/View";
import "./src/css/style.css";

const app = new Controller(new Model(), new View());
