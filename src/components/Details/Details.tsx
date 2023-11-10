import { useAppState } from '../AppStateContext/AppStateContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Details.css';
import { API_URL, IMAGE_URL } from '../../api/variables';
import { useEffect, useState } from 'react';

function Details() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();
  const { isLoading } = state;

  const [details, setDetails] = useState<{
    name: string;
    height: string;
    mass: string;
    url: string;
  } | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      dispatch({ type: 'SET_IS_LOADING', payload: true });
      try {
        const response = await axios.get(`${API_URL}/${itemId}/`);
        const data = response.data;
        setDetails(data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
      dispatch({ type: 'SET_IS_LOADING', payload: false });
    };

    fetchDetails();
  }, [itemId, dispatch]);

  const handleCloseDetails = () => {
    navigate(`/main`);
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
