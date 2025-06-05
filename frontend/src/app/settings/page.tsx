'use client'

import { Box, Tab, Tabs, Typography } from "@mui/material";

import Links from "@/components/LinkList";
import SettingsImage from "@/components/settings/SettingsImage";
import SettingsMap from "@/components/settings/SettingsMap";
import SettingsSecurity from "@/components/settings/Security";
import View from "@/components/View";
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
                    <Tab label="Карта" />
                    <Tab label="Безопасность" />
                    <Tab label="Изображение" />
                </Tabs>

                {tab == 0 && (<SettingsMap />)}
                {tab == 1 && (<SettingsSecurity />)}
                {tab == 2 && (<SettingsImage />)}
            </Box>

        </View>
    )
}