import { ApiResponse, Category, Site } from "@/types";
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";

import { api } from "@/api/instance";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/auth";
import { useCategories } from "../../hooks/category";
import { useState } from "react";

interface ModalProps {
    open: boolean,
    setOpen: (open: boolean) => void
}

function CreateCategoryModal({ open, setOpen }: ModalProps) {
    const { token } = useAuth();
    const { categories, setCategories } = useCategories();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [fetching, setFetching] = useState(false);

    const handleCreate = async () => {

        if (fetching) {
            toast.warning('Ожидайте ответа')
            return;
        }

        if (name == "" || description == '') {
            toast.error('Заполните все поля')
            return;
        }

        setFetching(true);

        const body = {
            name, description,
        };

        await api.post<ApiResponse<Category>>('/data/category', body,
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

                const newCategories = categories;
                newCategories.push(data.data);
                setCategories(categories);

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
                            Создать категорию
                        </Typography>

                        <Typography variant="body2" color="text.secondary" margin={0}>Заполните все поля ниже</Typography>

                        <Divider />
                    </div>
                    <div className="flex flex-col gap-3">
                        <TextField id="outlined-basic" label="Название" variant="outlined" size="small" value={name} onChange={(e) => setName(e.target.value)} />
                        <TextField id="outlined-basic" label="Описание" variant="outlined" size="small" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="flex justify-end">
                        <Button variant="contained" onClick={handleCreate}>Сохранить</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default CreateCategoryModal;