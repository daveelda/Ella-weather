import './LoadingState.css';

export default function LoadingState() {
  return (
    <div className="loading-state" role="status" aria-live="polite" aria-label="Loading weather data">
      <div className="skeleton skeleton-current">
        <div className="skeleton-top">
          <div>
            <div className="skel skel-city" />
            <div className="skel skel-country" />
            <div className="skel skel-date" />
          </div>
          <div className="skel skel-icon" />
        </div>
        <div className="skel skel-temp" />
        <div className="skeleton-stats">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="skel skel-stat" />
          ))}
        </div>
      </div>
      <div className="skeleton-forecast">
        {[1,2,3].map(i => <div key={i} className="skel skel-card" />)}
      </div>
    </div>
  );
}
