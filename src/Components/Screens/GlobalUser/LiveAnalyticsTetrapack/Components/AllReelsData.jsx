import { useEffect, useState } from "react"
import { X, Plus, Minus } from "lucide-react"

export default function ReelsDashboard({TotalReels,MatchReels,MisMatchReels,WrongMisMatch}) {
  const [animate, setAnimate] = useState(false)
  useEffect(() => {
    setAnimate(true)
  }, [])

  const metrics = [
    {
      value: TotalReels,
      label: "Total Reels",
      icon: <X strokeWidth={2.5} />,
      color: "#4361ee",
      gradient: "linear-gradient(135deg,rgb(61, 89, 211), #3a0ca3)",
    },
    {
      value: MatchReels,
      label: "Match Reels",
      icon: <Plus strokeWidth={2.5} />,
      color: "#2cb67d",
      gradient: "linear-gradient(135deg,rgb(61, 89, 211), #3a0ca3)",
    },
    {
      value: MisMatchReels,
      label: "Mis-Match Reels",
      icon: <Minus strokeWidth={2.5} />,
      color: "#7209b7",
      gradient: "linear-gradient(135deg,rgb(61, 89, 211), #3a0ca3)",
    },
    {
      value: WrongMisMatch,
      label: "Unidentified Reels",
      icon: <X strokeWidth={2.5} />,
      color: "#f72585",
      gradient: "linear-gradient(135deg,rgb(61, 89, 211), #3a0ca3)",
    },
  ]

  return (
    <>
    <h3
            className=" fw-bold mb-4"
            style={{
              background: "linear-gradient(45deg,rgba(0, 0, 3, 0.93),rgba(41, 43, 46, 0.84))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              textAlign:"center"
            }}
          >
            Day Wise Reels Data
    </h3>
    <div className="dashboard-container">
      <div className="metrics-panel">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`metric-box ${animate ? "animate" : ""}`}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div
              className="icon-container"
              style={{
                background: metric.gradient,
              }}
            >
              {metric.icon}
            </div>
            <div className="metric-data">
              <h3 className="metric-value">{metric.value}</h3>
              <p className="metric-label">{metric.label}</p>
            </div>
          </div>
        ))}
      </div>
     

      <style jsx global>{`
        .dashboard-container {
          padding: 15px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .metrics-panel {
          display: flex;
          align-items: stretch;
          justify-content: space-between;
          padding: 15px 10px;
          gap: 15px;
        }
        
        .metric-box {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 12px;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(10px);
        }
        
        .metric-box.animate {
          opacity: 1;
          transform: translateY(0);
        }
        
        .metric-box:hover {
          background: #ffffff;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
          transform: translateY(-5px);
        }
        
        .icon-container {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-right: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .metric-data {
          display: flex;
          flex-direction: column;
        }
        
        .metric-value {
          font-size: 24px;
          font-weight: 700;
          margin: 0;
          line-height: 1.2;
          color: #1a1a1a;
          letter-spacing: -0.5px;
        }
        
        .metric-label {
          font-size: 14px;
          color: #6c757d;
          margin: 0;
          font-weight: 500;
        }
        
        @media (max-width: 768px) {
          .metrics-panel {
            flex-wrap: wrap;
          }
          
          .metric-box {
            flex: 1 1 40%;
            margin-bottom: 15px;
          }
        }
        
        @media (max-width: 480px) {
          .metric-box {
            flex: 1 1 100%;
          }
        }
      `}</style>
    </div>
    </>
  )
}
