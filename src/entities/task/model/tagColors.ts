import type { Tag } from "./Task"
import type { TagColor } from "../../tagColor/model"

type TagColors = Record<Tag, TagColor>

export const tagColors:TagColors = {
    'Design': {
        'str': 'text-tag-design',
        'bg': 'bg-bg-design'
    },
    'Bug': {
        'str': 'text-tag-bug',
        'bg': 'bg-bg-bug'
    },
    'Backend': {
        'str': 'text-tag-backend',
        'bg': 'bg-bg-backend'
    },
    'DevOps': {
        'str': 'text-tag-devops',
        'bg': 'bg-bg-devops'
    },
    'Docs': {
        'str': 'text-tag-docs',
        'bg': 'bg-bg-docs'
    },
    'Feature': {
        'str': 'text-tag-feature',
        'bg': 'bg-bg-feature'
    },
    'Research': {
        'str': 'text-tag-research',
        'bg': 'bg-bg-research'
    }
}