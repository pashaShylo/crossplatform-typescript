import log from "./log";

function factorial(n: number): number {
    return n != 1 ? n * factorial(n - 1) : 1;
}

function rowSumm(x: number, n: number, summ: number): number {
    let b = Math.pow(x, 2 * n) / factorial(2 * n);
    summ = summ + b;
    n++;
    if (Math.abs(b) < 0.001) {
        return summ;
    }
    return rowSumm(x, n, summ);
}

export default function recursion(arrX: any) {
    return arrX.map((elem: any) => {
        return Number(rowSumm(elem, 1, 1).toFixed(2));
    });
}
