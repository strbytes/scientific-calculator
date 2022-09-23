import Calculator from './calc/calc.js';
import ControlBuilder from './controls.js';
import './reset.css';
import './style.css';

const Calc = new Calculator();
ControlBuilder(Calc);
