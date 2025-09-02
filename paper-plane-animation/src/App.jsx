import './App.css'
import paperPlane from './assets/paper-plane.svg'
import { useState, useEffect, useRef } from 'react'

function App() {
  const [mousePosition, setMousePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const [planePosition, setPlanePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const [planeRotation, setPlaneRotation] = useState(0)
  const [trail, setTrail] = useState([])
  const animationRef = useRef()

  const FOLLOW_DISTANCE = 30 // Minimum distance to maintain from cursor (reduced from 100)
  const FOLLOW_SPEED = 0.05 // Speed of following
  const ROTATION_SPEED = 0.1 // Speed of rotation smoothing
  const ROTATION_OFFSET = 60 // Offset to align SVG nose (upper-right corner) with cursor direction
  const TRAIL_LENGTH = 20 // Number of trail points
  const TRAIL_SPACING = 18 // Distance between trail points (decreased for closer spacing)

  // Function to find shortest angle difference
  const getShortestAngleDifference = (current, target) => {
    let diff = target - current
    while (diff > 180) diff -= 360
    while (diff < -180) diff += 360
    return diff
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const animate = () => {
      setPlanePosition(prevPos => {
        // Calculate distance between plane and cursor
        const deltaX = mousePosition.x - prevPos.x
        const deltaY = mousePosition.y - prevPos.y
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        
        // Calculate target rotation angle (plane nose points toward cursor)
        const targetAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + ROTATION_OFFSET
        
        // Smooth rotation transition
        setPlaneRotation(prevAngle => {
          const angleDiff = getShortestAngleDifference(prevAngle, targetAngle)
          return prevAngle + angleDiff * ROTATION_SPEED
        })
        
        let newPos = prevPos
        
        // Only move if distance is greater than follow distance
        if (distance > FOLLOW_DISTANCE) {
          // Calculate new position (move toward cursor but maintain distance)
          const moveDistance = (distance - FOLLOW_DISTANCE) * FOLLOW_SPEED
          const moveX = (deltaX / distance) * moveDistance
          const moveY = (deltaY / distance) * moveDistance
          
          newPos = {
            x: prevPos.x + moveX,
            y: prevPos.y + moveY
          }
        }
        
        // Update trail
        setTrail(prevTrail => {
          // Calculate the back tip position of the plane
          const planeAngle = (targetAngle - ROTATION_OFFSET) * (Math.PI / 180) // Convert to radians
          const backTipDistance = 25 // Distance from plane center to back tip
          const backTipX = newPos.x - Math.cos(planeAngle) * backTipDistance
          const backTipY = newPos.y - Math.sin(planeAngle) * backTipDistance
          
          const lastTrailPoint = prevTrail[0]
          const shouldAddPoint = !lastTrailPoint || 
            Math.sqrt(Math.pow(backTipX - lastTrailPoint.x, 2) + Math.pow(backTipY - lastTrailPoint.y, 2)) > TRAIL_SPACING
          
          if (shouldAddPoint) {
            const newTrail = [{ x: backTipX, y: backTipY, timestamp: Date.now(), angle: planeAngle }, ...prevTrail]
            return newTrail.slice(0, TRAIL_LENGTH)
          }
          
          return prevTrail
        })
        
        return newPos
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition])

  return (
    <div className="app">
      {/* Render trail lines */}
      {trail.map((point, index) => {
        const age = Date.now() - point.timestamp
        const maxAge = 2000 // 2 seconds
        const opacity = Math.max(0, 1 - (age / maxAge))
        const lineLength = Math.max(4, 12 - (index * 0.3)) // Further reduced width/length
        const lineWidth = Math.max(0.2, 1 - (index * 0.04)) // Much thinner lines
        
        return (
          <div
            key={`${point.x}-${point.y}-${index}`}
            className="trail-line"
            style={{
              left: point.x,
              top: point.y,
              opacity: opacity,
              width: lineLength,
              height: lineWidth,
              transform: `translate(-50%, -50%) rotate(${point.angle}rad)`,
            }}
          />
        )
      })}
      
      <img 
        src={paperPlane} 
        alt="Paper Plane" 
        className="paper-plane"
        style={{
          left: planePosition.x - 30,
          top: planePosition.y - 30,
          transform: `rotate(${planeRotation}deg)`
        }}
      />
    </div>
  )
}

export default App
