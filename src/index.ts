import Calculator from "./calc/calc";
import ControlBuilder from "./controls";
import "./reset.css";
import "./style.css";

const Calc = new Calculator();
ControlBuilder(Calc);
