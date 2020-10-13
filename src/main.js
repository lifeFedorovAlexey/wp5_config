import "./css/style.css";
import module from "./js/module.js";
function sayHello() {
  return () => console.log(module.name);
}

sayHello()();
