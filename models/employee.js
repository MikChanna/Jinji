module.exports = function(sequelize, DataTypes) {
  const Employee = sequelize.define("Employee", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2],
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2],
      },
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5],
      },
    },
    hire_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    orientationComplete: {
      type: DataTypes.DATEONLY,
    },
    compliance_trainingComplete: {
      type: DataTypes.DATEONLY,
    },
  });

  const Hobbies = sequelize.define("Hobbies", {
    hobby: {
      type: DataTypes.STRING,
    },
  });

  const Allergies = sequelize.define("Allergies", {
    allergy: {
      type: DataTypes.STRING,
    },
  });

  const Position = sequelize.define("Position", {
    position: {
      type: DataTypes.STRING,
    },
  });

  const Skills = sequelize.define("Skills", {
    skill: {
      type: DataTypes.STRING,
    },
  });

  Employee.bulkCreate([
    {first_name: 'Sarah', last_name: 'Kerr', birthday: '1993-09-24', email: 'sarah.93@gmail.com', orientation: '2020-08-20', compliance_training:'2020-08-27'},
    {first_name: 'Channa', last_name: 'Mik Carlson', birthday: '1992-01-09', email: 'channa@gmail.com', orientation: '2019-08-21', compliance_training:'2019-09-01'},
    {first_name: 'Patrick', last_name: 'Mahloy', birthday: '1993-04-05', email: 'patrick@gmail.com', orientation: '2018-03-01',compliance_training:'2018-04-21'}, 
    {first_name: 'Jane', last_name: 'Doe', birthday:'1987-05-29', email: 'jane@gmail.com', orientation:'2010-02-27', compliance_training: '2010-03-17'}, 
    {first_name: 'John', last_name:'Smith', birthday:'1982-11-30', email:'john@gmail.com', orientation: '2008-12-11', compliance_training: '2008-12-13'},
    {first_name: 'Susan', last_name: 'Dee', birthday: '1985-07-31', email:'susan@gmail.com', orientation: '2015-08-01', compliance_training:'2015-08-05'},
    {first_name: 'Ivan', last_name: 'Santos', birthday:'1993-12-23', email: 'ivan@gmail.com', orientation: '2019-07-20', compliance_training: '2019-07-30'},
    {first_name: 'Bridget', last_name:'Jones', birthday:'1970-04-20', email: 'bridget@gmail.com', orientation:'2000-04-02', compliance_training:'2000-04-05'},
    {first_name: 'Chris', last_name:'Paul', birthday:'1991-09-10', email: 'chris@gmail.com', orientation: '2019-01-16', compliance_training:'2019-02-19'},
    {first_name:'Brand', last_name: 'New', birthday:'1995-10-01', email:'brand@gmail.com', orientation:'2020-08-29'} 
  ]).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
    return Employee.findAll();
  }).then(employees => {
    console.log(employees); // ... in order to get the array of employees
  });


  
};
