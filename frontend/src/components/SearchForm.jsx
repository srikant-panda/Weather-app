import { useState } from "react";
import "./SearchForm.css";

export default function SearchForm({ onSearch, loading }) {
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(location);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        className="search-input"
        placeholder="Enter city name (e.g. London)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit" className="search-btn" disabled={loading}>
        {loading ? <span className="spinner" /> : "Search"}
      </button>
    </form>
  );
}
