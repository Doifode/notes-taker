import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Card, CardActions, CardContent, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ConfirmationDialog from "../../utils/components/ConfirmationDialog";
import DialogBox from "../../utils/components/DialogBox";
import { DefaultNote, INote } from "../../utils/types";
import AddEditNote from "./AddEditNote";
import InfiniteScroll from "react-infinite-scroll-component";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const NotesList = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [notesList, setNotesList] = useState<INote[]>([]);
    const [selectedNote, setSelectedNote] = useState<INote>(DefaultNote);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [visibleData, setVisibleData] = useState(notesList.slice(0, 2)); // Initial data to display
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

    const handleDialogOpenClose = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    const handleDeleteDialogOpenClose = () => {
        setIsDeleteDialogOpen(!isDeleteDialogOpen);
    };

    const handleEditNote = (note: INote) => {
        setSelectedNote(note);
        handleDialogOpenClose();
    };

    const handleAddNote = () => {
        setSelectedNote(DefaultNote);
        handleDialogOpenClose();
    };

    const handleDeleteOpenDialog = (note: INote) => {
        setSelectedNote(note);
        handleDeleteDialogOpenClose();
    };

    const handleDeleteNote = () => {
        const filteredNote = notesList.filter((note) => note.id !== selectedNote.id);
        setNotesList(filteredNote);
        localStorage.setItem("notes", JSON.stringify(filteredNote));
        handleDeleteDialogOpenClose();
    };

    const handleNotesList = (): INote[] => {
        const filteredNotes = searchText.length
            ? notesList.filter(
                (note) =>
                    note.title.toLowerCase().includes(searchText) || note.note.toLocaleLowerCase().includes(searchText)
            )
            : visibleData;

        if (sortConfig.key) {
            filteredNotes.sort((a, b) => {
                if (sortConfig.key === "date") {
                    return sortConfig.direction === "asc"
                        ? new Date(a.date).getDate() - new Date(b.date).getDate()
                        : new Date(b.date).getDate() - new Date(a.date).getDate();
                } else if (sortConfig.key === "title") {
                    return sortConfig.direction === "asc"
                        ? a.title.localeCompare(b.title)
                        : b.title.localeCompare(a.title);
                }
                return 0;
            });
        }

        return filteredNotes;
    };

    const handleSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value.trim().toLowerCase());
    };

    const handleSort = (key: string) => {
        setSortConfig((prevState) => ({
            key,
            direction: prevState.direction === "asc" && prevState.key === key ? "desc" : "asc",
        }));
    };

    const fetchMoreData = () => {
        if (visibleData.length < notesList.length) {
            setTimeout(() => {
                setVisibleData((prevData) => notesList.slice(0, prevData.length + 2));
            }, 500); // Simulating a delay
        }
    };

    useEffect(() => {
        const localNotes = localStorage.getItem("notes") || "[]";
        const parseNotes = JSON.parse(localNotes);
        setNotesList(parseNotes);
        setVisibleData(parseNotes.slice(0, 5));
    }, [isDialogOpen]);

    return (
        <>
            <Grid container spacing={2} marginTop={3} alignItems="center">
                <Grid item xs={8} >
                    <TextField size="small" onChange={handleSearchText} fullWidth placeholder="Search..." />
                </Grid>
                <Grid item xs={2} display="flex" justifyContent="space-around">
                    <IconButton onClick={() => handleSort("date")}>
                        {sortConfig.key === "date" && sortConfig.direction === "asc" ? (
                            <ArrowUpwardIcon />
                        ) : (
                            <ArrowDownwardIcon />
                        )}
                        <Typography variant="body2">Date</Typography>
                    </IconButton>
                    <IconButton onClick={() => handleSort("title")}>
                        {sortConfig.key === "title" && sortConfig.direction === "asc" ? (
                            <ArrowUpwardIcon />
                        ) : (
                            <ArrowDownwardIcon />
                        )}
                        <Typography variant="body2">Title</Typography>
                    </IconButton>
                </Grid>
                <Grid item xs={2}>
                    <Button fullWidth onClick={handleAddNote} variant="contained" color="success">
                        <AddIcon />
                        Add Note
                    </Button>
                </Grid>
            </Grid>

            {handleNotesList().length ? (
                <InfiniteScroll
                    dataLength={visibleData.length} // Number of items loaded
                    next={fetchMoreData} // Function to fetch more items
                    hasMore={visibleData.length < notesList.length} // Check if more data is available
                    loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>} // Loader element
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>No more items to load</b>
                        </p>
                    }
                >
                    {handleNotesList().map((note: INote, index) => (
                        <Grid item xs={12} key={index} marginTop={2}>
                            <Card className="card">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {note.title}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {note.note}
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        {new Date(note.date).toLocaleString()}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        color="primary"
                                        variant="contained"
                                        startIcon={<EditIcon />}
                                        onClick={() => handleEditNote(note)}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        size="small"
                                        color="error"
                                        variant="contained"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDeleteOpenDialog(note)}
                                    >
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </InfiniteScroll>
            ) : (
                <Typography align="center">No record found.</Typography>
            )}

            <DialogBox onClose={handleDialogOpenClose} open={isDialogOpen} title="Add Note">
                <AddEditNote
                    setNotesList={setNotesList}
                    handleClose={handleDialogOpenClose}
                    initialValues={selectedNote}
                />
            </DialogBox>

            <ConfirmationDialog
                onConfirm={handleDeleteNote}
                onClose={handleDeleteDialogOpenClose}
                cancelText="Cancel"
                confirmText="Yes"
                open={isDeleteDialogOpen}
                title="Confirmation"
                mainText={`Are you sure you want to delete "${selectedNote.title}" note?`}
            />
        </>
    );
};

export default NotesList;
