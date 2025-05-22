import { Site, SiteType } from "@/types";
import { create } from "zustand";

type SitesType = {
    sites: Site[];
    types: SiteType[];

    setSites: (sites: Site[]) => void;
    setTypes: (siteType: SiteType[]) => void;

};

export const useSite = create<SitesType>((set) => ({
    sites: [],
    types: [],

    setSites: (sites) => set({
        sites: sites
    }),
    setTypes: (types) => set({
        types: types
    }),
}));