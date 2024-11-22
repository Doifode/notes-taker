import { Grid2 } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { INote } from "../../utils/types";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
    title: Yup.string()
        .required("Title is required")
        .max(100, "Title cannot exceed 100 characters"),
    note: Yup.string().required("Note is required"),
});

interface AddEditNoteProp {
    handleClose: () => void,
    initialValues: INote,
    setNotesList: Dispatch<SetStateAction<INote[]>>
}

const AddEditNote: React.FC<AddEditNoteProp> = ({ handleClose, initialValues, setNotesList }) => {

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: (values) => { handleSubmit(values) },
    });

    const handleSubmit = (values: INote) => {
        const localNotes = localStorage.getItem("notes") || "[]"
        const notesList: INote[] = JSON.parse(localNotes)
        let newNotesArray: INote[] = []

        if (initialValues?.id) {
            const index = notesList.findIndex((note) => note.id == initialValues.id)
            notesList.splice(index, 1, values)
            newNotesArray = notesList
        } else {
            values.id = Date.now()
            newNotesArray = [values, ...notesList]
        }

        localStorage.setItem("notes", JSON.stringify(newNotesArray))
        setNotesList(newNotesArray)
        handleClose()
        toast.success(initialValues.id ? "Note updated successfully." : "Note added successfully.")
    }

    useEffect(() => {
        if (initialValues?.id) {
            formik.setValues(initialValues)
        }
    }, [])

    return (
        <Grid2>
            <Box component="form" onReset={formik.handleReset} onSubmit={formik.handleSubmit} sx={{ mt: 2, maxWidth: 500 }}>
                <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Title"
                    value={formik.values.title.trimStart()}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    id="note"
                    name="note"
                    label="Note"
                    value={formik.values.note.trimStart()}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.note && Boolean(formik.errors.note)}
                    helperText={formik.touched.note && formik.errors.note}
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                />

                <Button style={{ marginRight: 3 }} type="submit" variant="contained" color="primary">
                    {initialValues?.id ? "Update" : "Add"}
                </Button>

                <Button type="reset" variant="contained" color="error">
                    Clear
                </Button>
            </Box >
        </Grid2>
    );
};

export default AddEditNote;
