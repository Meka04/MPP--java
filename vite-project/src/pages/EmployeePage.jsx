import React, { useEffect, useState } from "react";
//import "./EmployeePageStyle.css";

const EmployeePage = ({ employeeId }) => {
  const [contests, setContests] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await fetch("http://localhost:8080/contest/all");
        const data = await response.json();
        setContests(data);
      } catch (error) {
        console.error("Error fetching contests: ", error);
      }
    };

    const fetchParticipants = async () => {
      try {
        const response = await fetch("http://localhost:8080/participant/all");
        const data = await response.json();
        setParticipants(data);
      } catch (error) {
        console.error("Error fetching contests: ", error);
      }
    };

    fetchContests();
    fetchParticipants();
  }, [employeeId]);

  return (
    <div className="employee-container">
      <div className="tables-container">
        <div className="contests-table-box">
          <h2>Contests</h2>
          <table
            className="contests-table"
            border="1"
            cellPadding="10"
            style={{ borderCollapse: "collapse", border: "1px solid white" }}
          >
            <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Number of participants</th>
                </tr>
            </thead>
            <tbody>
              {contests.map((contest) => (
                <tr key={contest.id}>
                  <td>{contest.id}</td>
                  <td>{contest.type}</td>
                  <td>{contest.participants}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="participants-table-box">
          <h2>Participants</h2>
          <table
            className="participants-table"
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
                  <th>Contests</th>
                </tr>
            </thead>
            <tbody>
              {participants.map((participant) => (
                <tr key={participant.id}>
                  <td>{participant.id}</td>
                  <td>{participant.name}</td>
                  <td>{participant.surname}</td>
                  <td>{participant.age}</td>
                  <td>
                    {participant.contests
                      ? participant.contests.map((c) => c.name).join(", ")
                      : "No contests"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="buttons-container">
        <button className="action-button">Add Contest</button>
        <button className="action-button">Add Participant</button>
      </div>
    </div>
  );
};

export default EmployeePage;
