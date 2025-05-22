import { Layer } from "@/types";
import { create } from "zustand";

type LayersType = {
    layers: Layer[];
    setLayers: (layers: Layer[]) => void;
};

export const useLayers = create<LayersType>((set) => ({
    layers: [],
    setLayers: (layers) => set({
        layers: layers
    }),
}));