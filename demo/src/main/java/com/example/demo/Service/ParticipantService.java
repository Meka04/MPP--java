package com.example.demo.Service;

import com.example.demo.Model.Employee;
import com.example.demo.Model.Participant;
import com.example.demo.Persistance.ParticipantRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParticipantService {
    private final ParticipantRepo participantRepo;
    @Autowired
    public ParticipantService(ParticipantRepo repo){
        this.participantRepo = repo;
    }
    public Participant createParticipant(Participant participant){
        return participantRepo.save(participant);
    }
    public Participant getParticipantById(int id){
        return participantRepo.findById(id).orElse(null);
    }
    public List<Participant> getParticipants(){
        return participantRepo.findAll();
    }
    public Participant updateParticipant(int id, Participant newParticipant){
        return participantRepo.findById(id).map(participant -> {
            participant.setAge(newParticipant.getAge());
            participant.setName(newParticipant.getName());
            participant.setSurname(newParticipant.getSurname());
            participant.setContest(newParticipant.getContest());

            return participantRepo.save(participant);
        }).orElseThrow(()->new RuntimeException("Participant not found"));
    }
    public void deleteParticipant(int id){
        participantRepo.deleteById(id);
    }
}
