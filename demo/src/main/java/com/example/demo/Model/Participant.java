package com.example.demo.Model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "participant")
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String name;
    String surname;
    int age;
    @ManyToOne
    @JoinColumn(name = "contestid")
    Contest contestId;

    public Participant(String name, String surname, int age, Contest con) {
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.contestId= con;
    }
    public Participant() {}


    public String getName() { return this.name; }
    public String getSurname() { return this.surname; }
    public int getAge() { return age; }
    public Contest getContest() { return this.contestId; }
    public int getId() { return this.id; }
    public void setName(String name) {this.name = name; }
    public void setSurname(String surname) { this.surname = surname; }
    public void setAge(int age) { this.age = age; }
    public void setContest(Contest con) {this.contestId = con;}
    public void setId(int id) {this.id = id;}


    @Override
    public String toString() {
        return "Kid{" +
                "name='" + this.name + '\'' +
                ", surname='" + this.surname + '\'' +
                ", age=" + this.age +
                ", id=" + this.contestId +
                '}';
    }
}
