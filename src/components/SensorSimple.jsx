import React from 'react'

export const SensorSimple = ({sensor}) => {
  return (
    <div>
        <h2>{sensor.name}</h2>
        <p>{sensor.minValue}</p>
        <p>{sensor.maxValue}</p>
        <p>{sensor.zone}</p>
    </div>
  )
}
