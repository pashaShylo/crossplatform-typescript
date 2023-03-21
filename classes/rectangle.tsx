import { Quadrangle } from "./quadrangle";

export class Rectangle extends Quadrangle{
    public a : number
    public b : number
    constructor(name: string, a:number = 3, b:number = 4){
        super(name)
        this.a = a
        this.b = b
    }

    override area(): number {
        return this.a * this.b
    }
}