'use client'

import { ApiResponse, Layer } from "@/types";
import { Box, Divider, IconButton, List, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import AddModal from "@/components/pages/layers/AddModal";
import LayerItem from "@/components/pages/layers/LayerItem";
import Links from "@/components/LinkList";
import Map from "@/components/Map";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import View from "@/components/View";
import { api } from "@/api/instance";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/auth";
import { useLayers } from "@/hooks/layers";
import { useMap } from "@/hooks/map";

export default function HomePage() {
  const { token } = useAuth();
  const [modal, setModal] = useState(false);

  const { map, setLoading } = useMap();

  const { layers, setLayers } = useLayers();

  const fetchLayers = async () => {
    await api.get<ApiResponse<Layer[]>>('/layers/my', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then(({ data }) => {
      if (data.statusCode != 200) {
        toast.error(data.message);
        return;
      }
      setLayers(data.data);
    })
  }

  useEffect(() => {
    if (token == "" || layers.length != 0) {
      return;
    }

    fetchLayers();
  }, [token])

  useEffect(() => {
    if (!map || layers.length === 0) return;

    if (map.loaded()) {
      addLayers();
    } else {
      map.once('load', addLayers);
    }

    function addLayers() {

      if (map == null) {
        return;
      }

      for (const layer of layers) {
        if (!map.getSource(String(layer.file))) {
          map.addSource(String(layer.file), {
            type: 'geojson',
            data: `http://localhost:3001/v1/files/${layer.file}`,
          });

          map.addLayer({
            id: `${layer.file}-outline`,
            type: 'line',
            source: String(layer.file),
            layout: {},
            paint: {
              'line-color': '#04b5f5',
              'line-width': 2,
            },
          });

          if (layer.name == 'Озера') {
            map.addLayer({
              id: `${layer.file}-fill`,
              type: 'fill',
              source: String(layer.file),
              layout: {},
              paint: {
                'fill-color': '#04b5f5',
              },
            });
          }
        }
      }

      setLoading(false);
    }
  }, [map, layers]);

  return (
    <View>

      <AddModal open={modal} setOpen={setModal} />

      <Links>
        <Typography sx={{ color: 'inherit' }}>Паводки</Typography>
        <Typography sx={{ color: 'text.primary' }}>Слои</Typography>
      </Links>

      <Box sx={{ display: 'flex', height: '100%' }}>
        <div className="w-72">

          <div className="px-3 py-0.5">
            <Tooltip title="Загрузить слои" placement="right">
              <IconButton onClick={() => setModal(true)}>
                <NoteAddIcon color="primary" />
              </IconButton>
            </Tooltip>
          </div>

          <Divider />

          <List>
            {layers.map((layer) => {
              return (
                <LayerItem key={layer.id} layer={layer} />
              )
            })}
          </List>

        </div>

        <Divider orientation="vertical" />

        <div className="w-full h-full">
          <Map />
        </div>
      </Box>
    </View>
  )
}