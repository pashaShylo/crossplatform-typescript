function factorial(n: number): number {
    return n != 1 ? n * factorial(n - 1) : 1;
}

function getSumm(x: number): number {
    let a = Math.pow(x, 2 * 1) / factorial(2 * 1);
    let n = 2;
    let S = Math.pow(x, 2 * 1) / factorial(2 * 1) + 1;
    while (a > 0.001) {
        a = Math.pow(x, 2 * n) / factorial(2 * n);
        S += a;
        n++;
    }
    return S;
}
export default function series(arrX: any) {
    return arrX.map((elem: any) => {
        return Number(getSumm(elem).toFixed(2));
    });
}
