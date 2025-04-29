package com.example.demo.Service;

import com.example.demo.Model.Employee;
import com.example.demo.Persistance.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    private final EmployeeRepo employeeRepo;
    @Autowired
    public EmployeeService(EmployeeRepo repo){
        this.employeeRepo = repo;
    }
    public Employee createEmployee(Employee employee){
        return employeeRepo.save(employee);
    }
    public Employee getEmployeeById(int id){
        return employeeRepo.findById(id).orElse(null);
    }
    public List<Employee> getEmployees(){
        return employeeRepo.findAll();
    }
    public Employee updateEmployee(int id, Employee newEmployee){
        return employeeRepo.findById(id).map(employee -> {
            employee.setAge(newEmployee.getAge());
            employee.setName(newEmployee.getName());
            employee.setSurname(newEmployee.getSurname());
            employee.setUserName(newEmployee.getUserName());
            employee.setPassword(newEmployee.getPassword());
            return employeeRepo.save(employee);
                }
        ).orElseThrow(()->new RuntimeException("Employee not found"));
    }

    public void deleteEmployee(int id){
        employeeRepo.deleteById(id);
    }
}
