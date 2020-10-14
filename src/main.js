import "./css/style.css";
// import SVG from "./js/svg.js";

// let svg = new SVG(320, 320);
// svg.create();

// let rectAttr = [
//   { key: "fill", value: "red" },
//   { key: "width", value: "100%" },
//   { key: "height", value: "100%" },
// ];

// let circleAttr = [
//   { key: "cx", value: "150" },
//   { key: "cy", value: "100" },
//   { key: "r", value: "80" },
//   { key: "fill", value: "green" },
// ];

// let textAttr = [
//   { key: "x", value: "150" },
//   { key: "y", value: "125" },
//   { key: "font-size", value: "60" },
//   { key: "text-anchor", value: "middle" },
//   { key: "fill", value: "white" },
// ];
// let pathAttr = [
//   {
//     key: "d",
//     value: `M10 315 L 110 215 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 109.9 L 315 10`,
//   },
//   { key: "fill", value: "green" },
//   { key: "stroke-width", value: "2" },
//   { key: "fill-opacity", value: "0.5" },
// ];

// svg.add("rect", rectAttr);
// svg.add("circle", circleAttr);
// svg.add("text", textAttr, "SVG");
// svg.add("path", pathAttr);

// svg.pastIn(app);

let data = { price: 5, quantity: 2 };
window.data = data;
let target = null;

// Это - тот же самый класс, который мы уже рассматривали
class Dep {
  constructor() {
    this.subscribers = [];
  }
  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }
  notify() {
    this.subscribers.forEach((sub) => sub());
  }
}

// Эту процедуру мы тоже уже рассматривали, но
// здесь она дополнена новыми командами
Object.keys(data).forEach((key) => {
  let internalValue = data[key];

  // С каждым свойством будет связан собственный
  // экземпляр класса Dep
  const dep = new Dep();

  Object.defineProperty(data, key, {
    get() {
      dep.depend(); // запоминаем выполняемую функцию target
      return internalValue;
    },
    set(newVal) {
      internalValue = newVal;
      dep.notify(); // повторно выполняем сохранённые функции
    },
  });
});

// Теперь функция watcher не вызывает dep.depend(),
// так как этот вызов выполняется в геттере
function watcher(myFunc) {
  target = myFunc;
  target();
  target = null;
}

watcher(() => {
  data.total = data.price * data.quantity;
});
