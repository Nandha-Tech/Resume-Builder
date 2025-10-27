import React, { useState } from 'react'
import { Box, Grid2 as Grid, Paper, TextField, Button, Chip, Stack, Typography, Avatar, Divider } from '@mui/material'
import { useResume } from '../context/ResumeContext'
import { uid } from '../components/utils'

export default function BuilderPage() {
  const { data, setData } = useResume()
  const [skillInput, setSkillInput] = useState('')

  const addSkill = (val: string) => {
    const v = val.trim()
    if (!v) return
    setData(d => ({ ...d, skills: Array.from(new Set([...(d.skills || []), v])) }))
  }

  const addExperience = () => {
    setData(d => ({ ...d, experience: [...(d.experience || []), { id: uid(), company: '', role: '', start: '', end: '', description: '' }] }))
  }
  const addEducation = () => {
    setData(d => ({ ...d, education: [...(d.education || []), { id: uid(), school: '', degree: '', start: '', end: '', details: '' }] }))
  }
  const addProject = () => {
    setData(d => ({ ...d, projects: [...(d.projects || []), { id: uid(), name: '', link: '', tech: '', description: '' }] }))
  }

  const onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setData(d => ({ ...d, photo: reader.result as string }))
    reader.readAsDataURL(file)
  }

  // Helpers to safely access arrays on `data`
  const skills = data.skills || []
  const experience = data.experience || []
  const education = data.education || []
  const projects = data.projects || []

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 5 }}>
        <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Basic Info</Typography>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Avatar src={data.photo || undefined} sx={{ width: 72, height: 72 }} />
            <Button variant="outlined" component="label">Upload Photo
              <input type="file" accept="image/*" hidden onChange={onPhotoChange} />
            </Button>
            {data.photo && <Button color="error" variant="text" onClick={() => setData(d => ({ ...d, photo: null }))}>Remove</Button>}
          </Stack>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="First Name" value={data.firstName || ''} onChange={e => setData(d => ({ ...d, firstName: e.target.value }))} /></Grid>
            <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Last Name" value={data.lastName || ''} onChange={e => setData(d => ({ ...d, lastName: e.target.value }))} /></Grid>
            <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Email" value={data.email || ''} onChange={e => setData(d => ({ ...d, email: e.target.value }))} /></Grid>
            <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Phone" value={data.phone || ''} onChange={e => setData(d => ({ ...d, phone: e.target.value }))} /></Grid>
            <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Location" value={data.location || ''} onChange={e => setData(d => ({ ...d, location: e.target.value }))} /></Grid>
            <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Headline" value={data.headline || ''} onChange={e => setData(d => ({ ...d, headline: e.target.value }))} /></Grid>
            <Grid size={{ xs: 12 }}><TextField multiline minRows={3} fullWidth label="Professional Summary" value={data.summary || ''} onChange={e => setData(d => ({ ...d, summary: e.target.value }))} /></Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 7 }}>
        <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 2, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Skills</Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <TextField
              id="skill-input"
              size="small"
              label="Add a skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addSkill(skillInput)
                  setSkillInput('')
                }
              }}
            />
            <Button variant="contained" onClick={() => { addSkill(skillInput); setSkillInput('') }}>Add</Button>
          </Stack>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {skills.length === 0 && (
              <Typography variant="body2" color="text.secondary">No skills added yet.</Typography>
            )}
            {skills.map((s) => (
              <Chip key={s} label={s} onDelete={() => setData(d => ({ ...d, skills: (d.skills || []).filter(x => x !== s) }))} />
            ))}
          </Stack>
        </Paper>

        <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 2, mb: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6">Experience</Typography>
            <Button onClick={addExperience}>Add</Button>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={2}>
            {experience.map((ex) => (
              <Paper key={ex.id} sx={{ p: 2, borderRadius: 2, bgcolor: 'grey.50' }}>
                <Grid container spacing={1}>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Company" value={ex.company} onChange={e => {
                    const v = e.target.value; setData(d => ({ ...d, experience: d.experience.map(x => x.id === ex.id ? { ...x, company: v } : x) }))
                  }} /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Role" value={ex.role} onChange={e => {
                    const v = e.target.value; setData(d => ({ ...d, experience: d.experience.map(x => x.id === ex.id ? { ...x, role: v } : x) }))
                  }} /></Grid>
                  <Grid size={{ xs: 6, sm: 3 }}><TextField fullWidth label="Start" value={ex.start} onChange={e => {
                    const v = e.target.value; setData(d => ({ ...d, experience: d.experience.map(x => x.id === ex.id ? { ...x, start: v } : x) }))
                  }} /></Grid>
                  <Grid size={{ xs: 6, sm: 3 }}><TextField fullWidth label="End" value={ex.end} onChange={e => {
                    const v = e.target.value; setData(d => ({ ...d, experience: d.experience.map(x => x.id === ex.id ? { ...x, end: v } : x) }))
                  }} /></Grid>
                  <Grid size={{ xs: 12 }}><TextField fullWidth multiline minRows={2} label="Description" value={ex.description} onChange={e => {
                    const v = e.target.value; setData(d => ({ ...d, experience: d.experience.map(x => x.id === ex.id ? { ...x, description: v } : x) }))
                  }} /></Grid>
                </Grid>
                <Box textAlign="right" sx={{ mt: 1 }}>
                  <Button size="small" color="error" onClick={() => setData(d => ({ ...d, experience: (d.experience || []).filter(x => x.id !== ex.id) }))}>Remove</Button>
                </Box>
              </Paper>
            ))}
          </Stack>
        </Paper>

        <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 2, mb: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6">Education</Typography>
            <Button onClick={addEducation}>Add</Button>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={2}>
            {education.map((ed) => (
              <Paper key={ed.id} sx={{ p: 2, borderRadius: 2, bgcolor: 'grey.50' }}>
                <Grid container spacing={1}>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="School" value={ed.school} onChange={e => {
                    const v = e.target.value; setData(d => ({ ...d, education: d.education.map(x => x.id === ed.id ? { ...x, school: v } : x) }))
                  }} /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Degree" value={ed.degree} onChange={e => {
                    const v = e.target.value; setData(d => ({ ...d, education: d.education.map(x => x.id === ed.id ? { ...x, degree: v } : x) }))
                  }} /></Grid>
                  <Grid size={{ xs: 6, sm: 3 }}><TextField fullWidth label="Start" value={ed.start} onChange={e => {
                    const v = e.target.value; setData(d => ({ ...d, education: d.education.map(x => x.id === ed.id ? { ...x, start: v } : x) }))
                  }} /></Grid>
                  <Grid size={{ xs: 6, sm: 3 }}><TextField fullWidth label="End" value={ed.end} onChange={e => {
                    const v = e.target.value; setData(d => ({ ...d, education: d.education.map(x => x.id === ed.id ? { ...x, end: v } : x) }))
                  }} /></Grid>
                  <Grid size={{ xs: 12 }}><TextField fullWidth multiline minRows={2} label="Details" value={ed.details} onChange={e => {
                    const v = e.target.value; setData(d => ({ ...d, education: d.education.map(x => x.id === ed.id ? { ...x, details: v } : x) }))
                  }} /></Grid>
                </Grid>
                <Box textAlign="right" sx={{ mt: 1 }}>
                  <Button size="small" color="error" onClick={() => setData(d => ({ ...d, education: (d.education || []).filter(x => x.id !== ed.id) }))}>Remove</Button>
                </Box>
              </Paper>
            ))}
          </Stack>
        </Paper>

        <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6">Projects</Typography>
            <Button onClick={addProject}>Add</Button>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={2}>
            {projects.map((p) => (
              <Paper key={p.id} sx={{ p: 2, borderRadius: 2, bgcolor: 'grey.50' }}>
                <Grid container spacing={1}>
                  <Grid size={{ xs: 12, sm: 4 }}><TextField fullWidth label="Name" value={p.name} onChange={e => {
                    const v = e.target.value; setData(d => ({ ...d, projects: d.projects.map(x => x.id === p.id ? { ...x, name: v } : x) }))
                  }} /></Grid>
                  <Grid size={{ xs: 12, sm: 4 }}><TextField fullWidth label="Link" value={p.link} onChange={e => {
                    const v = e.target.value; setData(d => ({ ...d, projects: d.projects.map(x => x.id === p.id ? { ...x, link: v } : x) }))
                  }} /></Grid>
                  <Grid size={{ xs: 12, sm: 4 }}><TextField fullWidth label="Tech" value={p.tech} onChange={e => {
                    const v = e.target.value; setData(d => ({ ...d, projects: d.projects.map(x => x.id === p.id ? { ...x, tech: v } : x) }))
                  }} /></Grid>
                  <Grid size={{ xs: 12 }}><TextField fullWidth multiline minRows={2} label="Description" value={p.description} onChange={e => {
                    const v = e.target.value; setData(d => ({ ...d, projects: d.projects.map(x => x.id === p.id ? { ...x, description: v } : x) }))
                  }} /></Grid>
                </Grid>
                <Box textAlign="right" sx={{ mt: 1 }}>
                  <Button size="small" color="error" onClick={() => setData(d => ({ ...d, projects: (d.projects || []).filter(x => x.id !== p.id) }))}>Remove</Button>
                </Box>
              </Paper>
            ))}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  )
}
