import { Avatar, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { useSite } from "@/hooks/sites";

interface TypesProps {
    selected: number,
    setSelected: (selected: number) => void,
}

function SiteTypes({ selected, setSelected }: TypesProps) {
    const { types } = useSite();

    return (
        <List>
            {types.map((type, i) => {
                return (
                    <ListItemButton
                        key={type.id}
                        sx={{
                            bgcolor: types[selected].id == type.id ? 'grey.100' : '',
                        }}
                        className={`**:transition-all duration-300`}
                        onClick={() => {
                            setSelected(i)
                        }}
                    >

                        <Avatar
                            sx={{ mr: '16px' }}
                        >
                            <GpsFixedIcon />
                        </Avatar>

                        <ListItemText primary={
                            <Typography fontWeight={500}>{type.name}</Typography>
                        } secondary={type.description} />

                    </ListItemButton>
                )
            })}
        </List>
    );
}

export default SiteTypes;