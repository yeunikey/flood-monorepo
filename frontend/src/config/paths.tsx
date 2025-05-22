import LayersIcon from '@mui/icons-material/Layers';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import GestureIcon from '@mui/icons-material/Gesture';

const ways = [
    {
        text: "Слои",
        icon: <LayersIcon />,
        path: '/'
    },
    {
        text: "Объекты",
        icon: <ViewInArIcon />,
        path: '/objects'
    },
    {
        text: "Визуализация",
        icon: <GestureIcon />,
        path: '/visual'
    },
    null,
    {
        text: "Общая информация",
        icon: <LibraryBooksIcon />,
        path: '/data'
    },
    {
        text: "Статистика",
        icon: <SignalCellularAltIcon />,
        path: '/stats'
    },
    null,
    {
        text: "Настройки",
        icon: <SettingsIcon />,
        path: '/settings'
    },
]

export {
    ways
}