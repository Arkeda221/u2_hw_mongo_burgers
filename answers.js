// create 5 burgers (at least 3 should be beef)
BobsBurgers >
  db.burgers.insertMany([
    {
      protein: 'Beef',
      cheese: 'yes',
      toppings: ['ketchup', 'mustard', 'onions', 'tomatoes', 'lettuce']
    },
    {
      protein: 'Chicken',
      cheese: 'no',
      toppings: ['hot sauce', 'lettuce', 'pickles']
    },
    {
      protein: 'Buffalo',
      cheese: 'yes',
      toppings: ['caramelized onions', 'fries', 'BBQ sauce']
    },
    {
      protein: 'Beef',
      cheese: 'yes',
      toppings: ['pickles', 'lettuce', 'tomatoes']
    },
    {
      protein: 'Turkey',
      cheese: 'no',
      toppings: ['lettuce', 'ketchup', 'onions']
    }
  ])

// find all the burgers

db.burgers.find({})

// show just the meat of each burger

db.burgers.find({}, { protein: 1 })

// show just the toppings of each burger

db.burgers.find({}, { toppings: 1 })

// show everything but the cheese

db.burgers.find({}, { protein: 1, toppings: 1 })

// find all the burgers with beef

db.burgers.find({ protein: 'Beef' })

// find all the burgers that are not beef

db.burgers.find({ protein: { $ne: 'Beef' } })

// find the first burger with cheese

db.burgers.findOne({ cheese: 'yes' })

// find one and update the first burger with cheese to have a property of 'double cheese'

db.burgers.updateOne(
  { cheese: 'yes' },
  { $set: { cheese: 'double' }, $currentDate: { lastModified: true } }
)

// find the burger you updated to have double cheese

db.burgers.find({ cheese: 'double' })

// find and update all the beef burgers to be 'veggie'

db.burgers.updateMany(
  { protein: 'Beef' },
  { $set: { protein: 'Veggie' }, $currentDate: { lastModified: true } }
)

// delete one of your veggie burgers
// WRONG - dELETES ALL : db.burger.remove({meat: 'veggie'})

db.burgers.deleteOne({ protein: 'Veggie' })

// drop the collection
//Expected Output
//true

db.burgers.drop()

// drop the database
//Expected Output
// {
//   "dropped": "burgers",
//   "ok": 1
// }

db.dropDatabase()

//
// Bonus
//recreate your burgers database and your burger collection
//copy paste your insert burgers from above to reseed your database

db.burgers.insertMany([
  {
    protein: 'Beef',
    cheese: 'yes',
    toppings: ['ketchup', 'mustard', 'onions', 'tomatoes', 'lettuce']
  },
  {
    protein: 'Chicken',
    cheese: 'no',
    toppings: ['hot sauce', 'lettuce', 'pickles']
  },
  {
    protein: 'Buffalo',
    cheese: 'yes',
    toppings: ['caramelized onions', 'fries', 'BBQ sauce']
  },
  {
    protein: 'Beef',
    cheese: 'yes',
    toppings: ['pickles', 'lettuce', 'tomatoes']
  },
  {
    protein: 'Turkey',
    cheese: 'no',
    toppings: ['lettuce', 'ketchup', 'onions']
  }
])

// Change the name of the key cheese to 'pumpkinSpice'

db.burgers.updateMany(
  {},
  { $rename: { cheese: 'pumpkinSpice' }, $currentDate: { lastModified: true } }
)

// find all the burgers with ketchup (or another topping you used at least once)

db.burgers.find({ toppings: 'ketchup' })

// find all the burgers with pickles (or a topping you used more than once) and remove the pickles

db.burgers.updateMany({ toppings: 'pickles' }, { $set: { 'toppings.$': '' } })

// add a topping of 'eggs' to all the beef burgers
//note since this db is 'reset' there should be no veggie burgers, all beef burgers should still be intact

db.burgers.updateMany({ protein: 'Beef' }, { $push: { toppings: 'eggs' } })

//Add a price to each burger, start with $5.00 for each burger

db.burgers.updateMany({}, { $set: { price: '$5.00' } })
