import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Details.css';
import { IMAGE_URL } from '../../api/variables';

function Details() {
  const { itemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [details, setDetails] = useState<{
    name: string;
    height: string;
    mass: string;
    url: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://swapi.dev/api/people/${itemId}/`
        );
        const data = response.data;
        setDetails(data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
      setIsLoading(false);
    };

    fetchDetails();
  }, [itemId, location]);

  const handleCloseDetails = () => {
    navigate('/');
  };

  return (
    <div className="details-container">
      {isLoading ? (
        <div>Loading details...</div>
      ) : details ? (
        <div>
          <h2 className="details-title">{details.name || 'N/A'}</h2>
          <p className="details-description">
            Height: {details.height || 'N/A'}
          </p>
          <p className="details-description">Mass: {details.mass || 'N/A'}</p>
          <img
            className="hero-card"
            src={`${IMAGE_URL}${details.url.match(/\d+/)}.jpg` || 'N/A'}
            alt={details.name}
          />
          <button className="close-button" onClick={handleCloseDetails}>
            Close
          </button>
        </div>
      ) : (
        <div>No details available for this item.</div>
      )}
    </div>
  );
}

export default Details;
