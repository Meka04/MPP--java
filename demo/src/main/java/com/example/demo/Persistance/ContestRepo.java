package com.example.demo.Persistance;

import com.example.demo.Model.Contest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContestRepo extends JpaRepository<Contest,Integer> {
    List<Contest> findByType(String type);
}
