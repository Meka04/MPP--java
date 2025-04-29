import { useEffect, useState } from "react";

const AddParticipantPage = () => {
  const [participants, setParticipants] = useState([]);
  const [formData, setFormData] = useState({
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
      const response = await fetch("http://localhost:8080/participant/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Participant added successfully!");
        setFormData({ name: "", surname: "", age: "", contestid: "" });

        // Optionally refresh participants
        const data = await fetch("http://localhost:8080/participant/all").then(
          (res) => res.json()
        );
        setParticipants(data);
      } else {
        console.error("Failed to add participant");
      }
    } catch (error) {
      console.error("Error adding participant: ", error);
    }
  };

  return (
    <div className="page-container">
      <div className="table-container">
        <h2>Participants</h2>
        <table
          className="participants-table"
          border="1"
          cellPadding="10"
          style={{ borderCollapse: "collapse", border: "1px solid white" }}
        >
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Age</th>
              <th>Contest Id</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant) => (
              <tr key={participant.id}>
                <td>{participant.id}</td>
                <td>{participant.name}</td>
                <td>{participant.surname}</td>
                <td>{participant.age}</td>
                <td>{participant.contestid}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="textfield-container">
          <form onSubmit={handleSubmit}>
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            ></input>
            <br></br>
            <label for="surname">Surname</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
            ></input>
            <br></br>
            <label for="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            ></input>
            <br></br>
            <label for="contestid">Contest id</label>
            <input
              type="number"
              id="contestid"
              name="contestid"
              value={formData.contestid}
              onChange={handleChange}
            ></input>
            <br></br>
            <input type="submit"></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddParticipantPage;
