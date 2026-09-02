# Технологии проекта littleKanban

Документ объясняет, что используется в проекте, зачем именно эта технология выбрана и как конкретно она применяется в коде - с реальными фрагментами из проекта, а не общими описаниями из документации.

---

## Стек в двух словах

| Категория | Технология |
|---|---|
| Фреймворк | React 19 |
| Язык | TypeScript |
| Сборщик | Vite |
| Стили | Tailwind CSS v4 |
| Состояние | Zustand (+ persist) |
| Drag-and-drop | @dnd-kit/react |
| Вспомогательные утилиты | class-variance-authority, clsx, tailwind-merge, nanoid |
| Линтинг | ESLint + typescript-eslint, Prettier |

---

## React 19

Основной UI-фреймворк. Приложение - чистый client-side SPA без роутинга (доска состоит из одного экрана, поэтому React Router не подключался — добавлять его сейчас было бы оверинжинирингом).

Из React используются только базовые примитивы: `useState` (локальное состояние формы в `AddTaskModal`)  и стандартный JSX. Специфичные для React 19 фичи (Server Components, `use()`, React Compiler) в проекте не задействованы — обычная клиентская SPA-модель.

```tsx
// src/main.tsx — точка входа
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## TypeScript

Строгая типизация домена. Ядро всей типовой системы — три типа в `entities/task/model/Task.ts`:

```ts
export type Status = 'todo' | 'in progress' | 'done'
export type Tag = 'Design' | 'Bug' | 'Docs' | 'Backend' | 'Feature' | 'DevOps' | 'Research'
export type Task = {
    id: string,
    title: string,
    description?: string,
    status: Status,
    tag: Tag
}
```

`Status` и `Tag` — не `string`, а строковые литеральные union-типы. Это даёт две вещи:
1. Автодополнение в IDE при написании `task.status === '...'`.
2. Компилятор не даст присвоить статусу задачи произвольную строку — опечатка вроде `'todoo'` будет найдена на этапе сборки, а не в рантайме.

Эти типы переиспользуются насквозь — `Record<Status, StatusColor>` в `statusColors.ts`, дженерик `Select<T>` в форме добавления задачи, аргумент `moveTask(id: string, status: Status)` в сторе. Один источник правды для допустимых значений статуса/тега.

---

## Vite

Дев-сервер и сборщик. Конфиг (`vite.config.ts`) минимальный — два плагина:

```ts
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

---

## Tailwind CSS v4

Вся стилизация — utility-классами прямо в JSX, без отдельных CSS-модулей (кроме `App.css`, где объявлены шрифты и кастомная тема). Ключевая часть — секция `@theme` в `src/app/App.css`:

```css
@theme {
    --color-status-todo: rgb(239, 68, 68);
    --color-status-done: rgb(34, 197, 94);
    --color-tag-design: rgb(139, 92, 246);
    --font-inter: 'Inter', sans-serif;
    ...
}
```

Это особенность Tailwind v4 — вместо `tailwind.config.js` с JS-объектом темы, кастомные цвета/шрифты/тени объявляются прямо в CSS через `@theme`, и Tailwind автоматически генерирует из них классы вида `bg-status-todo`, `text-tag-design`, `font-inter`. Именно поэтому в проекте нет `tailwind.config.js` — в v4 он в большинстве случаев не нужен.

Цвета статусов/тегов не захардкожены в компонентах, а **замаплены через объекты-словари**:

```ts
// src/entities/task/model/statusColors.ts
export const statusColors: StatusColors = {
   'todo': { solid: 'bg-status-todo', shadow: 'shadow-status-todo' },
   'in progress': { solid: 'bg-status-in-progress', shadow: 'shadow-status-in-progress' },
   'done': { solid: 'bg-status-done', shadow: 'shadow-status-done' },
}
```
Компонент `StatusDot` просто получает готовые имена классов и подставляет их — цветовая схема статуса лежит в одном месте, а не размазана по компонентам с `if/else`.

---

## Zustand (+ persist)

В проекте два независимых стора:

**`entities/task/model/store.ts`** — данные всех задач (единственный источник правды для доски):
```ts
export const useTaskDraft = create<TaskDraftStore>()(
    persist(
        (set) => ({
            draft: initialDraft,
            addTask: (task) => set((state) => ({ draft: [...state.draft, {...task, id: nanoid()}] })),
            moveTask: (id, status) => set((state) => ({
                draft: state.draft.map((task) => task.id === id ? { ...task, status } : task)
            })),
            removeTask: (id) => set((state) => ({
                draft: state.draft.filter((task) => task.id !== id)
            }))
        }),
        { name: 'taskDraft', partialize: (state) => ({ draft: state.draft }) }
    )
)
```
`persist` — middleware, которое автоматически сериализует стор в `localStorage` при каждом изменении и восстанавливает его при загрузке страницы, поэтому задачи не пропадают после обновления вкладки. `partialize` явно ограничивает, что именно сохраняется — только массив `draft`, а не функции-экшены (их и нельзя сериализовать в JSON).

**`features/addTask/model/ModalStore.ts`** — чисто UI-состояние (открыта/закрыта модалка добавления задачи), намеренно отдельно от данных задач — открытие формы не имеет отношения к самим задачам, поэтому персистить его не нужно (и не нужно, чтобы модалка "запоминала" своё состояние между визитами).

