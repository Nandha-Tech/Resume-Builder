import React, { useRef } from 'react'
import { useResume } from '../context/ResumeContext'
import { Box, Paper, Typography, Stack, Chip, Avatar, Button } from '@mui/material'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Link } from 'react-router-dom'

export default function PreviewPage() {
  const { data } = useResume()
  const ref = useRef<HTMLDivElement>(null)

  const exportPDF = async () => {
    const el = ref.current
    if (!el) return
    const canvas = await html2canvas(el, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pageWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
    heightLeft -= pageHeight

    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
      heightLeft -= pageHeight
    }
    pdf.save(`${(data?.firstName || 'resume')}.pdf`)
  }

  // safe defaults
  const firstName = data?.firstName || ''
  const lastName = data?.lastName || ''
  const headline = data?.headline || ''
  const email = data?.email || ''
  const phone = data?.phone || ''
  const location = data?.location || ''
  const summary = data?.summary || ''
  const photo = data?.photo || null
  const skills = Array.isArray(data?.skills) ? data.skills : []
  const experience = Array.isArray(data?.experience) ? data.experience : []
  const projects = Array.isArray(data?.projects) ? data.projects : []
  const education = Array.isArray(data?.education) ? data.education : []

  // helper to join non-empty contact parts with bullet
  const joinWithBullet = (...parts: Array<string | undefined | null>) =>
    parts.filter(Boolean).join(' • ')

  // helper to render start/end dates cleanly
  const formatRange = (start?: string, end?: string) => {
    if (start && end) return `${start} – ${end}`
    if (start) return start
    if (end) return end
    return ''
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Button component={Link} to="/" variant="outlined">Back to Builder</Button>
        <Button variant="contained" onClick={exportPDF}>Download PDF</Button>
      </Stack>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Box
          ref={ref}
          sx={{
            bgcolor: 'white',
            color: 'black',
            width: '210mm',
            minHeight: '297mm',
            mx: 'auto',
            p: 3,
            border: '1px solid #eee'
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
     {photo && (
  <Avatar
    src={photo}
    sx={{ width: 72, height: 72 }}
  />
)}


            <Box>
              <Typography variant="h4" fontWeight={700}>
                {firstName} {lastName}
              </Typography>
              {headline && <Typography color="text.secondary">{headline}</Typography>}

              {/* Contact line: only include non-empty items, separated by bullet */}
              {joinWithBullet(email, phone, location) ? (
                <Typography variant="body2" color="text.secondary">
                  {joinWithBullet(email, phone, location)}
                </Typography>
              ) : null}
            </Box>
          </Stack>

          {summary && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>Summary</Typography>
              <Typography variant="body1">{summary}</Typography>
            </Box>
          )}

          {skills.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>Skills</Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {skills.map((s) => (
                  <Chip key={s} label={s} />
                ))}
              </Stack>
            </Box>
          )}

          {experience.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>Experience</Typography>
              <Stack spacing={1.5}>
                {experience.map(ex => {
                  // join role and company only when present
                  const title = joinWithBullet(ex.role, ex.company)
                  const dates = formatRange(ex.start, ex.end)
                  return (
                    <Box key={ex.id}>
                      {title && <Typography fontWeight={600}>{title}</Typography>}
                      {dates && <Typography variant="body2" color="text.secondary">{dates}</Typography>}
                      {ex.description && <Typography variant="body2">{ex.description}</Typography>}
                    </Box>
                  )
                })}
              </Stack>
            </Box>
          )}

          {projects.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>Projects</Typography>
              <Stack spacing={1.5}>
                {projects.map(p => (
                  <Box key={p.id}>
                    <Typography fontWeight={600}>
                      {p.name}
                      {/* show link only when present */}
                      {p.link ? (
                        <a href={p.link} target="_blank" rel="noreferrer" style={{ fontWeight: 400, marginLeft: 6 }}>
                          ({p.link})
                        </a>
                      ) : null}
                    </Typography>

                    {/* tech line only when present */}
                    {p.tech && <Typography variant="body2" color="text.secondary">{p.tech}</Typography>}
                    {p.description && <Typography variant="body2">{p.description}</Typography>}
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          {education.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>Education</Typography>
              <Stack spacing={1.5}>
                {education.map(ed => {
                  const title = joinWithBullet(ed.degree, ed.school)
                  const dates = formatRange(ed.start, ed.end)
                  return (
                    <Box key={ed.id}>
                      {title && <Typography fontWeight={600}>{title}</Typography>}
                      {dates && <Typography variant="body2" color="text.secondary">{dates}</Typography>}
                      {ed.details && <Typography variant="body2">{ed.details}</Typography>}
                    </Box>
                  )
                })}
              </Stack>
            </Box>
          )}
        </Box>
      </Paper>
    </Stack>
  )
}
