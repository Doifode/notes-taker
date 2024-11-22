import { Box, Container } from "@mui/material"
import Header from "./pages/layout/Header"
import NotesList from "./pages/notes/NotesList"

function App() {
  return (
    <Container>
      <Header></Header>
      <Box marginTop={10}>
        <NotesList />
      </Box>
    </Container>
  )
}

export default App
