import { Box, Container } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./pages/layout/Header";
import NotesList from "./pages/notes/NotesList";
function App() {
  return (
    <Container>
      <ToastContainer />
      <Header></Header>
      <Box marginTop={10}>
        <NotesList />
      </Box>
    </Container>
  )
}

export default App
