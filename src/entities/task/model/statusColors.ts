import type { Status } from "./Task"
import type { Color } from "../../statusColor/model"

type StatusColors = Record<Status, Color>


export const statusColors: StatusColors = {
   'todo':{
            solid: 'bg-status-todo',
            shadow: 'shadow-status-todo'
        },
    'in progress':{
            solid: 'bg-status-in-progress',
            shadow: 'shadow-status-in-progress',
        },
    'done':{
            solid: 'bg-status-done',
            shadow: 'shadow-status-done',
        },
    }
