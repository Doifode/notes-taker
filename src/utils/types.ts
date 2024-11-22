export interface INote {
    note: string,
    title: string,
    date: string,
    id: number
}

export const DefaultNote: INote = {
    note: "",
    title: "",
    date: new Date().toString(),
    id: 0
}