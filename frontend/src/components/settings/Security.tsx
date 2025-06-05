'use client'

import { ApiResponse, User } from "@/types";
import { Button, IconButton, TextField } from "@mui/material";

import CheckIcon from '@mui/icons-material/Check';
import Loading from "@/components/Loading";
import SendIcon from '@mui/icons-material/Send';
import { api } from "@/api/instance";
import { cn } from "@/util/utils";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/auth";
import { useState } from "react";

function SettingsSecurity() {

    const { user, token, setUser } = useAuth();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [waitingCode, setWaitingCode] = useState(false);
    const [mail, setMail] = useState('');
    const [code, setCode] = useState('');

    const [fetching, setFetching] = useState(false);

    const changePassword = async () => {

        if (oldPassword == ""
            || newPassword == ""
            || repeatPassword == ""
        ) {
            toast("Заполните все поля", {
                type: 'error',
            })
            return;
        }

        if (newPassword != repeatPassword) {
            toast("Пароли не совпадают", {
                type: 'error',
            })
            return;
        }

        setFetching(true);

        await api.post('/auth/change-password', {
            oldPassword: oldPassword,
            newPassword: newPassword,
            repeatPassword: repeatPassword
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response) => {

            setFetching(false);

            if (response.data.statusCode == 400) {
                toast(response.data.message, {
                    type: 'error',
                })
                return;
            }

            toast("Успешно сохранено!", {
                type: 'success',
            })

        })

    }

    const changeMail = async () => {

        if (waitingCode) {
            return;
        }

        if (mail == "") {
            toast("Заполните все поля", {
                type: 'error',
            })
            return;
        }

        await api.post('/auth/change-mail', {
            newMail: mail
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(({ data: req }) => {

            if (req.statusCode == 400) {
                toast(req.message, {
                    type: 'error',
                })
                return;
            }

            setWaitingCode(true);

            toast("Вам на новую почту отправлено письмо!", {
                type: 'warning',
            })

        })
    }

    const confirmMail = async () => {

        if (!waitingCode) {
            return;
        }

        if (code == "") {
            toast("Заполните все поля", {
                type: 'error',
            })
            return;
        }

        await api.post<ApiResponse<User>>('/auth/confirm-mail', {
            email: mail,
            code: code
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(({ data: req }) => {

            if (req.statusCode == 400) {
                return;
            }

            setWaitingCode(false);
            setUser(req.data)

            toast("Успешно сохранено!", {
                type: 'success',
            })

        })

    }

    if (!user || fetching) {
        return <Loading className="w-full mt-32 flex justify-center items-center"></Loading>
    }

    return (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

            <div
                className="flex flex-col gap-6"
            >
                <div className="text-2xl font-semibold">
                    Смена пароля
                </div>

                <div className="flex flex-col gap-3">
                    <TextField
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        label="Старый пароль"
                        type="password"
                        className="w-full"
                        variant="outlined"
                    ></TextField>

                    <TextField
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        label="Новый пароль"
                        type="password"
                        className="w-full"
                        variant="outlined"
                    ></TextField>

                    <TextField
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        label="Повтор пароля"
                        type="password"
                        className="w-full"
                        variant="outlined"
                    ></TextField>
                </div>

                <Button
                    variant="contained"
                    className="mt-3 w-fit"
                    onClick={changePassword}
                    disableElevation
                >
                    Сохранить
                </Button>
            </div>

            <div
                className="flex flex-col gap-6"
            >
                <div className="text-2xl font-semibold">
                    Почта
                </div>

                <div className="flex flex-col gap-3">
                    <div className={cn(!true ? 'opacity-100' : 'opacity-75', 'transition-all')}>
                        <div
                            className="flex gap-2"
                        >
                            <TextField
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                type="email"
                                className="w-full"
                                label="Почта"
                                variant="outlined"
                            ></TextField>

                            <IconButton
                                className="h-14 w-14"
                                onClick={changeMail}
                            >
                                <SendIcon />
                            </IconButton>
                        </div>
                    </div>

                    <div className={cn(waitingCode ? 'opacity-100' : 'opacity-25 pointer-events-none', 'transition-all')}>
                        <div
                            className="flex gap-2"
                        >
                            <TextField
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder={'Код'}
                                type="text"
                                className="w-full"
                                variant="outlined"
                            ></TextField>

                            <IconButton
                                className="h-14 w-14"
                                onClick={confirmMail}
                            >
                                <CheckIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SettingsSecurity;