import React, { useState } from "react";

const Register = () => {

    const [formData, setFormData] = useState({
      name: "",
      surname: "",
      age: "",
      username: "",
      password: ""
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:8080/employee/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          alert("Employee added successfully!");
          setFormData({ name: "", surname: "", age: "", username: "", password: "" });
  
        } else {
          console.error("Failed to add employee");
        }
      } catch (error) {
        console.error("Error adding employee: ", error);
      }
    };
  
    return (
      <div className="page-container">
    
          <div className="textfield-container">
            <h2>Register</h2>
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
              <label for="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              ></input>
              <br></br>
              <label for="password">Password</label>
              <input
                type="text"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              ></input>
              <br></br>
              <input type="submit"></input>
            </form>
          </div>
      </div>
    );
};

export default Register;
