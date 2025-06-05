'use client'

import { ApiResponse, Category, DataValue, Site, SiteType, Variable } from "@/types"
import { Box, Button, IconButton, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material"
import { useEffect, useState } from "react"

import CreateCategoryModal from "@/components/data/CreateCategoryModal"
import CreateHydropostModal from "@/components/data/AddModal"
import ImportModal from "@/components/data/ImportModal"
import Links from "@/components/LinkList"
import View from "@/components/View"
import { api } from "@/api/instance"
import { useAuth } from "@/hooks/auth"
import { useCategories } from "@/hooks/category"

export default function DataPage() {
    const { token } = useAuth();
    const { categories, setCategories } = useCategories();
    const [tab, setTab] = useState(0)

    const [fetching, setFetching] = useState(true);

    const [variables, setVariables] = useState<Variable[]>([]);
    const [dataValues, setDataValues] = useState<DataValue[]>([]);

    const [importModal, setImportModal] = useState(false);
    const [createCategoryModal, setCreateCategoryModal] = useState(false);

    const fetchDataValue = async () => {
        await api.get<ApiResponse<DataValue[]>>(`/data/category/${categories[tab].id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => {
                setDataValues(response.data.data)
            });
    }

    const fetchVariables = async () => {
        await api.get<ApiResponse<Variable[]>>(`/data/category/${categories[tab].id}/variables`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => {
                setVariables(response.data.data.reverse())
            });
    }

    const fetchCategories = async () => {
        setFetching(true);

        await api.get<ApiResponse<Category[]>>('/data/category', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => {
                setCategories(response.data.data)
                setFetching(false);
            });
    }

    useEffect(() => {
        if (categories.length === 0 || !categories[tab]) return;

        fetchVariables();
        fetchDataValue();
    }, [tab, categories]);

    useEffect(() => {
        if (categories.length != 0 || token == "") {
            return;
        }

        fetchCategories();
    }, [token]);

    if (fetching) {
        return (
            <div className="test">
                Loading
            </div>
        )
    }

    if (!fetching && categories.length == 0) {
        return (
            <View>

                <CreateCategoryModal open={createCategoryModal} setOpen={setCreateCategoryModal} />
                <ImportModal open={importModal} setOpen={setImportModal} />

                <Links>
                    <Typography sx={{ color: 'inherit' }}>Паводки</Typography>
                    <Typography sx={{ color: 'text.primary' }}>Общая информация</Typography>
                </Links>

                <div className="grow flex flex-col items-center justify-center">

                    <div className="text-xl">
                        В базе не хранятся никакие данные
                    </div>

                    <div className="flex gap-3 mt-6">
                        <Button variant="contained" disableElevation={true}
                            onClick={() => {
                                setCreateCategoryModal(true)
                            }}
                        >
                            Создать категорию
                        </Button>
                        <Button variant="contained" disableElevation={true}
                            onClick={() => {
                                // setHydropostModal(true)
                            }}
                        >
                            Импортировать
                        </Button>
                    </div>

                </div>
            </View>
        )
    }

    return (
        <View>

            {/* <CreateHydropostModal open={hydropostModal} setOpen={setHydropostModal} /> */}
            <CreateCategoryModal open={createCategoryModal} setOpen={setCreateCategoryModal} />
            <ImportModal open={importModal} setOpen={setImportModal} category={categories[tab]} />

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
                    {categories.map((category) => (
                        <Tab key={category.id} label={category.name} />
                    ))}
                </Tabs>

                <div className="flex flex-col gap-2 mt-6">
                    <div className="flex gap-2">
                        <Button variant="contained" size="small" disableElevation={true}
                            onClick={() => {
                                setCreateCategoryModal(true)
                            }}
                        >
                            Создать категорию
                        </Button>
                        <Button variant="contained" size="small" disableElevation={true}
                            onClick={() => {
                                // setHydropostModal(true)
                            }}
                        >
                            Добавить
                        </Button>
                        <Button variant="contained" size="small" disableElevation={true}
                            onClick={() => {
                                setImportModal(true);
                            }}
                        >Импортировать</Button>
                        {/* <Button variant="outlined" size="small" disableElevation={true} onClick={handleDownload}>Экспортировать .csv</Button> */}
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    {variables.map((variable) => {
                                        return (
                                            <TableCell key={variable.id} align="right">{variable.name}</TableCell>
                                        )
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(
                                    dataValues.reduce((acc, item) => {
                                        const siteCode = item.catalog.site.code;
                                        if (!acc[siteCode]) {
                                            acc[siteCode] = {
                                                site: item.catalog.site,
                                                values: {},
                                            };
                                        }
                                        acc[siteCode].values[item.catalog.variable.name] = item.value;
                                        return acc;
                                    }, {} as Record<string, { site: Site; values: Record<string, number> }>)
                                ).map(([siteCode, { site, values }]) => (
                                    <TableRow key={siteCode}>
                                        <TableCell>{siteCode}</TableCell>
                                        {variables.map((variable) => (
                                            <TableCell key={variable.id} align="right">
                                                {values[variable.name] ?? "-"}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}

                                {/* {sites.map((site) => (
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
                                ))} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Box>

        </View>
    )
}