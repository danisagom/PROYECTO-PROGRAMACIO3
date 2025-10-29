import React from 'react'

const TrainerDashboard = () => {
  const userName = JSON.parse(localStorage.getItem("currentUser"))?.email || "Profesor";

  return (
    <div>
      <p>Hola {userName}</p>
    </div>
  )
}

export default TrainerDashboard
