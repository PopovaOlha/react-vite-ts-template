import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Details.css';
import { API_URL, IMAGE_URL } from '../../api/variables';
import { setIsLoading } from '../../reducers/appStateReducer';
import { RootState } from '../../stores/store';

function Details() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state: RootState) => state.appState.isLoading);

  const [details, setDetails] = useState<{
    name: string;
    height: string;
    mass: string;
    url: string;
  } | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      dispatch(setIsLoading(true));
      try {
        const response = await axios.get(`${API_URL}/${itemId}/`);
        const data = response.data;
        setDetails(data);
      } catch (error) {
        console.error('Ошибка при загрузке деталей:', error);
      }
      dispatch(setIsLoading(false));
    };

    fetchDetails();
  }, [itemId, dispatch]);

  const handleCloseDetails = () => {
    navigate(`/main`);
  };

  return (
    <div className="details-container">
      {isLoading ? (
        <div>Loading...</div>
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
        <div>Детали для этого элемента недоступны.</div>
      )}
    </div>
  );
}

export default Details;
