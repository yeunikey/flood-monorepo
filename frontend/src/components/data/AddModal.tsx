import { ApiResponse, Site } from "@/types";
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";

import { api } from "@/api/instance";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/auth";
import { useState } from "react";

interface ModalProps {
    open: boolean,
    setOpen: (open: boolean) => void
}

function CreateHydropostModal({ open, setOpen }: ModalProps) {
    const { types } = useSite();
    const { token } = useAuth();

    const { sites, setSites } = useSite();
    const [type, setType] = useState(1);

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [altitude, setAltitude] = useState('');
    const [longtitude, setLongtitude] = useState('');

    const [fetching, setFetching] = useState(false);

    const handleCreate = async () => {

        if (fetching) {
            toast.warning('Ожидайте ответа')
            return;
        }

        if (name == "" || code == '' || altitude == '' || longtitude == '') {
            toast.error('Заполните все поля')
            return;
        }

        setFetching(true);

        const body = {
            name: name,
            code: code,
            siteType: type,
            altitude: altitude,
            longtitude: longtitude

        };

        await api.post<ApiResponse<Site>>('/sites', body,
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then(({ data }) => {

                if (data.statusCode != 200) {
                    toast.error(data.message);
                }

                toast.success('Успешно создано!')
                const newSites = sites;
                newSites.push(data.data);
                setSites(newSites);

                setOpen(false);

            });
    }

    return (
        <div className="test">
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 96 * 5,
                    bgcolor: 'background.paper',
                    p: 3,
                    borderRadius: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                }}>
                    <div className="flex flex-col gap-2">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Создать гидропост
                        </Typography>

                        <Typography variant="body2" color="text.secondary" margin={0}>Заполните все поля ниже</Typography>

                        <Divider />
                    </div>
                    <div className="flex flex-col gap-3">
                        <TextField id="outlined-basic" label="Код" variant="outlined" size="small" value={code} onChange={(e) => setCode(e.target.value)} />
                        <TextField id="outlined-basic" label="Название" variant="outlined" size="small" value={name} onChange={(e) => setName(e.target.value)} />
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">Тип</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                label="Тип"
                                onChange={(e) => {
                                    setType(Number(e.target.value))
                                }}
                            >
                                {types.map((type) => {
                                    return (
                                        <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <TextField id="outlined-basic" label="Долгота" variant="outlined" size="small" value={longtitude} onChange={(e) => setLongtitude(e.target.value)} />
                        <TextField id="outlined-basic" label="Широта" variant="outlined" size="small" value={altitude} onChange={(e) => setAltitude(e.target.value)} />
                    </div>

                    <div className="flex justify-end">
                        <Button variant="contained" onClick={handleCreate}>Сохранить</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default CreateHydropostModal;