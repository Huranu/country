import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Pagination from "./pagination";
import CountryDetail from "./countryDetail";

import "./App.css";

const PageSize = 10;

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const url = searchTerm
          ? `https://restcountries.com/v3.1/name/${searchTerm}`
          : "https://restcountries.com/v3.1/all";

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch countries");
        
        const data = await res.json();
        setCountries(data);
      } catch (err) {
      }
    };

    fetchCountries();
  }, [searchTerm]);

  const currentTableData = countries.slice(
    (currentPage - 1) * PageSize,
    currentPage * PageSize
  );

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <header className="app-header">🌍 Country List</header>
              
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="search-bar"
              />

              <div className="country-list">
                {currentTableData.map((c) => (
                  <Link
                    key={c.ccn3}
                    to={`/country/${c.ccn3}`}
                    className="country-card"
                  >
                    <img
                      alt={c.name.official}
                      className="country-flag"
                      src={c.flags.png}
                    />
                    <p className="country-name">{c.name.official}</p>
                  </Link>
                ))}
              </div>

              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={countries.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          }
        />
        <Route
          path="/country/:ccn3"
          element={<CountryDetail countries={countries} />}
        />
      </Routes>
    </div>
  );
}

export default App;
