var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//connect to your MongoDb Atlas Database
mongoose.connect("mongodb+srv://oafc:EweXWr2PQE14m3uK@databasepractice.e3uyu0n.mongodb.net/test?retryWrites=true&w=majority")

//Define the Employee schema
var employeeSchema = new Schema({
    employeeNum: Number,
    firstName: String,
    lastName: String,
    email: String,
    SSN: String,
    addressStreet: String,
    addressCity: String,
    addressState: String,
    addressPostal: String,
    maritalStatus: String,
    isManager: Boolean,
    employeeManagerNum: Number,
    status: String,
    hireDate: String,
    department: Number,
});

//Define the Department schema
var departmentSchema = new Schema({
    departmentId: Number,
    departmentName: String,
});


var Employee = mongoose.model("employees", employeeSchema);
//create a new employee
var PeterParker = new Employee({
    employeeNum: 1,
    firstName: "Peter",
    lastName: "Parker",
    email: "peterparker@mcu.com",
    SSN: "123-12-1234",
    addressStreet: "1234 Marvel Ave",
    addressCity: "New York City",
    addressState: "New York",
    addressPostal: "10001",
    maritalStatus: "Single",
    isManager: false,
    employeeManagerNum: 1,
    status: "Full Time",
    hireDate: "April 11, 2023",
});

var Department = mongoose.model("departments", departmentSchema);
//create a new department
var Flyers = new Department({
    departmentId: 1,
    departmentName: "Flyers",
});
module.exports.getAllEmployees = function(){
    return new Promise(function (resolve, reject){
        Employee.find({})
        .exec()
        .then(function (data){
            console.log(data + "findData");
            data = data.map((value) => value.toObject());
            resolve(data);
    }).catch((err) => {
        reject("Query returned 0 results"); return;
    });
});
}
module.exports.addEmployee = function (employeeData) {
    return new Promise(function (resolve, reject){
      employeeData.employeeNum = Math.floor(Math.random() * 10000);
      console.log(employeeData);
      employeeData.isManager = (employeeData.isManager) ? true : false;
    for (var prop in employeeData) {
        if(employeeData[prop] == '')
            employeeData[prop] = null;
    }
    
    Employee.create(employeeData).then(() => {
        resolve();
    }).catch((err) =>{
        reject("Unable to create employee"); return;
        });  
    });

};

module.exports.getEmployeeByNum = function (num) {
    return new Promise(function (resolve, reject){
        Employee.find({
            employeeNum: num
        })
        .exec()
        .then(function (data){
            data = data.map((value) => value.toObject());
            resolve(data[0]);
        }).catch(() => {
            reject("Query returned 0 results"); return;
        });
    });
};

module.exports.getEmployeesByStatus = function (status) {
    return new Promise(function (resolve, reject){
        Employee.find({
            status: status
    })
    .exec()
    .then(function (data){
        data = data.map((value) => value.toObject());
        resolve(data);
    }).catch(() => {
        reject("Query returned 0 results"); return;
    });
});
};


module.exports.getEmployeesByDepartment = function (department) {
    return new Promise(function (resolve, reject){
        Employee.find({
            department: department
            
        })
        .exec()
        .then(function (data) {
            data = data.map((value) => value.toObject());
            resolve(data);
        }).catch(() => {
            reject("Query returned 0 results"); return;
        });
    });
};

module.exports.getEmployeesByManager = function (manager) {
    return new Promise(function (resolve, reject){
        Employee.find({
            employeeManagerNum: manager
            
        })
        .exec()
        .then(function (data) {
            data = data.map((value) => value.toObject());
            resolve(data);
        }).catch(() => {
            reject("Query returned 0 results"); return;
        });
    });
};

module.exports.getManagers = function () {
    return new Promise(function (resolve, reject){
        reject();
    });
};

module.exports.getDepartments = function(){
   return new Promise(function (resolve, reject){
        Department.find({})
        .exec()
        .then(function (data) {
            data = data.map((value) => value.toObject());
            console.log(data);
            resolve(data);
        }).catch((err) => {
            reject("Query returned 0 results"); return;
        });
    });
}
module.exports.updateEmployee = function (employeeData) {
    return new Promise(function (resolve, reject){
        
        employeeData.isManager = (employeeData.isManager) ? true : false;

        for (var prop in employeeData) {
            if (employeeData[prop] == '')
                employeeData[prop] = null;
        }
            Employee.updateOne({
                employeeNum: employeeData.employeeNum 
    }).exec()
    .then(() => {
        resolve();
    }).catch((e) => {
        reject("Unable to update employee"); return;
    });
});
};

module.exports.addDepartment = function (departmentData) {
    return new Promise(function (resolve, reject){
        departmentData.departmentId = Math.floor(Math.random() * 10000);
        for (var prop in departmentData) {
            if (departmentData[prop] == '')
                departmentData[prop] = null;
        }
            Department.create(departmentData).then(() => {
                resolve();
            }).catch((e) => {
                reject("Unable to create department"); return;
        });
    });
};

module.exports.updateDepartment = function (departmentData) {
    return new Promise(function (resolve, reject){
        console.log(departmentData);
            Department.updateOne({departmentId: departmentData.departmentId}, {$set :{departmentName: departmentData.departmentName}}).exec();
                
                resolve("Updated department");
                
                })};

module.exports.getDepartmentById = function (id) {
    return new Promise(function (resolve, reject){
        Department.find({ 
                departmentId: id 
        })
        .exec()
        .then(function (data) {
            data = data.map((value) => value.toObject());
            resolve(data[0]);
        }).catch(() => {
            reject("Query returned 0 results"); return;
        });
    });
};

module.exports.deleteEmployeeByNum = function (empNum) {
    return new Promise(function (resolve, reject){
        Employee.deleteOne({
                employeeNum: empNum
        })
        .exec()
        .then(function () {
            resolve("Department deleted successfully");
        }).catch((err) => {
            reject("Unable to delete employee"); return;
        });
    });
};

module.exports.deleteDepartmentById = function (depId) {
    return new Promise(function (resolve, reject){Department.deleteOne({departmentId: depId }) // can also use deleteMany to delete multiple documents 
    .exec()
    .then(() => {
        resolve("Deleted successfully");
        //removed company
        console.log("removed department");
    })
    .catch((err) => {
        console.log(err);
    });
});
};