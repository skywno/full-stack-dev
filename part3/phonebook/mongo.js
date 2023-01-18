const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    mongoose.connect(url)
        .then(() => findAllPeople())

} else if (process.argv.length === 5) {
    console.log(process.argv.forEach(arg => console.log(arg)))
    personName = process.argv[3]
    personNumber = process.argv[4]

    mongoose.connect(url)
        .then((result) => {
            return addPerson(personName, personNumber)
        }).then(() => {
            console.log(`added ${personName} number ${personNumber} to phonebook`)
            mongoose.connection.close()
        }).catch(error => {
            console.log(error)
        })
}

function findAllPeople() {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

function addPerson(name, number) {
    const person = new Person({
        name: name,
        number: number
    })
    return person.save()
}
