'use client'

import Links from "@/components/LinkList";
import Security from "@/components/pages/settings/Security";
import SettingsImage from "@/components/pages/settings/SettingsImage";
import View from "@/components/View";
import { Typography, Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

export default function SettingsPage() {

    const [tab, setTab] = useState(0)

    return (
        <View>

            <Links>
                <Typography sx={{ color: 'inherit' }}>Паводки</Typography>
                <Typography sx={{ color: 'text.primary' }}>Настройки</Typography>
            </Links>

            <Box sx={{ px: 3, py: 2, flexGrow: 1 }}>
                <Tabs
                    value={tab}
                    onChange={(e: React.SyntheticEvent, n: number) => {
                        setTab(n)
                    }}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Безопасность" />
                    <Tab label="Изображение" />
                </Tabs>

                {tab == 0 && (<Security />)}
                {tab == 1 && (<SettingsImage />)}
            </Box>

        </View>
    )
}