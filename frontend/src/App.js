import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/hello/")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setError("Failed to fetch message");
        console.error(error);
      });
  }, []); 

  return (
    <div>
      {error && <p>{error}as</p>}
      <h1>asa{message}</h1>
    </div>
  );
}

export default App;
