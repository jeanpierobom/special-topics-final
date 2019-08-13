import { gql } from 'apollo-server'
import { find, remove } from 'lodash'

const ownerlist = [
  {
    id: '1',
    firstname: 'Steve',
    lastname: 'Jobs'
  },
  {
    id: '2',
    firstname: 'Elon',
    lastname: 'Musk'
  },
  {
    id: '3',
    firstname: 'Jeff',
    lastname: 'Bezos'
  }
]

const carlist = [
  {
    id: '1',
    year: '2019',
    make: 'Toyota',
    model: 'Supra',
    price: '60000',
    ownerId: '1'
  },
  {
    id: '2',
    year: '2003',
    make: 'Honda',
    model: 'Civic',
    price: '30000',
    ownerId: '1'
  },
  {
    id: '3',
    year: '1996',
    make: 'Toyota',
    model: '4Runner',
    price: '40000',
    ownerId: '1'
  },
  {
    id: '4',
    year: '2015',
    make: 'Tesla',
    model: 'Model 3',
    price: '50000',
    ownerId: '2'
  },
  {
    id: '5',
    year: '2013',
    make: 'Tesla',
    model: 'Model S',
    price: '900000',
    ownerId: '2'
  },
  {
    id: '6',
    year: '2014',
    make: 'Tesla',
    model: 'Model X',
    price: '100000',
    ownerId: '2'
  },
  {
    id: '7',
    year: '2014',
    make: 'McLaren ',
    model: 'F1',
    price: '33000000',
    ownerId: '3'
  },
  {
    id: '8',
    year: '2005',
    make: 'Lexus',
    model: 'LFA',
    price: '495000',
    ownerId: '3'
  },
  {
    id: '9',
    year: '2012',
    make: 'Mercedes',
    model: 'GLK',
    price: '800000',
    ownerId: '3'
  }
]

const typeDefs = gql`
  type Owner {
    id: String!
    firstname: String
    lastname: String
  }

  type Query {
    ownerlist: [Owner],
    carlist: [Car]
  }

  type Mutation {
    addOwner(id: String!, firstname: String!, lastname: String!): Owner
    addCar(id: String!, year: String!, make: String!, model: String!, price: String!, ownerId: String!): Car
    updateOwner(id: String!, firstname: String!, lastname: String!): Owner
    updateCar(id: String!, year: String!, make: String!, model: String!, price: String!, ownerId: String!): Car
    removeOwner(id: String!): Owner
  }

  type Car {
    id: String!
    year: String
    make: String
    model: String
    price: String
    ownerId: String
  }
`

const resolvers = {
  Query: {
    ownerlist: () => ownerlist,
    carlist: () => carlist
  },
  Mutation: {
    addOwner: (root, args) => {
      const newOwner = {
        id: args.id,
        firstname: args.firstname,
        lastname: args.lastname
      }
      ownerlist.push(newOwner)
      return newOwner
    },
    addCar: (root, args) => {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        ownerId: args.ownerId,
      }
      carlist.push(newCar)
      return newCar
    },
    updateOwner: (root, args) => {
      const owner = find(ownerlist, { id: args.id })
      if (!owner) {
        throw new Error(`Couldn't find owner with id ${args.id}`)
      }

      owner.firstname = args.firstname
      owner.lastname = args.lastname
      return owner
    },
    updateCar: (root, args) => {
      const car = find(carlist, { id: args.id })
      if (!car) {
        throw new Error(`Couldn't find car with id ${args.id}`)
      }

      car.year = args.year
      car.make = args.make
      car.model = args.model
      car.price = args.price
      car.ownerId = args.ownerId
      return car
    },
    removeOwner: (root, args) => {
      const removedOwner = find(ownerlist, { id: args.id })
      if (!removedOwner) {
        throw new Error(`Couldn't find owner with id ${args.id}`)
      }
      remove(ownerlist, o => { return o.id === removedOwner.id })
      return removedOwner
    }
  }
}

export { typeDefs, resolvers }