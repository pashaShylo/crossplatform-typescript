interface Engine {
    start(): string;
    stop(): string;
  }
  
  interface ICE extends Engine {
    increaseSpeed(): string
    decreaseSpeed(): string;
  }
  
  export class Diesel implements ICE {
    power: number;
    fuelType: string;
    fuelLevel: number;
  
    constructor(power: number, fuelLevel: number) {
      this.power = power;
      this.fuelType = 'Дизель';
      this.fuelLevel = fuelLevel;
    }
  
    start(): string {
      return 'Дизель запущено';
    }
  
    stop(): string {
      return 'Дизель зупинено';
    }
    increaseSpeed(): string{
        return 'Оберти збільшено'
    }
    decreaseSpeed(): string{
        return 'Оберти Зменшено'
    }
  }
  
  export class ReactiveEngine implements Engine {
    power: number;
  
    constructor(power: number) {
      this.power = power;
    }
  
    start(): string {
      return'Реактивний двигун запущено';
    }
  
    stop(): string {
      return 'Реактивний двигун зупинено';
    }
  }