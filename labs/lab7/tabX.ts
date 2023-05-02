import _ from "lodash";

export default function tabX(min: number, max: number, step: number): any {
    return _.range(min, max + step, step).map((elem: number) => {
        return Number(elem.toFixed(2));
    });
}
