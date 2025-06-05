import { Box, Button, Divider, Modal, TextField, Typography } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { ApiResponse, Layer, SavedFile } from "@/types";
import { useState } from "react";
import { toast } from "react-toastify";
import { api, vapi } from "@/api/instance";
import { useAuth } from "@/hooks/auth";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface ModalProps {
    open: boolean,
    setOpen: (open: boolean) => void,
}

function AddModal({ open, setOpen }: ModalProps) {

    const { token } = useAuth();

    const [name, setName] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [fetching, setFetching] = useState(false);

    const handleSave = async () => {

        if (fetching) {
            toast.warning('Ожидайте ответа')
            return;
        }

        if (name == '') {
            toast.error('Вы не ввели название файла');
            return;
        }

        if (file == null) {
            toast.error('.geojson файл пуст')
            return;
        }

        setFetching(true);

        try {

            const formData = new FormData();
            formData.append("file", file);

            setFetching(true);

            const fileRes = await vapi.post<ApiResponse<SavedFile>>(
                "/files/upload",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                }
            );

            if (fileRes.data.statusCode === 400) {
                toast(fileRes.data.message, { type: "error" });
                return;
            }

            const layerRes = await api.post<ApiResponse<Layer>>('/layers/create', {
                file: fileRes.data.data.id,
                name: name
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            if (layerRes.data.statusCode == 400) {
                toast(layerRes.data.message, { type: "error" });
                return;
            }

            setOpen(false);
            setName('');
            setFile(null);
            toast("Файл успешно загружен!", { type: "success" });

            window.location.href = '/';

        } catch {
            toast("Ошибка при загрузке файла", { type: "error" });
        } finally {
            setFetching(false);
        }

    };

    return (
        <div>
            <Modal
                open={open}
                onClose={() => {
                    setName('');
                    setFile(null);
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
                            Загрузить слои
                        </Typography>

                        <Typography variant="body2" color="text.secondary" margin={0}>Введите название и загрузите файл в формате (.geojson, .geotiff)</Typography>

                        <Divider />
                    </div>

                    <TextField id="outlined-basic" label="Название объекта" variant="outlined" size="small"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />


                    {file == null
                        ? (
                            <label htmlFor="csv-upload">
                                <Box
                                    sx={{
                                        height: 160,
                                        borderRadius: 4,
                                        border: '2px dashed',
                                        borderColor: 'text.secondary',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 1.5,
                                        bgcolor: 'background.paper',
                                        cursor: 'pointer',
                                        transition: '0.3s',
                                        '&:hover': { bgcolor: 'action.hover' },
                                    }}
                                >
                                    <UploadFileIcon color="disabled" sx={{ fontSize: 48 }} />
                                    <Typography variant="body1" color="textDisabled" fontWeight={500}>
                                        Перетащите сюда файл
                                    </Typography>
                                </Box>
                                <input
                                    type="file"
                                    id="csv-upload"
                                    accept=".geojson"
                                    style={{ display: "none" }}
                                    onChange={(e) => {
                                        if (e.target.files == null) {
                                            return;
                                        }
                                        setFile(e.target.files[0]);
                                    }}
                                />
                            </label>
                        )
                        : (
                            <Box sx={{ display: 'flex', gap: 6 }}>
                                <Typography>Загружен файл:</Typography>
                                <div className="flex items-center gap-3">
                                    <CloudUploadIcon color="primary" />
                                    <Typography color="primary.main">{file.name}</Typography>
                                </div>
                            </Box>
                        )}

                    <div className="flex justify-end">
                        <Button variant="contained" onClick={handleSave}>
                            Сохранить
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div >
    );
}

export default AddModal;