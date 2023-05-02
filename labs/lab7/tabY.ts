import _ from "lodash";

export default function tabY(arrX: any): any {
    return arrX.map((elem: any) => {
        return Number(
            ((Math.pow(Math.E, elem) + Math.pow(Math.E, -elem)) / 2).toFixed(2)
        );
    });
}
