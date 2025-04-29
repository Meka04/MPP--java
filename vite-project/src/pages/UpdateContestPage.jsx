import { useEffect, useState } from "react";

const UpdateContestPage = () => {
    const [contests, setContests] = useState([]);
      
      const [formData, setFormData] = useState({
        id: "",
        type: "",
        participants: "",
      });

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
      }, []);
    
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await fetch(
          `http://localhost:8080/contest/update/${formData.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
    
        if (response.ok) {
          alert("Contest updated successfully!");
          setFormData({ id: "", type: "", participants: ""});
    
          // Optionally refresh participants
          const data = await fetch("http://localhost:8080/contest/all").then(
            (res) => res.json()
          );
          setContests(data);
        } else {
          console.error("Failed to update contest");
        }
      } catch (error) {
        console.error("Error updating contest: ", error);
      }};
    
      return (
        <div className="page-container">
          <div className="participants-table-box">
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
          <div className="table-container">
            <h2>Update Contest</h2>
    
            <form onSubmit={handleSubmit}>
              <label htmlFor="id">Id</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="type">Type</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="participants">Participants</label>
              <input
                type="number"
                name="participants"
                value={formData.participants}
                onChange={handleChange}
              />
              <br />
              <button type="submit">Update Contest</button>
            </form>
          </div>
        </div>
      );
}

export default UpdateContestPage;