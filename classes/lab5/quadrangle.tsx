export abstract class Quadrangle{
    public name: string

    constructor(name : string){
        this.name = name
    }
    
    abstract area() : number
} 