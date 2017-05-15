/* tslint:disable:max-classes-per-file */

// Bad LSP

class Rectangle {
  constructor() {
    this.width = 0;
    this.height = 0;
  }

  public setColor(color) {
    // ...
  }

  public render(area) {
    // ...
  }

  public setWidth(width) {
    this.width = width;
  }

  public setHeight(height) {
    this.height = height;
  }

  public getArea() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  public setWidth(width) {
    this.width = width;
    this.height = width;
  }

  public setHeight(height) {
    this.width = height;
    this.height = height;
  }
}

function renderLargeRectangles(rectangles) {
  rectangles.forEach((rectangle) => {
    rectangle.setWidth(4);
    rectangle.setHeight(5);
    const area = rectangle.getArea(); // BAD: Returns 25 for Square. Should be 20.
    rectangle.render(area);
  });
}

const rectangles = [new Rectangle(), new Rectangle(), new Square()];
renderLargeRectangles(rectangles);
