import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./CountryDetail.css";
import "./App.css";

function CountryDetails() {
  const { ccn3 } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${ccn3}`)
      .then((res) => res.json())
      .then((data) => setCountry(data[0]))
      .catch((error) =>
        console.error("Error fetching country details:", error)
      );
  }, [ccn3]);

  if (!country) return <p>Loading...</p>;

  return (
    <div className="details-container">
      <div className="header">
        <Link to="/" className="back-button">
          Back
        </Link>
      </div>

      <header className="app-header">
        🌍 {country.name.official} ({country.cca3})
      </header>

      <img
        src={country.flags.png}
        alt={country.name.official}
        className="details-flag"
      />
      <div className="details-text-div">
        <div>
          <p>
            <strong>Common Name:</strong> {country.name.common}
          </p>
          <p>
            <strong>Native Names:</strong>{" "}
            {Object.values(country.name.nativeName)
              .map((n) => n.common)
              .join(", ")}
          </p>
          <p>
            <strong>Capital:</strong> {country.capital?.[0]}
          </p>
          <p>
            <strong>Region:</strong> {country.region} ({country.subregion})
          </p>
          <p>
            <strong>Borders:</strong> {country.borders?.join(", ") || "None"}
          </p>
        </div>
        <div>
          <p>
            <strong>Population:</strong> {country.population.toLocaleString()}
          </p>
          <p>
            <strong>Currency:</strong>{" "}
            {Object.values(country.currencies)[0].name} (
            {Object.values(country.currencies)[0].symbol})
          </p>
          <p>
            <strong>Timezone:</strong> {country.timezones?.join(", ")}
          </p>

          <p>
            <strong>Languages:</strong>{" "}
            {Object.values(country.languages).join(", ")}
          </p>

          <p>
            <strong>Area:</strong> {country.area.toLocaleString()} km²
          </p>
        </div>
      </div>

      <a
        href={country.maps.googleMaps}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on Google Maps
      </a>
    </div>
  );
}

export default CountryDetails;