Любой компонент подписывается на нужный кусок стора через хук: `const {draft} = useTaskDraft()` — при изменении `draft` перерендерятся только компоненты, которые его читают, а не всё дерево.

---

## @dnd-kit/react

Drag-and-drop между колонками канбан-доски. Это новое поколение dnd-kit (пакет `@dnd-kit/react`, а не классический `@dnd-kit/core`) — API построено вокруг хуков `useDraggable`/`useDroppable` и провайдера `DragDropProvider`.

**Draggable-элемент** — каждая карточка задачи:
```tsx
// TaskCard.tsx
const {ref} = useDraggable({id, type: 'task'})
```

**Droppable-зона** — каждая колонка, `id` колонки равен статусу:
```tsx
// DeskColumn.tsx
const {isDropTarget, ref} = useDroppable({id, accept: 'task'})
```
`accept: 'task'` ограничивает, что колонка примет только элементы с `type: 'task'` — защита от случайных совпадений, если в будущем в проекте появится другой перетаскиваемый тип сущностей.

**Обработка сброса** — в `KanbanBoard.tsx`:
```tsx
<DragDropProvider onDragEnd={(e) => {
  if (e.canceled) return
  const { target, source } = e.operation
  if (!target || !source) return
  moveTask(source.id as string, target.id as Status)
}}>
```
Поскольку `id` колонки — это и есть строка статуса (`'todo' | 'in progress' | 'done'`), `target.id` можно напрямую передать в `moveTask` без промежуточного маппинга "id колонки → статус".

---

## class-variance-authority (CVA)

Библиотека для типобезопасных вариантов стилей компонента — альтернатива ручным тернаркам вида `variant === 'primary' ? '...' : '...'`.

```ts
// shared/ui/buttonVariants.ts
export const buttonVariants = cva(
  'flex justify-center cursor-pointer items-center bg-neutralbg ...', // базовые классы для любой кнопки
  {
    variants: {
      variant: {
        modalCancel: 'w-full font-inter text-statusgray text-sm ...',
        addTask: 'font-inter font-semibold rounded-[10px] bg-gradient-to-br ...',
        deleteTask: 'bg-[linear-gradient(135deg,rgb(216, 18, 11),transparent)]'
      }
    },
    defaultVariants: { variant: 'modalCancel' },
  }
);
```
`cva()` возвращает функцию: `buttonVariants({variant: 'addTask'})` вернёт готовую строку классов (базовые + классы конкретного варианта). Плюс — `VariantProps<typeof buttonVariants>` в `Button.tsx` даёт автокомплит и проверку типов на сам проп `variant` в JSX, опечатка в названии варианта — ошибка компиляции, а не молча неприменённый стиль.

---

## clsx + tailwind-merge (через `cn()`)

Стандартная для Tailwind-проектов пара утилит, обёрнутая в свою функцию:

```ts
// shared/lib/cn.ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
- `clsx` — склеивает классы, умеет пропускать `false`/`undefined`/`null` (удобно для условных классов: `clsx('base', isActive && 'active')`).
- `tailwind-merge` — разрешает конфликты Tailwind-классов по смыслу, а не по порядку в строке. Например, `cn('px-2', className)`, где снаружи передали `className="px-4"` — без `tailwind-merge` в DOM попали бы оба класса и результат зависел бы от порядка в CSS-файле; `twMerge` понимает, что оба класса управляют одним и тем же свойством (`padding-inline`), и оставляет только последний.

Используется во всех переиспользуемых компонентах, которые принимают `className` снаружи — `Button`, `Input`, `StatusDot`, `TagBar` — паттерн "дать компоненту дефолтные стили, но разрешить перекрыть их извне".

---

## nanoid

Генерация коротких уникальных id для новых задач:
```ts
addTask: (task) => set((state) => ({
    draft: [...state.draft, { id: nanoid(), ...task }]
}))
```
Выбран вместо `crypto.randomUUID()` из-за меньшей длины строки (удобнее при отладке в DevTools/`localStorage`) и вместо инкрементного счётчика — потому что счётчик пришлось бы синхронизировать при персисте в `localStorage` (что было последним id при перезагрузке страницы), а `nanoid()` от этой проблемы избавляет по конструкции.

---

## Архитектура: Feature-Sliced Design (FSD)

Код разложен по слоям `app → widgets → features → entities → shared`, импорты идут строго сверху вниз (виджет может импортировать из фичи и сущности, но не наоборот):

- **`app/`** — точка сборки приложения (`App.tsx`, глобальные стили).
- **`widgets/`** — крупные независимые блоки страницы: `Header`, `KanbanBoard` (с внутренним `DeskColumn`).
- **`features/addTask/`** — конкретное пользовательское действие "добавить задачу": кнопка, модалка, стор состояния самой модалки (открыта/закрыта).
- **`entities/task/`** — сама сущность "задача": тип `Task`, стор данных всех задач, карточка задачи (`TaskCard`) как визуальное представление сущности.
- **`shared/`** — переиспользуемые вещи без знания о домене: UI-примитивы (`Button`, `Input`, `Select`, `Modal`) и утилита `cn()`.

Проверка на практике: `Button` из `shared/ui` ничего не знает про задачи или канбан-доску — его можно вынуть в отдельный npm-пакет без единой правки. А `TaskCard` из `entities/task/ui` уже завязан на тип `Task`, но ничего не знает про фичу добавления задачи — так и должно быть.
