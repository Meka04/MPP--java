import { useEffect, useState } from "react";

const UpdateParticipantPage = () => {
  const [participants, setParticipants] = useState([]);
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    surname: "",
    age: "",
    contestid: "",
  });
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch("http://localhost:8080/participant/all");
        const data = await response.json();
        setParticipants(data);
      } catch (error) {
        console.error("Error fetching participants: ", error);
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
      `http://localhost:8080/participant/update/${formData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      alert("Participant updated successfully!");
      setFormData({ id: "", name: "", surname: "", age: "", contestid: "" });

      // Optionally refresh participants
      const data = await fetch("http://localhost:8080/participant/all").then(
        (res) => res.json()
      );
      setParticipants(data);
    } else {
      console.error("Failed to update participant");
    }
  } catch (error) {
    console.error("Error updating participant: ", error);
  }};

  return (
    <div className="page-container">
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
      <div className="table-container">
        <h2>Update Participant</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="id">Id</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="contestid">Contest ID</label>
          <input
            type="number"
            name="contestid"
            value={formData.contestid}
            onChange={handleChange}
          />
          <br />
          <button type="submit">Update Participant</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateParticipantPage;
