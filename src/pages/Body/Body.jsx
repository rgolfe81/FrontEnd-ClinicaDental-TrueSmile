import React from 'react'
import { Route, Routes } from "react-router-dom"
import { Home } from "../Home/Home"
import { Login } from "../Login/Login"
import { Register } from "../Register/Register"
import { Profile } from "../Profile/Profile"
import { Appointment } from "../Appointment/Appointment"
import { MyAppointments } from "../MyAppointments/MyAppointments"
import { Users } from '../Users/Users'

export const Body = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/appointment" element={<Appointment />} /> 
        <Route path="/myAppointments" element={<MyAppointments />} />
        <Route path="/users" element={<Users />} />     
      </Routes>
    </>
  )
}
