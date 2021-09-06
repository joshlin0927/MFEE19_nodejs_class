class Person{
    constructor(name='noname', age = 20){
        this.name = name;
        this.age = age;
    }
    toJSON(){
        return {
            name: this.name,
            age: this.age,
        }
    }
    toString(){
        return JSON.stringify(this.toJSON(), null, 2);
                            //將內容以JSON呈現, 取代用(因為現在用不到，所以填null), 以幾行作呈現
    }
}

// 如果要匯出多個東西，就包成object
module.exports = Person;