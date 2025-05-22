import { ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography, Collapse, Switch, Button, Divider } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Layer } from "@/types";
import { api } from "@/api/instance";
import { toast } from "react-toastify";
import { useLayers } from "@/hooks/layers";
import { useAuth } from "@/hooks/auth";

interface LayerProps {
    layer: Layer
}

function LayerItem({ layer }: LayerProps) {
    const { layers, setLayers } = useLayers();
    const { token } = useAuth();

    const [open, setOpen] = useState(false);

    const deleteLayer = async () => {
        await api.get('/layers/delete', {
            headers: {
                Authorization: 'Bearer ' + token
            },
            params: {
                layer_id: layer.id
            }
        })
            .then(({ data }) => {
                if (data.statusCode != 200) {
                    toast.error(data.message);
                    return;
                }

                setLayers(layers.filter(l => l.id != layer.id));
                window.location.href = '/';
            })
    }

    return (
        <>
            <ListItemButton
                onClick={() => {
                    setOpen(!open)
                }}
            >

                <ListItemAvatar>
                    <Avatar>
                        <InsertDriveFileIcon />
                    </Avatar>
                </ListItemAvatar>

                <ListItemText primary={
                    <Typography fontWeight={500}>{layer.name}</Typography>
                } secondary="regions.geojson" />

            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <div className="px-2 py-1 flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <Typography variant="body2">
                            Показывать на карте
                        </Typography>
                        <Switch defaultChecked size="small" />
                    </div>

                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />}
                        onClick={deleteLayer}
                    >
                        Delete
                    </Button>
                </div>
                <Divider sx={{ pt: 1 }} />
            </Collapse>
        </>
    );
}

export default LayerItem;