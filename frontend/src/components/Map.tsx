'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';

import mapboxgl from 'mapbox-gl';
import { useMap } from '@/hooks/map';

mapboxgl.accessToken = 'pk.eyJ1IjoieWV1bmlrZXkiLCJhIjoiY205cjdpbTV5MWxyazJpc2FiMWZ3NnVjaSJ9.Fm89p6MOyo_GqvT4uEXpeQ';

const Map = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const { setMap, loading } = useMap();

    useEffect(() => {
        if (!mapContainer.current) return;

        mapRef.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            center: [84, 49], // Координаты Алматы
            zoom: 10,
            attributionControl: false,
            logoPosition: 'top-left',
        });

        mapRef.current.addControl(new mapboxgl.ScaleControl());

        setMap(mapRef.current);

        return () => {
            mapRef.current?.remove();
        };
    }, []);

    return (
        <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
            {loading && (
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 10,
                        bgcolor: 'background.paper',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box sx={{ textAlign: 'center' }}>
                        <CircularProgress color="primary" />
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            Загрузка карты...
                        </Typography>
                    </Box>
                </Box>
            )}

            <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
        </Box>
    );
};

export default Map;
