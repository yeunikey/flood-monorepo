'use client'

import { ApiResponse, Site, SiteType } from "@/types";
import { Divider, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import Links from "@/components/LinkList";
import Loading from "@/components/Loading";
import Map from "@/components/Map";
import SiteTypes from "@/components/pages/objects/SiteTypes";
import View from "@/components/View";
import { api } from "@/api/instance";
import mapboxgl from "mapbox-gl";
import { useAuth } from "@/hooks/auth";
import { useMap } from "@/hooks/map";
import { useSite } from "@/hooks/sites";

export default function ObjectsPage() {

    const { token } = useAuth();
    const { types, setTypes, sites, setSites } = useSite();

    const [selected, setSelected] = useState(0);
    const [fetching, setFetching] = useState(true);

    const { map, setLoading } = useMap();

    const markerRefs = useRef<mapboxgl.Marker[]>([]);

    useEffect(() => {
        if (!map || sites.length === 0) return;

        const addMarkers = () => {

            markerRefs.current.forEach(marker => marker.remove());
            markerRefs.current = [];

            for (const site of sites) {
                const marker = new mapboxgl.Marker()
                    .setLngLat([site.longtitude, site.altitude])
                    .setPopup(new mapboxgl.Popup().setText(site.name))
                    .addTo(map);

                markerRefs.current.push(marker);
            }
        };

        if (!map.isStyleLoaded()) {
            map.once('load', addMarkers);
        } else {
            addMarkers();
        }

        return () => {
            markerRefs.current.forEach(marker => marker.remove());
            markerRefs.current = [];
        };

    }, [map, sites]);

    const fetchData = async () => {
        await api.get<ApiResponse<Site[]>>('/sites/filter?site_type=' + types[selected].id, {
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
                setFetching(false);
            })
    }

    useEffect(() => {
        if (token == "" || types.length != 0) {
            setFetching(false);
            return;
        }

        fetchTypes();
    }, [token])

    useEffect(() => {

        if (map == null) {
            return;
        }

        map.on('load', () => {
            setLoading(false);
        });

    }, [map])

    useEffect(() => {
        if (types.length == 0) {
            return;
        }

        fetchData();
    }, [selected, types]);

    return (
        <View>

            <Links>
                <Typography sx={{ color: 'inherit' }}>Паводки</Typography>
                <Typography sx={{ color: 'text.primary' }}>Объекты</Typography>
            </Links>

            <div className="flex grow relative">
                <div className={`transition-all duration-300 overflow-y-auto h-[calc(100dvh-8rem)] min-w-72`}>

                    {fetching
                        ? (
                            <div className="w-full h-full flex justify-center items-center">
                                <Loading />
                            </div>
                        )
                        : (
                            <>
                                <SiteTypes selected={selected} setSelected={setSelected} />
                            </>
                        )}

                </div>

                <Divider orientation="vertical" />

                <div className="overflow-y-auto h-[calc(100dvh-8rem)] min-w-72 bg-white">
                    <List>
                        {sites.map((site, i) => {
                            return (
                                <ListItemButton key={i} onClick={() => {
                                    if (map == null) {
                                        return;
                                    }

                                    map.flyTo({
                                        center: [site.longtitude, site.altitude],
                                        zoom: 12,
                                        speed: 1.2
                                    })
                                }}>
                                    <ListItemText primary={site.name} secondary={'#' + site.code} />
                                </ListItemButton>
                            )
                        })}
                    </List>
                </div>

                <Divider orientation="vertical" />

                <div className="w-full h-full">
                    <Map />
                </div>

            </div>

        </View >
    )
}