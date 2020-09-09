const db = require("../models");

db.sequelize.sync({ force: true }).then(() => {
  hobbySeeds.forEach((item) => {
    db.Hobbies.create(item);
    console.log("hobbies created");
  });
  allergySeeds.forEach((item) => {
    db.Allergies.create(item);
    console.log("allergies created");
  });

  employeeSeeds.forEach((item) => {
    db.Employee.create(item);
    console.log("employees created");
  });
});

const employeeSeeds = [
  {
    first_name: "Sarah",
    last_name: "Kerr",
    birthday: "1993-09-24",
    email: "sarah.93@gmail.com",
    // allergyID: 1,
    // hobbyID: 3,
    hire_date: "2020-08-15",
    orientationComplete: "2020-08-20",
    compliance_trainingComplete: "2020-08-27",
    food_preference: "No Preference",
  },
  {
    first_name: "Channa",
    last_name: "Mik Carlson",
    birthday: "1992-01-09",
    email: "channa@gmail.com",
    // allergyID: 2,
    // hobbyID: 1,
    hire_date: "2019-08-01",
    orientationComplete: "2019-08-21",
    compliance_trainingComplete: "2019-09-01",
    food_preference: "Vegan",
  },
  {
    first_name: "Patrick",
    last_name: "Mahloy",
    birthday: "1993-04-05",
    email: "patrick@gmail.com",
    // allergyID: 1,
    // hobbyID: 4,
    hire_date: "2018-02-26",
    orientationComplete: "2018-03-01",
    compliance_trainingComplete: "2018-04-21",
    food_preference: "Vegetarian",
  },
  // {
  //   first_name: "Jane",
  //   last_name: "Doe",
  //   birthday: "1987-05-29",
  //   email: "jane@gmail.com",
  //   allergies: 3,
  //   hobbies: 4,
  //   hire_date: "2010-02-20",
  //   orientationComplete: "2010-02-27",
  //   compliance_trainingComplete: "2010-03-17",
  // },
  // {
  //   first_name: "John",
  //   last_name: "Smith",
  //   birthday: "1982-11-30",
  //   email: "john@gmail.com",
  //   allergies: 3,
  //   hobbies: 2,
  //   hire_date: "2008-11-29",
  //   orientationComplete: "2008-12-11",
  //   compliance_trainingComplete: "2008-12-13",
  // },
  // {
  //   first_name: "Susan",
  //   last_name: "Dee",
  //   birthday: "1985-07-31",
  //   email: "susan@gmail.com",
  //   allergies: [{ id: 1 }, { id: 4 }],
  //   hobbies: [{ id: 1 }, { id: 2 }],
  //   hire_date: "2015-07-28",
  //   orientationComplete: "2015-08-01",
  //   compliance_trainingComplete: "2015-08-05",
  // },
  // {
  //   first_name: "Ivan",
  //   last_name: "Santos",
  //   birthday: "1993-12-23",
  //   email: "ivan@gmail.com",
  //   allergies: [{ id: 1 }, { id: 3 }],
  //   hobbies: [{ id: 3 }, { id: 2 }],
  //   hire_date: "2019-07-12",
  //   orientationComplete: "2019-07-20",
  //   compliance_trainingComplete: "2019-07-30",
  // },
  // {
  //   first_name: "Chris",
  //   last_name: "Paul",
  //   birthday: "1991-09-10",
  //   email: "chris@gmail.com",
  //   allergies: [{ id: 1 }, { id: 3 }],
  //   hobbies: [{ id: 4 }, { id: 2 }],
  //   hire_date: "2018-12-20",
  //   orientationComplete: "2019-01-16",
  //   compliance_trainingComplete: "2019-02-19",
  // },
];

const hobbySeeds = [
  {
    hobby: "Reading",
    createdAt: 20200902,
    updatedAt: 20200902,
  },
  {
    hobby: "Gaming",
    createdAt: 20200902,
    updatedAt: 20200902,
  },
  {
    hobby: "Skiing",
    createdAt: 20200902,
    updatedAt: 20200902,
  },
  {
    hobby: "Painting",
    createdAt: 20200902,
    updatedAt: 20200902,
  },
];

const allergySeeds = [
  {
    allergy: "Nut",
    createdAt: 20200902,
    updatedAt: 20200902,
  },
  {
    allergy: "Soy",
    createdAt: 20200902,
    updatedAt: 20200902,
  },
  {
    allergy: "Gluten",
    createdAt: 20200902,
    updatedAt: 20200902,
  },
  {
    allergy: "Lactose",
    createdAt: 20200902,
    updatedAt: 20200902,
  },
];
