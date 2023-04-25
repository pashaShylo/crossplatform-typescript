import { Diesel, ReactiveEngine } from "../../classes/lab6";

describe('Diesel class', () => {
    const dieselEngine = new Diesel(100, 50);
  
    test('should create Diesel engine with specified power and fuel level', () => {
      expect(dieselEngine.power).toBe(100);
      expect(dieselEngine.fuelType).toBe('Дизель');
      expect(dieselEngine.fuelLevel).toBe(50);
    });
  
    test('should start and stop Diesel engine', () => {
      expect(dieselEngine.start()).toBe('Дизель запущено');
      expect(dieselEngine.stop()).toBe('Дизель зупинено');
    });
  
    test('should increase and decrease Diesel engine speed', () => {
      expect(dieselEngine.increaseSpeed()).toBe('Оберти збільшено');
      expect(dieselEngine.decreaseSpeed()).toBe('Оберти Зменшено');
    });
  });
  
  describe('ReactiveEngine class', () => {
    const reactiveEngine = new ReactiveEngine(200);
  
    test('should create ReactiveEngine with specified power', () => {
      expect(reactiveEngine.power).toBe(200);
    });
  
    test('should start and stop ReactiveEngine', () => {
      expect(reactiveEngine.start()).toBe('Реактивний двигун запущено');
      expect(reactiveEngine.stop()).toBe('Реактивний двигун зупинено');
    });
  });
  