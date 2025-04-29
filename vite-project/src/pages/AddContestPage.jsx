import React, { useEffect, useState } from "react";

const AddContestPage = () => {
  const [contests, setContests] = useState([]);

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

    fetchContests();
  });

  return (
    <div className="page-container">
      <div className="table-container">
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
        <div className="textfield-container">
          <form>
            <label for="type">Type</label>
            <input type="text" id="type" name="Type"></input>
            <br></br>
            <label for="participants">Number of participants</label>
            <input type="text" id="participants" name="Participants"></input>
            <br></br>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContestPage;
