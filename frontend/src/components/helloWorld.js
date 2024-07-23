import React, { useState, useEffect } from "react";
import api from "../services/api";

const HelloWorld = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("true");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await api.get("/api/hello/");
        setMessage(response.data.message);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  if (loading) return <p>loading..</p>;
  if (error)
    return (
      <p>
        Error:
        {error.message}
      </p>
    );
    return (<div><h1>{message}</h1></div>);
};

export default HelloWorld;
