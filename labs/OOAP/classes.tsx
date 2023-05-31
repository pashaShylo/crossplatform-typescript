import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export class PaymentContext {
    private paymentStrategy: PaymentStrategy;

    constructor(paymentStrategy: PaymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    executePayment(amount: number) {
        this.paymentStrategy.pay(amount);
    }
}

export interface PaymentStrategy {
    pay(amount: number): void;
}

export class CreditCardPaymentStrategy implements PaymentStrategy {
    private cardNumber: string;

    constructor(cardNumber: string) {
        this.cardNumber = cardNumber;
    }

    pay(amount: number) {
        alert(`Paying ${amount} credits with credit card ${this.cardNumber}`);
    }
}

export class CryptocurrencyPaymentStrategy implements PaymentStrategy {
    private walletAddress: string;

    constructor(walletAddress: string) {
        this.walletAddress = walletAddress;
    }

    pay(amount: number) {
        alert(
            `Paying ${amount} credits with cryptocurrency wallet ${this.walletAddress}`
        );
    }
}

interface AuthService {
    login(username: string, password: string, arr: any): any;
}

class AuthServiceImpl implements AuthService {
    public login(username: string, password: string, arr: any): any {
        let role;
        return arr.some((elem: any) => {
            if (elem.name === username && elem.password === password) {
                role = elem.role;
                return true;
            }
        })
            ? role
            : false;
    }
}

export class AuthProxy implements AuthService {
    private authService: AuthService;
    private authenticatedUserRole: string | null;

    constructor() {
        this.authService = new AuthServiceImpl();
        this.authenticatedUserRole = null;
    }

    public login(username: string, password: string, arr: any): boolean {
        const isAuthenticated = this.authService.login(username, password, arr);

        if (isAuthenticated) {
            this.authenticatedUserRole = isAuthenticated;
            alert("Користувач успішно авторизований.");
        } else {
            alert("Невдала спроба авторизації.");
        }

        return isAuthenticated;
    }

    public getRole() {
        return this.authenticatedUserRole;
    }
}

export abstract class Product {
    public abstract getDescription(): string;
    public abstract getPrice(): number;
}

export class Box {
    private pizza: Pizza;
    private id: string;

    constructor(pizza: Pizza) {
        this.pizza = pizza;
        this.id = uuidv4();
    }

    public getId() {
        return this.id;
    }

    public getBoxType(): string {
        return `Box for ${this.pizza.getDescription()}`;
    }
}

export class BoxAdapter extends Product {
    private adaptee: Box;

    constructor(adaptee: Box) {
        super();
        this.adaptee = adaptee;
    }

    public getId() {
        return this.adaptee.getId();
    }

    public getDescription(): string {
        const result = this.adaptee.getBoxType();
        return result;
    }

    public getPrice(): number {
        const price = 0;
        return price;
    }
}

export abstract class ProductDecorator extends Product {
    protected product: Pizza | Drink;

    constructor(product: Pizza | Drink) {
        super();
        this.product = product;
    }

    public getDescription(): string {
        return this.product.getDescription();
    }

    public getPrice(): number {
        return this.product.getPrice();
    }
}
export class ExtraCheeseDecorator extends ProductDecorator {
    private extraCheesePrice: number = 15;

    constructor(product: Pizza) {
        super(product);
    }

    public getId() {
        return this.product.getId();
    }

    public getDescription(): string {
        return `${this.product.getDescription()}, Extra Cheese`;
    }

    public getPrice(): number {
        return this.product.getPrice() + this.extraCheesePrice;
    }
}
export class Pizza extends Product {
    private description: string;
    private price: number;
    private id: string;

    constructor(description: string, price: number) {
        super();
        this.id = uuidv4();
        this.description = description;
        this.price = price;
    }

    public getDescription(): string {
        return this.description;
    }

    public getId(): string {
        return this.id;
    }

    public getPrice(): number {
        return this.price;
    }
}

export class Drink extends Product {
    private description: string;
    private price: number;
    private id: string;

    constructor(description: string, price: number) {
        super();
        this.id = uuidv4();
        this.description = description;
        this.price = price;
    }

    public getDescription(): string {
        return this.description;
    }

    public getId(): string {
        return this.id;
    }

    public getPrice(): number {
        return this.price;
    }
}

export abstract class ProductFactory {
    public abstract createProduct(description: string, price: number): Product;
}

export class PizzaFactory extends ProductFactory {
    public createProduct(description: string, price: number): Pizza {
        return new Pizza(description, price);
    }
}

export class DrinkFactory extends ProductFactory {
    public createProduct(description: string, price: number): Drink {
        return new Drink(description, price);
    }
}

export class Composite extends Product {
    protected products: (Pizza | Drink)[];
    constructor() {
        super();
        this.products = [];
    }

    public setProducts(newProducts: (Pizza | Drink)[]): void {
        this.products = newProducts;
    }

    public getProducts(): (Pizza | Drink)[] {
        return this.products;
    }

    public addProduct(product: Pizza | Drink) {
        this.products.push(product);
    }

    public removeProduct(product: Pizza | Drink): void {
        let flag = false;
        this.setProducts(
            this.products.filter((elem: Pizza | Drink) => {
                if (flag) {
                    return true;
                }
                if (elem.getId() === product.getId()) {
                    flag = true;
                }
                return elem.getId() !== product.getId();
            })
        );
    }

    public getPrice(): number {
        return this.products
            .map((elem: Product) => {
                return elem.getPrice();
            })
            .reduce((summ: number, elem: number) => {
                return summ + elem;
            }, 0);
    }
    public getDescription(): string {
        return this.products
            .map((elem: Product) => {
                return elem.getDescription();
            })
            .join(", ");
    }

    public printReceipt(): void {
        console.log("Order Receipt:");
        this.products.forEach((product) => {
            console.log(`${product.getDescription()} - ${product.getPrice()}`);
        });
        console.log(`Total: ${this.getPrice()}`);
    }
}
class OrderStatus {
    private name: string;
    private nextStatus: any;
    constructor(name: string, nextStatus: any) {
        this.name = name;
        this.nextStatus = nextStatus;
    }
    public next() {
        return new this.nextStatus();
    }
}
class WaitingForPayment extends OrderStatus {
    constructor() {
        super("Чекає на оплату", Shipping);
    }
}
class Shipping extends OrderStatus {
    constructor() {
        super("В дорозі", Delivered);
    }
}
class Delivered extends OrderStatus {
    constructor() {
        super("Доставлено", Delivered);
    }
}
export class Order extends Composite {
    public orderId: string;
    public orderStatus: any;

    constructor() {
        super();
        this.orderId = uuidv4();
        this.orderStatus = new WaitingForPayment();
    }

    nextStatus() {
        this.orderStatus = this.orderStatus.next();
    }
}

export class OrderBuilder {
    private order: Order;

    constructor() {
        this.order = new Order();
    }
    public getOrder(): Order {
        return this.order;
    }
    public addProduct(product: Pizza | Drink): void {
        this.order.addProduct(product);
    }
    public removeProduct(product: Pizza | Drink): void {
        this.order.removeProduct(product);
    }

    public build(): Order {
        return this.order;
    }
}

export class Cafe {
    private static instance: Cafe;
    private orders: Order[];

    private constructor() {
        this.orders = [];
    }

    public static getInstance(): Cafe {
        if (!Cafe.instance) {
            Cafe.instance = new Cafe();
        }
        return Cafe.instance;
    }

    public placeOrder(order: Order): void {
        this.orders.push(order);
    }

    public getOrders(): Order[] {
        return this.orders;
    }
}
