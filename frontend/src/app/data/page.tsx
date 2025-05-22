'use client'

import { api } from "@/api/instance"
import Links from "@/components/LinkList"
import CreateHydropostModal from "@/components/pages/data/CreateHydropostModal"
import ImportHydropostsModal from "@/components/pages/data/ImportHydroposts"
import View from "@/components/View"
import { useAuth } from "@/hooks/auth"
import { useSite } from "@/hooks/sites"
import { ApiResponse, Site, SiteType } from "@/types"
import { Box, Button, IconButton, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete'
import { toast } from "react-toastify"

export default function DataPage() {

    const [tab, setTab] = useState(0)

    const [hydropostModal, setHydropostModal] = useState(false);
    const [importModal, setImportModal] = useState(false);

    const { token } = useAuth();
    const { types, setTypes, sites, setSites } = useSite();

    // const [fetching, setFetching] = useState(true);

    const handleDownload = async () => {
        const headers = ['name', 'code', 'altitude', 'longtitude'];
        const rows = sites.map(site =>
            [site.name, site.code, site.altitude, site.longtitude]
        );

        const csvContent =
            [headers, ...rows]
                .map(e => e.join(','))
                .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sites.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleDelete = async (site_id: number) => {
        await api.delete<ApiResponse<Site[]>>('/sites?site_id=' + site_id, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(({ data }) => {
                if (data.statusCode != 200) {
                    toast.error(data.message);
                }

                setSites(sites.filter(s => s.id != site_id))

            });
    }

    const fetchData = async () => {
        await api.get<ApiResponse<Site[]>>('/sites/filter?site_type=' + types[tab].id, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => {
                setSites(response.data.data)
            });
    }

    const fetchTypes = async () => {
        await api.get<ApiResponse<SiteType[]>>('/sites/types', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(({ data }) => {
                setTypes(data.data);
            }).finally(() => {
                // setFetching(false);
            })
    }

    useEffect(() => {
        if (token == "" || types.length != 0) {
            // setFetching(false);
            return;
        }

        fetchTypes();
    }, [token])

    useEffect(() => {
        if (types.length == 0) {
            return;
        }

        fetchData();
    }, [tab, types]);

    return (
        <View>

            <CreateHydropostModal open={hydropostModal} setOpen={setHydropostModal} />
            <ImportHydropostsModal open={importModal} setOpen={setImportModal} type={types[tab]} />

            <Links>
                <Typography sx={{ color: 'inherit' }}>Паводки</Typography>
                <Typography sx={{ color: 'text.primary' }}>Общая информация</Typography>
            </Links>

            <Box sx={{ px: 2 }}>
                <Tabs
                    value={tab}
                    onChange={(e: React.SyntheticEvent, n: number) => {
                        setTab(n)
                    }}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Гидропосты" />
                    <Tab label="Метеостанции" />
                </Tabs>

                <div className="flex flex-col gap-2 mt-6">
                    <div className="flex gap-2">
                        <Button variant="contained" size="small" disableElevation={true}
                            onClick={() => {
                                setHydropostModal(true)
                            }}
                        >
                            Добавить
                        </Button>
                        <Button variant="contained" size="small" disableElevation={true}
                            onClick={() => {
                                setImportModal(true);
                            }}
                        >Импортировать .csv</Button>
                        <Button variant="outlined" size="small" disableElevation={true} onClick={handleDownload}>Экспортировать .csv</Button>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Название</TableCell>
                                    <TableCell align="right">Код</TableCell>
                                    <TableCell align="right">Широта</TableCell>
                                    <TableCell align="right">Долгота</TableCell>
                                    <TableCell align="right">Действия</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sites.map((site) => (
                                    <TableRow
                                        key={site.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {site.name}
                                        </TableCell>
                                        <TableCell align="right">{site.code}</TableCell>
                                        <TableCell align="right">{Number(site.altitude).toFixed(1)}</TableCell>
                                        <TableCell align="right">{Number(site.longtitude).toFixed(1)}</TableCell>

                                        <TableCell align="right">
                                            <IconButton
                                                color="error"
                                                onClick={() => {
                                                    handleDelete(site.id)
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Box>

        </View>
    )
}