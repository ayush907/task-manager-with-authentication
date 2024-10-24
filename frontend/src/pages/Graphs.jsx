import React from 'react'
import { Link } from 'react-router-dom'

const Graphs = () => {
  return (
    <div>
      this is Graphs section
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <Link to={"/sales"}>sales</Link>
        <Link to={"/tasks"}>tasks</Link>
      </div>
    </div>
  )
}

export default Graphs
