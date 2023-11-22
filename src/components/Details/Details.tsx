import React, { useEffect } from 'react';
import './Details.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetDetailsQuery } from '../../api/apiService';
import { useAppDispatch } from '../../stores/store';
import { IMAGE_URL } from '../../api/variables';
import { setIsLoading } from '../../reducers/appStateReducer';

function Details() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: details, isLoading } = useGetDetailsQuery(itemId!);

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [dispatch, isLoading]);

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
          {details.url && (
            <img
              className="hero-card"
              src={`${IMAGE_URL}${details.url.match(/\d+/)}.jpg` || 'N/A'}
              alt={details.name}
            />
          )}
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
