"use client"

import { useAuth } from "@/hooks/auth";
import { api, vapi } from "@/api/instance";
import { ApiResponse, SavedImage, User } from "@/types";
import { toast } from "react-toastify";
import { useState } from "react";
import Loading from "@/components/Loading";
import { Button, styled } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function SettingsImage() {
    const { user, token, setUser } = useAuth();

    const [fetching, setFetching] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const changeImage = async () => {

        if (file == null) {
            toast("Пожалуйста, выберите изображение", { type: "warning" });
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setFetching(true);

            const imageRes = await vapi.post<ApiResponse<SavedImage>>(
                "/images/upload",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                }
            );

            if (imageRes.data.statusCode === 400) {
                toast(imageRes.data.message, { type: "error" });
                return;
            }

            const updateRes = await api.post<ApiResponse<User>>(
                "/users/update",
                {
                    "image": imageRes.data.data.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            setUser(updateRes.data.data);
            toast("Аватар успешно обновлён!", { type: "success" });

        } catch {
            toast("Ошибка при загрузке изображения", { type: "error" });
        } finally {
            setFetching(false);
        }
    };

    if (!user || fetching) {
        return <Loading className="w-full mt-32 grow flex justify-center items-center" />;
    }

    return (
        <div className="mt-6 flex flex-wrap gap-12">

            <div
                className="flex flex-col gap-6"
            >
                <div className="text-2xl font-semibold">
                    Изменить изображение
                </div>

                <div className="flex gap-3">
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload files
                        <VisuallyHiddenInput
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                                if (event.currentTarget.files == null) {
                                    return;
                                }
                                setFile(event.currentTarget.files[0])
                            }}
                        />
                    </Button>
                    <Button
                        variant="contained"
                        className="mt-3 w-fit"
                        onClick={changeImage}
                        disableElevation
                    >Сохранить</Button>
                </div>

                <img
                    src={"http://localhost:3001/v1/images/" + user.image}
                    alt="logo"
                    className="w-48 h-48 bg-muted rounded-full object-cover"
                    width={1024}
                    height={1024}
                >
                </img>

            </div>
        </div>
    );
}

export default SettingsImage;