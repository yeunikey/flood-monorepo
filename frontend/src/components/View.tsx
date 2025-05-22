'use client'

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AppBar, DrawerHeader, Drawer } from '@/components/mixin/view';
import { ways } from '@/config/paths';
import { useRouter } from 'next/navigation';
import { Avatar, InputBase, Menu, MenuItem, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { deepOrange } from '@mui/material/colors';
import { useAuth } from '@/hooks/auth';
import Cookies from 'js-cookie';

interface ViewProps {
    children?: React.ReactNode
}

function View({ children }: ViewProps) {
    const theme = useTheme();
    const router = useRouter();
    const { user } = useAuth();

    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const { setToken, setUser } = useAuth();

    const logout = () => {
        setToken('');
        setUser(null);

        Cookies.remove('token');

        router.push('/auth')
    }

    return (
        <Box sx={{ display: 'flex', height: '100dvh', maxHeight: '100dvh' }}>

            <AppBar position="fixed" open={open} elevation={0} >
                <Toolbar className='flex justify-between'>
                    <div className="flex items-center">
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={[
                                {
                                    marginRight: 5,
                                },
                                open && { display: 'none' },
                            ]}
                        >
                            <MenuOpenIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Паводки
                        </Typography>
                    </div>

                    <div className="flex items-center gap-6">
                        <Paper
                            component="form"
                            sx={{ p: '0 4px', display: 'flex', alignItems: 'center', width: 400 }}
                            elevation={0}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1, fontSize: 14 }}
                                placeholder="Поиск населённых пунктов, гидропостов или других объектов"
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                        <Avatar
                            sx={{
                                bgcolor: deepOrange[500]
                            }}
                            onClick={(e) => {
                                setAnchorEl(e.currentTarget)
                            }}
                            src={user?.image ? 'http://localhost:3001/v1/images/' + user.image : undefined}
                        >
                            A
                        </Avatar>

                        <Menu
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={() => {
                                setAnchorEl(null)
                            }}
                            onClick={() => {
                                setAnchorEl(null)
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={() => {
                                router.push('settings')
                            }}>
                                <Typography>Настройки</Typography>
                            </MenuItem>
                            <MenuItem onClick={logout}>
                                <Typography color="error">Выйти</Typography>
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />

                {(() => {
                    const groups: (typeof ways[number][] | null)[] = [];
                    let currentGroup: typeof ways[number][] = [];

                    ways.forEach((item) => {
                        if (item === null) {
                            if (currentGroup.length > 0) {
                                groups.push(currentGroup);
                                currentGroup = [];
                            }
                            groups.push(null);
                        } else {
                            currentGroup.push(item);
                        }
                    });

                    if (currentGroup.length > 0) {
                        groups.push(currentGroup);
                    }

                    return groups.map((group, groupIndex) => {
                        if (group === null) {
                            return <Divider key={`divider-${groupIndex}`} />;
                        }

                        return (
                            <List key={`list-${groupIndex}`}>
                                {group.map((item, index) => (
                                    <ListItem key={index} disablePadding sx={{ display: 'block' }}
                                        onClick={() => {
                                            if (!item) {
                                                return;
                                            }

                                            router.push(item?.path);
                                        }}
                                    >
                                        <ListItemButton
                                            sx={[
                                                { minHeight: 48, px: 2.5 },
                                                open
                                                    ? { justifyContent: 'initial' }
                                                    : { justifyContent: 'center' },
                                            ]}
                                        >
                                            <ListItemIcon
                                                sx={[
                                                    { minWidth: 0, justifyContent: 'center' },
                                                    open ? { mr: 3 } : { mr: 'auto' },
                                                ]}
                                            >
                                                {item?.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item?.text}
                                                sx={[
                                                    open
                                                        ? { opacity: 1 }
                                                        : { opacity: 0 },
                                                ]}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        );
                    });
                })()}
            </Drawer>

            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: 'full' }}>
                <Toolbar />
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

export default View;