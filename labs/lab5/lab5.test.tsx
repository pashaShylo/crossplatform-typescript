import { Square } from '../../classes/lab5/square';
import { Rectangle } from "../../classes/lab5/rectangle";

describe("Square class", () => {
  test("creates an instance of Square with specified value", () => {
    const square = new Square("square", 10);
    expect(square).toBeInstanceOf(Square);
    expect(square.a).toBe(10);
    expect(square.name).toBe("square");
  });

  test("calculates the area correctly", () => {
    const square = new Square("square", 7);
    expect(square.area()).toBe(49);
  });
});

describe("Rectangle class", () => {
    test("creates an instance of Rectangle with specified values", () => {
      const rectangle = new Rectangle("rectangle", 5, 6);
      expect(rectangle).toBeInstanceOf(Rectangle);
      expect(rectangle.a).toBe(5);
      expect(rectangle.b).toBe(6);
      expect(rectangle.name).toBe("rectangle");
    });
  
    test("calculates the area correctly", () => {
      const rectangle = new Rectangle("rectangle", 7, 8);
      expect(rectangle.area()).toBe(56);
    });
  });