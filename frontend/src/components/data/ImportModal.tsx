import { ApiResponse, Category, Site, SiteType } from "@/types";
import { Box, Button, Divider, List, ListItemButton, ListItemText, Modal, Typography } from "@mui/material";

import Loading from "../Loading";
import Papa from "papaparse";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { api } from "@/api/instance";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/auth";
import { useState } from "react";

interface ModalProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    category?: Category
}

function ImportModal({ open, setOpen, category }: ModalProps) {

    const { token } = useAuth();
    const [parsedData, setParsedData] = useState<any[]>([]);

    const [loading, setLoading] = useState(false);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        setLoading(true);

        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                let json = JSON.parse(text);

                if (!Array.isArray(json)) {
                    toast.error("Файл должен содержать массив объектов");
                    return;
                }

                if (category) {
                    json = json.map((data) => ({
                        ...data,
                        category
                    }));
                }

                setParsedData(json);
                console.log("Загруженные данные:", json);

                setLoading(false);
            } catch (err) {
                console.error("Ошибка парсинга JSON:", err);
                toast.error("Неверный формат .json файла");
            }
        };

        reader.onerror = () => {
            toast.error("Не удалось прочитать файл");
        };

        reader.readAsText(file);
    };

    const [fetching, setFetching] = useState(false);

    const handleSave = async () => {

        if (fetching) {
            toast.warning('Ожидайте ответа')
            return;
        }

        if (parsedData.length == 0) {
            toast.error('.json файл пуст')
            return;
        }

        setLoading(true);
        setFetching(true);

        await api.post<ApiResponse<Site[]>>('/data/upload', parsedData,
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

                setOpen(false);

            });

    };

    return (
        <div>
            <Modal
                open={open}
                onClose={() => {
                    setParsedData([]);
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
                            Импортировать данные
                        </Typography>
                        <Typography variant="body2" color="text.secondary" margin={0}>
                            Перетащите .json файл с данными
                        </Typography>
                        <Divider />
                    </div>

                    {loading ? (
                        <Loading className="flex justify-center items-center my-12" />
                    ) : (
                        <>
                            {parsedData.length == 0
                                ? (
                                    <label htmlFor="json-upload">
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
                                            id="json-upload"
                                            accept=".json"
                                            style={{ display: "none" }}
                                            onChange={handleFileUpload}
                                        />
                                    </label>
                                )
                                : (
                                    <Box>
                                        <Typography variant="body1" sx={{ mb: 1 }}>{'Найдено ' + parsedData.length + ' объектов'}</Typography>
                                        <List sx={{ maxHeight: (96 * 3), overflowY: 'scroll' }}>
                                            {parsedData.map((data, i) => {
                                                return (
                                                    <ListItemButton key={i}>
                                                        <ListItemText primary={data.catalog.variable.name} secondary={'#' + data.catalog.site.name} />
                                                    </ListItemButton>
                                                )
                                            })}
                                        </List>
                                    </Box>
                                )}
                        </>
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

export default ImportModal;