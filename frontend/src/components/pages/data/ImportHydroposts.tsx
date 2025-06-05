import { Box, Button, Divider, List, ListItemButton, ListItemText, Modal, Typography } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { ApiResponse, Site, SiteType } from "@/types";
import { useState } from "react";
import Papa from "papaparse";
import { toast } from "react-toastify";
import { api } from "@/api/instance";
import { useAuth } from "@/hooks/auth";
import { useSite } from "@/hooks/sites";

interface ModalProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    type: SiteType
}


interface SiteCSV {
    name: string;
    code: string;
    altitude: number;
    longtitude: number;
}

function ImportHydropostsModal({ open, setOpen, type }: ModalProps) {

    const { token } = useAuth();
    const [parsedData, setParsedData] = useState<SiteCSV[]>([]);
    const { sites, setSites } = useSite();

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        Papa.parse<SiteCSV>(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const cleaned = results.data.filter((row) => (
                    row.name != "" && row.code != ""
                )).map((row) => (
                    {
                        name: row.name,
                        code: row.code,
                        altitude: Number(row.altitude),
                        longtitude: Number(row.longtitude),
                        siteType: {
                            id: type.id
                        }
                    }
                ));

                setParsedData(cleaned);
                console.log(cleaned)
            },
            error: () => {
                toast.error('Не удалось распарсить этот .csv файл')
            }
        });
    };

    const [fetching, setFetching] = useState(false);

    const handleSave = async () => {

        if (fetching) {
            toast.warning('Ожидайте ответа')
            return;
        }

        if (parsedData.length == 0) {
            toast.error('.csv файл пуст')
            return;
        }

        setFetching(true);

        await api.post<ApiResponse<Site[]>>('/sites/upload', parsedData,
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
                for (const site of data.data) {
                    newSites.push(site);
                }
                setSites(newSites);

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
                            Импортировать гидропосты
                        </Typography>
                        <Typography variant="body2" color="text.secondary" margin={0}>
                            Перетащите .csv файл с гидропостами
                        </Typography>
                        <Divider />
                    </div>

                    {parsedData.length == 0
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
                                    accept=".csv"
                                    style={{ display: "none" }}
                                    onChange={handleFileUpload}
                                />
                            </label>
                        )
                        : (
                            <Box>
                                <Typography variant="body1" sx={{ mb: 1 }}>{'Найдено ' + parsedData.length + ' объектов'}</Typography>
                                <List sx={{ maxHeight: (96 * 3), overflowY: 'scroll' }}>
                                    {parsedData.map((csv, i) => {
                                        return (
                                            <ListItemButton key={i}>
                                                <ListItemText primary={csv.name} secondary={'#' + csv.code} />
                                            </ListItemButton>
                                        )
                                    })}
                                </List>
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

export default ImportHydropostsModal;