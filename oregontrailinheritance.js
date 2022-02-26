class Traveler {
    constructor(name) {
        this._name = name;
        this._food = 1;
        this._isHealthy = true;
    }

    // Getters and Setters

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name
    }

    get food() {
        return this._food
    }

    set food(food) {
        this._food = food
    }

    get isHealthy() {
        return this._isHealthy
    }

    set isHealthy(isHealthy) {
        this._isHealthy = isHealthy
    }



    hunt() {
        this.food += 2;
    }

    eat() {
        if (this.food > 0) {
            this.food -= 1;
            this.isHealthy = true;
        } else {
            this.isHealthy = false;
        }
    }
}

class Hunter extends Traveler {
    constructor(name) {
        super(name)
        this._food = 2;
        this._isHealthy = true
    }


    hunt() {
        this.food += 5;
    }

    eat() {
        if (this.food >= 2) {
            this.food -= 2;
            this.isHealthy = true;
        } else {
            this.food = 0
            this.isHealthy = false;
        }
    }

    giveFood(traveler, giveFood) {
        if (giveFood <= this.food) {
            traveler.food += giveFood
            this.food -= giveFood
        }
    }

}

class Doctor extends Traveler {
    constructor(name) {
        super(name)
    }

    heal(traveler) {
        traveler.isHealthy = true
    }
}


class Wagon {
    constructor(capacity) {
        this._capacity = capacity;
        this._passengers = [];
    }

    // Getters and Setters

    get capacity() {
        return this._capacity;
    }

    set capacity(capacity) {
        this._capacity = capacity
    }

    get passengers() {
        return this._passengers
    }

    set passengers(passengers) {
        this._passengers = passengers
    }





    //===================

    getAvailableSeatCount() {
        if (this.passengers.length < this._capacity) {
            return this._capacity - this.passengers.length;
        } else {
            return 0;
        }

    }

    join(traveler) {
        if (this.getAvailableSeatCount() > 0) {
            this.passengers.push(traveler);
        }
    }

    shouldQuarantine() {
        for (let i = 0; i < this.passengers.length; i++) {
            const element = this.passengers[i];
            if (!element.isHealthy) {
                return true
            }
        }
        return false;
    }

    totalFood() {
        let total = 0;
        for (let i = 0; i < this.passengers.length; i++) {
            const element = this.passengers[i];
            total += element.food;
        }
        return total;
    }
}


//================



// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');

console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);

wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);

sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();

console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);

henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)

console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);

drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);

sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente

console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);
