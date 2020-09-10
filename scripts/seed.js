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
    first_name: "Kevin",
    last_name: "Garcia",
    birthday: "1993-09-24",
    email: "kevin@gmail.com",
    hire_date: "2020-08-15",
    orientationComplete: "2020-08-20",
    compliance_trainingComplete: "2020-08-27",
    food_preference: "No Preference",
  },
  {
    first_name: "Rachel",
    last_name: "Shelton",
    birthday: "1992-01-09",
    email: "rachel@gmail.com",
    hire_date: "2019-08-01",
    orientationComplete: "2019-08-21",
    compliance_trainingComplete: "2019-09-01",
    food_preference: "Vegan",
  },
  {
    first_name: "Tyler",
    last_name: "Davis",
    birthday: "1993-04-05",
    email: "tyler@gmail.com",
    hire_date: "2018-02-26",
    orientationComplete: "2018-03-01",
    compliance_trainingComplete: "2018-04-21",
    food_preference: "Vegetarian",
  },
  {
    first_name: "Jane",
    last_name: "Doe",
    birthday: "1987-09-29",
    email: "jane@gmail.com",
    hire_date: "2010-09-10",
    orientationComplete: "1900-01-01",
    compliance_trainingComplete: "2010-09-11",
    food_preference: "Vegan",
  },
  {
    first_name: "John",
    last_name: "Smith",
    birthday: "1982-11-30",
    email: "john@gmail.com",
    hire_date: "2008-11-29",
    orientationComplete: "2008-12-11",
    compliance_trainingComplete: "2008-12-13",
    food_preference: "No Preference",
  },
  {
    first_name: "Susan",
    last_name: "Dee",
    birthday: "1985-07-31",
    email: "susan@gmail.com",
    hire_date: "2020-08-30",
    orientationComplete: "2020-09-05",
    compliance_trainingComplete: "1900-01-01",
    food_preference: "Vegan",
  },
  {
    first_name: "Ivan",
    last_name: "Santos",
    birthday: "1993-12-23",
    email: "ivan@gmail.com",
    hire_date: "2019-07-12",
    orientationComplete: "2019-07-20",
    compliance_trainingComplete: "2019-07-30",
    food_preference: "No Preference",
  },
  {
    first_name: "Christie",
    last_name: "Jones",
    birthday: "1991-09-18",
    email: "christie@gmail.com",
    hire_date: "2018-12-20",
    orientationComplete: "2019-01-16",
    compliance_trainingComplete: "2019-02-19",
    food_preference: "Vegetarian",
  },
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
