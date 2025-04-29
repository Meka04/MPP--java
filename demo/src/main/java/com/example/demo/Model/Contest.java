package com.example.demo.Model;

import jakarta.persistence.*;

import java.util.Arrays;

@Entity
@Table(name = "contest")
public class Contest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String type;
    private int participants;

    protected Contest() {
    }

    public Contest(String type, int participants){
        this.type = type;
        this.participants = participants;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getParticipants(){return this.participants;}
    public String getType(){return this.type;}

    public void setParticipants(int newNumber){
        if(newNumber>=0)
            this.participants = newNumber;
    }
    public void setType(String newType){
        String []types = {"drawing","treasure hunt","poetry","Drawing","Treasure hunt","Poetry","Treasure Hunt"};
        boolean ok = Arrays.asList(types).contains(newType);
        if(ok)
            this.type = newType;
    }

    public String toString(){
        return "Contest: "+ this.type +"\n Participants: "+this.participants;
    }
}
