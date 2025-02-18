import React from 'react';

const AIAccuracyGauge = ({ accuracy }) => {
  // Calculate the angle for the needle
  const gaugeAngle = (accuracy / 100) * 180 - 90; // Maps 0-100 to -90 to 90 degrees
  console.log('gauging', gaugeAngle)
  console.log('accr', accuracy)

  return (
    <div  className="">
      <div className=" mb-4">
        {/* Gauge SVG */}
        <svg viewBox="0 0 200 120"  className="w-100">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#4ade80" />
            </linearGradient>
          </defs>

          {/* Background arc */}
          <path
            d="M20 100 A80 80 0 0 1 180 100"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Dynamic colored arc based on accuracy */}
          <path
            d="M20 100 A80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray="251.2" // Full length of the arc
            strokeDashoffset={(251.2 - ((accuracy==undefined || isNaN(accuracy) ? 0 : accuracy) / 100) * 251.2) > 250 ? 250 : (251.2 - ((accuracy==undefined || isNaN(accuracy) ? 0 : accuracy) / 100) * 251.2)} // Adjust based on accuracy
          />

          {/* Needle */}
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="20"
            stroke="#1f2937"
            strokeWidth="4"
            strokeLinecap="round"
            transform={`rotate(${(gaugeAngle==0 || gaugeAngle==null || isNaN(gaugeAngle)) ? -90 : gaugeAngle}, 100, 100)`} // Rotate needle
          />

          {/* Needle pivot */}
          <circle cx="100" cy="100" r="6" fill="#1f2937" />
        </svg>
      </div>


    </div>
  );
};

export default AIAccuracyGauge;