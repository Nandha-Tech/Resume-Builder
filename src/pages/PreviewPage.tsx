
import { useRef } from 'react'
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
    const imgHeight = canvas.height * imgWidth / canvas.width
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
    pdf.save(`${data.firstName || 'resume'}.pdf`)
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Button component={Link} to="/" variant="outlined">Back to Builder</Button>
        <Button variant="contained" onClick={exportPDF}>Download PDF</Button>
      </Stack>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
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
            {data.photo && <Avatar src={data.photo} sx={{ width: 72, height: 72 }} />}
            <Box>
              <Typography variant="h4" fontWeight={700}>
                {data.firstName} {data.lastName}
              </Typography>
              <Typography color="text.secondary">{data.headline}</Typography>
              <Typography variant="body2" color="text.secondary">
                {data.email} • {data.phone} • {data.location}
              </Typography>
            </Box>
          </Stack>

          {data.summary && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: .5 }}>Summary</Typography>
              <Typography variant="body1">{data.summary}</Typography>
            </Box>
          )}

          {data.skills.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: .5 }}>Skills</Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {data.skills.map((s, i) => <Chip key={i} label={s} />)}
              </Stack>
            </Box>
          )}

          {data.experience.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: .5 }}>Experience</Typography>
              <Stack spacing={1.5}>
                {data.experience.map(ex => (
                  <Box key={ex.id}>
                    <Typography fontWeight={600}>{ex.role} • {ex.company}</Typography>
                    <Typography variant="body2" color="text.secondary">{ex.start} – {ex.end}</Typography>
                    <Typography variant="body2">{ex.description}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          {data.projects.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: .5 }}>Projects</Typography>
              <Stack spacing={1.5}>
                {data.projects.map(p => (
                  <Box key={p.id}>
                    <Typography fontWeight={600}>
                      {p.name} {p.link && (<a href={p.link} target="_blank" rel="noreferrer" style={{ fontWeight: 400 }}>({p.link})</a>)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">{p.tech}</Typography>
                    <Typography variant="body2">{p.description}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          {data.education.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: .5 }}>Education</Typography>
              <Stack spacing={1.5}>
                {data.education.map(ed => (
                  <Box key={ed.id}>
                    <Typography fontWeight={600}>{ed.degree} • {ed.school}</Typography>
                    <Typography variant="body2" color="text.secondary">{ed.start} – {ed.end}</Typography>
                    <Typography variant="body2">{ed.details}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      </Paper>
    </Stack>
  )
}
