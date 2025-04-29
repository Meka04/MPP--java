package com.example.demo.Service;

import com.example.demo.Model.Contest;
import com.example.demo.Persistance.ContestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContestService {
    private final ContestRepo contestRepo;

    @Autowired
    public ContestService(ContestRepo repo){
        this.contestRepo = repo;
    }
    public Contest createContest(Contest contest){
        return contestRepo.save(contest);
    }
    public List<Contest> getContestByType(String type){
        return contestRepo.findByType(type);
    }
    public List<Contest> getContests(){
        return contestRepo.findAll();
    }
    public Contest updateContest(int id, Contest newContest){
        return contestRepo.findById(id).map(contest -> {
            contest.setType(newContest.getType());
            contest.setParticipants(newContest.getParticipants());
            return contestRepo.save(contest);
        }).orElseThrow(()->new RuntimeException("Contest not found"));
    }
    public void deleteContest(int id){
        contestRepo.deleteById(id);
    }
}
