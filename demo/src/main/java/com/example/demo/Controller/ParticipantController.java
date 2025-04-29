package com.example.demo.Controller;

import com.example.demo.Model.Participant;
import com.example.demo.Service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/participant")
@CrossOrigin
public class ParticipantController {
    private final ParticipantService participantService;

    @Autowired
    public ParticipantController(ParticipantService service){
        this.participantService = service;
    }
    @PostMapping("/add")
    public Participant createParticipant(@RequestBody Participant participant){
        return participantService.createParticipant(participant);
    }
    @GetMapping("/{id}")
    public Participant getParticipantById(@PathVariable int id){
        return participantService.getParticipantById(id);
    }
    @PutMapping("/update/{id}")
    public Participant updateParticipant(@PathVariable int id, @RequestBody Participant participant) {
        return participantService.updateParticipant(id,participant);
    }
    @GetMapping("/all")
    public List<Participant> getParticipants(){
        //System.out.println("TEST");
        return participantService.getParticipants();
    }
    @DeleteMapping("/delete/{id}")
    public void deleteParticipant(@PathVariable int id){
        participantService.deleteParticipant(id);
    }
}
