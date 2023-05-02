import tabX from "./tabX";
import tabY from "./tabY";
import recursion from "./recursion";
import series from "./series";
test("Should return an array of numbers with two decimal places", () => {
    expect(tabX(0, 1, 0.1)).toEqual([
        0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
    ]);
    expect(tabX(-0.5, 0.5, 0.2)).toEqual([-0.5, -0.3, -0.1, 0.1, 0.3, 0.5]);
});
test("Should return an array of calculated values based on the input array", () => {
    expect(tabY([0, 1, 2, 3])).toEqual([1, 1.54, 3.76, 10.07]);
});
test("Should return an array of calculated values based on the input array", () => {
    expect(recursion([0, 1, 2])).toEqual([1, 1.86, 27.8]);
    expect(recursion([-1, -2, 0])).toEqual([1.86, 27.8, 1]);
});
test("Should return an array of calculated values based on the input array", () => {
    expect(series([0, 1, 2])).toEqual([1, 1.86, 27.8]);
    expect(series([-1, -2, 0])).toEqual([1.86, 27.8, 1]);
});
