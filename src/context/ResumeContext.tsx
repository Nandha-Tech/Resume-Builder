
import React, { createContext, useContext, useState } from 'react'

export type Experience = { id: string; company: string; role: string; start: string; end: string; description: string }
export type Education = { id: string; school: string; degree: string; start: string; end: string; details: string }
export type Project = { id: string; name: string; link: string; tech: string; description: string }
export type ResumeData = {
  photo?: string | null
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  headline: string
  summary: string
  skills: string[]
  experience: Experience[]
  education: Education[]
  projects: Project[]
}

const defaultData: ResumeData = {
  photo: null,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: '',
  headline: '',
  summary: '',
  skills: [],
  experience: [],
  education: [],
  projects: []
}

type Ctx = {
  data: ResumeData
  setData: React.Dispatch<React.SetStateAction<ResumeData>>
}

const ResumeContext = createContext<Ctx | null>(null)

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ResumeData>(defaultData)
  return <ResumeContext.Provider value={{ data, setData }}>{children}</ResumeContext.Provider>
}

export const useResume = () => {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error('useResume must be used within ResumeProvider')
  return ctx
}
