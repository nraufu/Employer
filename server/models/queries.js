const queries = {
    insertManager : 'INSERT INTO manager (name, email, national_id, phoneNumber, date_of_birth, password) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',

    getManager : 'SELECT * FROM manager WHERE email=$1',

    managerAlreadyExist: 'SELECT * FROM manager WHERE email=$1 OR national_id=$2 OR phoneNumber=$3',

    employeeAlreadyExist: 'SELECT * FROM employees WHERE email=$1 OR national_id=$2 OR phoneNumber=$3',

    addEmployee: 'INSERT INTO employees(managerid, name, email, national_id, phoneNumber, date_of_birth, position) VALUES ((SELECT id FROM manager WHERE email=$1),$2,$3,$4,$5,$6,$7) RETURNING *',

    getEmployee: 'SELECT employees.name, employees.email, employees.national_id, employees.phoneNumber, employees.date_of_birth, employees.status, employees.position FROM employees INNER JOIN manager ON employees.managerid = manager.id WHERE manager.email=$1 AND employees.id=$2',

    searchEmployee: 'SELECT * FROM employees WHERE "position" IN ($1) OR "name" IN ($2) OR "email" IN ($3) OR "phonenumber" IN ($4)',

    editEmployee: 'UPDATE employees SET name=$1, email=$2,  national_id=$3, phoneNumber=$4, date_of_birth=$5, position=$6 FROM manager WHERE employees.managerid=manager.id AND manager.email=$7 AND employees.id=$8 RETURNING employees.id, employees.name, employees.email, employees.national_id, employees.phoneNumber, employees.position',

    deleteEmployee: 'DELETE FROM employees USING manager WHERE employees.managerid = manager.id AND manager.email=$1 AND employees.managerid=$2',

    activateEmployee: 'UPDATE employees SET status=$3 FROM manager WHERE employees.managerid=manager.id AND manager.email=$1 AND employees.id=$2 RETURNING employees.id, employees.name, employees.email, employees.status, employees.position',

    suspendEmployee: 'UPDATE employees SET status=$3 FROM manager WHERE employees.managerid=manager.id AND manager.email=$1 AND employees.id=$2 RETURNING employees.id, employees.name, employees.email, employees.status, employees.position'
}

export default queries;