import React, { useEffect, useState } from "react";

const AllEmployees = ({ employeeId }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/employee/all");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching contests: ", error);
      }
    };
    fetchEmployees();
  }, [employeeId]);

  return (
    <div className="contests-table-box">
      <h2>Employees</h2>
      <table
        className="employees-table"
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", border: "1px solid white" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.surname}</td>
              <td>{employee.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllEmployees;
