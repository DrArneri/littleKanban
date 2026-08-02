import type { Status } from "../task/model/Task"

type Color = {
    solid: string,
    shadow: string
}

export type StatusColors = {
    title: Status,
    color: Color
}

export const statusColos: StatusColors[] = [
    {title: 'todo', color: {solid:'rgb(239,68,68)', shadow: '0_0_0_3px_rgba(239,68,68,0.145)'}},
    {title: 'in progress', color: {solid:'rgb(234, 179, 8)', shadow: 'rgba(234, 179, 8, 0.145) 0px 0px 0px 3px'}},
    {title: 'done', color: {solid:'rgb(34, 197, 94)', shadow: 'rgba(34, 197, 94, 0.145) 0px 0px 0px 3px'}}
]


