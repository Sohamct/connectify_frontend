import React from 'react'

export const Followers = () => {
  return (
    <ul className="list-group">
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <p style={{ margin: 0 }}>Username 1</p>
        </div>
        <div>
          <button className="btn btn-primary">Follow</button>
        </div>
      </li>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <p style={{ margin: 0 }}>Username 1</p>
        </div>
        <div>
          <button className="btn btn-primary">Follow</button>
        </div>
      </li>
    </ul>
  )
}
