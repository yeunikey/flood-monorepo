'use client'

import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/auth";
import { useState } from "react";

function SettingsMap() {

    const { user } = useAuth();

    const [fetching, setFetching] = useState(false);

    if (!user || fetching) {
        return <Loading className="w-full mt-32 flex justify-center items-center"></Loading>
    }

    return (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 ">

            <div
                className="flex flex-col gap-6"
            >
                <div className="text-2xl font-semibold">
                    Проекция
                </div>

                <div className="flex gap-3">
                    <div className="bg-gray-100 grow">
                        hello
                    </div>
                    <div className="bg-gray-100 grow">
                        hello
                    </div>
                    <div className="bg-gray-100 grow">
                        hello
                    </div>
                </div>

            </div>
        </div >
    );
}

export default SettingsMap;