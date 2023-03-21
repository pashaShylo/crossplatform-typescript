import { Quadrangle } from "./quadrangle";

export class Square extends Quadrangle{
    public a : number
    constructor(name: string, a:number = 5){
        super(name)
        this.a = a
    }
    
    override area(): number {
        return this.a * this.a
    }
}