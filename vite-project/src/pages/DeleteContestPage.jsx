import { useEffect, useState } from "react";

const DeleteContestPage = () => {
     const [contests, setContests] = useState([]);
     const [formData,setFormData] = useState({
        id: ""
     })
      useEffect(() => {
        const fetchParticipants = async () => {
          try {
            const response = await fetch("http://localhost:8080/contest/all");
            const data = await response.json();
            setContests(data);
          } catch (error) {
            console.error("Error fetching contests: ", error);
          }
        };
    
        fetchParticipants();
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`http://localhost:8080/contest/delete/${formData.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            alert("Contest deleted successfully!");
            setFormData({ name: "", surname: "", age: "", contestid: "" });
    
            // Optionally refresh participants
            const data = await fetch("http://localhost:8080/contest/all").then(
              (res) => res.json()
            );
            setContests(data);
          } else {
            console.error("Failed to delete contest");
          }
        } catch (error) {
          console.error("Error deleting contest: ", error);
        }
      };
    
      return (
        <div className="page-container">
          <div className="table-container">
            <h2>Participants</h2>
            <table
              className="contest-table"
              border="1"
              cellPadding="10"
              style={{ borderCollapse: "collapse", border: "1px solid white" }}
            >
              <thead>
                <tr>
                  <th>Id</th>
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
              <form onSubmit={handleSubmit}>
                <label for="id">Id</label>
                <input
                  type="number"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                ></input>
                <br></br>
                
                <input type="submit"></input>
              </form>
            </div>
          </div>
        </div>
      );
}
export default DeleteContestPage;
