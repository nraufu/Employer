import employeeDb from '../models/employeeDb';
import responseHandler from '../helpers/response';
import sendMail from '../helpers/sendMail';

const employee = {
    addEmployee(req, res) {
        try {
            const { name, national_id, phoneNumber, email, date_of_birth, status, position } = req.body;
            const employee = employeeDb.find((element) => element.email === email || element.national_id === national_id || element.phoneNumber === phoneNumber);
            if(employee) return responseHandler(res, 409, {Error: "an Employee with the same email,phoneNumber or national Id already exists"})
            const newEmployee = {
                id: employeeDb.length + 1,
                name: name,
                national_id: national_id,
                phoneNumber: phoneNumber,
                email: email,
                date_of_birth: date_of_birth,
                status: status,
                position: position
            }
            employeeDb.push(newEmployee);
            sendMail(newEmployee.name, newEmployee.email, newEmployee.position);
            responseHandler(res, 201, { "Success": "Employee created", newEmployee});
        } catch (error) {
            responseHandler(res, 500, { "Error": error })
            console.log(error);
        }
    },

    editEmployee(req, res) {
        try {
            const employeeId = employeeDb.find((element) => element.id === Number(req.params.id));
            if(!employeeId) return responseHandler(res, 404, {Error: "Employee Doesn't exist"});
            const foundEmployee = {...employeeDb[employeeId]};
            employeeDb[employeeId] = {...foundEmployee, ...req.body};
            return responseHandler(res, 200, {Success: "employee successfully edited", updateInfo: employeeDb[employeeId]});
        } catch (error) {
            responseHandler(res, 500, {Error: error})
        }
    }
}

export default employee