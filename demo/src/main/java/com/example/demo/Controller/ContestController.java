package com.example.demo.Controller;

import com.example.demo.Model.Contest;
import com.example.demo.Service.ContestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contest")
@CrossOrigin
public class ContestController {
    private final ContestService contestService;

    @Autowired
    public ContestController(ContestService service){
        this.contestService = service;
    }
    @PostMapping
    public Contest createContest(@RequestBody Contest contest){
        return contestService.createContest(contest);
    }
    @GetMapping("/{type}")
    public List<Contest> getContestByType(@PathVariable String type){
        return contestService.getContestByType(type);
    }
    @GetMapping("/all")
    public List<Contest> getContests(){
        //System.out.println("TEST 2");
        return contestService.getContests();
    }
    @PutMapping("/update/{id}")
    public Contest updateContest(@PathVariable int id, @RequestBody Contest contest){
        return contestService.updateContest(id,contest);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteContest(@PathVariable int id){
        contestService.deleteContest(id);
    }
}
