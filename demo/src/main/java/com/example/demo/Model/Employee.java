package com.example.demo.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "employee")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String surname;
    private int age;
    private String username;
    private String password;

    public Employee(){}

    public Employee(String employeeName, String employeeSurname, int age, String employeeUserName, String employeePassword) {
        this.name = employeeName;
        this.surname = employeeSurname;
        this.age = age;
        this.username = employeeUserName;
        this.password = employeePassword;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getUserName() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setName(String employeeName) {
        this.name = employeeName;
    }

    public void setSurname(String employeeSurname) {
        this.surname = employeeSurname;
    }
    public int getAge(){return this.age;}
    public void setAge(int newAge){this.age = newAge;}
    public void setUserName(String employeeUserName) {
        this.username = employeeUserName;
    }

    public void setPassword(String employeePassword) {
        this.password = employeePassword;
    }
    public int getId(){return this.id;}
    public void setId(int id){this.id = id;}



    @Override
    public String toString() {
        return "Employee{" +
                "name='" + this.name + '\'' +
                ", surname='" + this.surname + '\'' +
                ", age=" + this.age +
                ", id=" + this.id +
                '}';
    }
}
