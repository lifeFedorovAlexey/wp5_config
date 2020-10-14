const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 300;
const XMLNS = "http://www.w3.org/2000/svg";

module.exports = class SVG {
  constructor(width, height) {
    this.svg = document.createElementNS(XMLNS, "svg");
    this.width = width ? width : DEFAULT_WIDTH;
    this.height = height ? height : DEFAULT_HEIGHT;
    this.g = document.createElementNS(XMLNS, "g");
  }
  createSvgElement(tag) {
    return document.createElementNS(XMLNS, tag);
  }

  create() {
    let svgAttr = [
      { key: "version", value: "1.1" },
      { key: "baseProfile", value: "full" },
      { key: "width", value: this.width },
      { key: "height", value: this.height },
      { key: "xmlns", value: XMLNS },
    ];
    setAttributes(this.svg, svgAttr);
  }

  pastIn(elem) {
    elem.append(this.svg);
  }

  add(tag, attributes, slot) {
    let element = this.createSvgElement(tag);
    setAttributes(element, attributes);
    slot ? (element.innerHTML = slot) : false;
    this.svg.append(element);
  }
};

function setAttribute(elem, key, value) {
  elem.setAttribute(key, value);
}

function setAttributes(elem, attributes) {
  attributes.map((attribute) => {
    setAttribute(elem, attribute.key, attribute.value);
  });
}
