# МебельщикЪ — статья (Material Design 3 + Aurora)

React + TypeScript + Vite + Tailwind. Структура **shadcn/ui**: `src/components/ui`, алиас `@/`, утилита `cn` в `src/lib/utils.ts`.

## Почему `components/ui`

Так совпадает с конвенцией shadcn: переиспользуемые примитивы (Card, Button, фон Aurora) лежат рядом, а CLI `npx shadcn@latest add …` ожидает пути из `components.json`.

## shadcn CLI и путь проекта

На машине с путём, содержащим кириллицу (например, папка «сайт»), команда `shadcn init` может не находить `tailwind.config.js`. Конфиг и компоненты добавлены вручную; при переносе проекта в каталог только с ASCII-путём можно снова запускать CLI.

## Команды

```bash
npm install
npm run dev
npm run build
```

Тема сохраняется в `localStorage` под ключом `mebel-theme`; до гидрации класс `dark` выставляется скриптом в `index.html`, чтобы не мигал фон.

## Маршруты (отдельные «вкладки»)

| Путь | Раздел |
|------|--------|
| `/` | Главная (статья) |
| `/uslugi` | Услуги |
| `/galereya` | Галерея |
| `/otzyvy` | Отзывы |
| `/kontakty` | Контакты |

Навигация через **React Router** (`NavLink`). На странице контактов боковая колонка с дублем контактов скрыта — блок один на странице. Для статического хостинга нужен fallback на `index.html` для всех путей (например, в настройках Netlify/Vercel или `try_files` в nginx).
