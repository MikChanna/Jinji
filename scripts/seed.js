const db = require("../models");

db.sequelize.sync({ force: true }).then(() => {
  employeeSeeds.forEach((item) => {
    db.Employee.create(item);
  });
});


// // will add in when we know what the seed data would look like for this 
// db.sequelize.sync({force:true}).then(()=>{ 
//     allergySeeds.forEach((item)=>{ 
//         db.Allergies.create(item); 
//     })
// })

// // will add in when we know what the see data would look like for this 
// db.sequelize.sync({force:true}).then(()=>{ 
//     hobbySeeds.forEach((item)=>{ 
//         db.Hobbies.create(item); 
//     })
// })

const employeeSeeds = [
    {
        first_name: "Sarah",
        last_name: "Kerr",
        birthday: "1993-09-24",
        email: "sarah.93@gmail.com",
        hire_date: "2020-08-15"
        orientation: "2020-08-20",
        compliance_training: "2020-08-27"
    }, 
    {
        first_name: "Channa",
        last_name: "Mik Carlson",
        birthday: "1992-01-09",
        email: "channa@gmail.com",
        hire_date: "2019-08-01",
        orientation: "2019-08-21",
        compliance_training: "2019-09-01"
    },
    {
        first_name: "Patrick",
        last_name: "Mahloy",
        birthday: "1993-04-05",
        email: "patrick@gmail.com",
        hire_date: "2018-02-26",
        orientation: "2018-03-01",
        compliance_training: "2018-04-21",
    }, 
    { 
        first_name: "Jane",
        last_name: "Doe",
        birthday: "1987-05-29",
        email: "jane@gmail.com",
        hire_date: "2010-02-20",
        orientation: "2010-02-27",
        compliance_training: "2010-03-17",
    }, 
    {
        first_name: "John",
        last_name: "Smith",
        birthday: "1982-11-30",
        email: "john@gmail.com",
        hire_date: "2008-11-29", 
        orientation: "2008-12-11",
        compliance_training: "2008-12-13"
    }, 
    {
        first_name: "Susan",
        last_name: "Dee",
        birthday: "1985-07-31",
        email: "susan@gmail.com",
        hire_date: "2015-07-28", 
        orientation: "2015-08-01",
        compliance_training: "2015-08-05"
    }, 
    { 
        first_name: "Ivan",
        last_name: "Santos",
        birthday: "1993-12-23",
        email: "ivan@gmail.com",
        hire_date: "2019-07-12",
        orientation: "2019-07-20",
        compliance_training: "2019-07-30",
    }, 
    { 
        first_name: "Chris",
        last_name: "Paul",
        birthday: "1991-09-10",
        email: "chris@gmail.com",
        hire_date: "2018-12-20", 
        orientation: "2019-01-16",
        compliance_training: "2019-02-19",
    }
]; 

// const allergySeeds= []; 
// const hobbySeeds = []; 