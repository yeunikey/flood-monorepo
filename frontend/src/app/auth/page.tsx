'use client'

import { api } from "@/api/instance";
import { ApiResponse, User } from "@/types";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import CodeModal from "@/components/pages/auth/CodeModal";

const imageLink = 'https://flomaster.top/uploads/posts/2023-01/1673515182_flomaster-club-p-pavodok-risunok-instagram-13.jpg';

export default function AuthPage() {

    const [type, setType] = useState<"LOGIN" | "REGISTER">("LOGIN");
    const [modal, setModal] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {

        if (email == "" || password == "") {
            toast("Заполните все данные", {
                type: "error"
            })
            return;
        }

        await api.post<ApiResponse<{ token: string, user: User }>>('/auth/login', {
            email: email,
            password: password
        })
            .then((response) => {

                if (response.data.statusCode == 400) {
                    toast(response.data.message, {
                        type: 'error',
                    })
                    return;
                }

                toast("Успешный вход!", {
                    type: 'success',
                })

                Cookies.set('token', response.data.data.token);

                window.location.href = "/"
            })
    }

    const handleCreate = async () => {

        if (email == "" || password == "") {
            toast("Заполните все поля", {
                type: 'error',
            })
            return;
        }

        await api.post<ApiResponse<null>>('/auth/register', {
            user: {
                email: email,
                password: password,
            }
        }).then((response) => {

            if (response.data.statusCode == 200) {
                toast("Вам на почту был отправлен код", {
                    type: 'warning',
                })

                setModal(true);
            } else {
                toast.error(response.data.message);
            }

        })
    }

    return (
        <div className="h-dvh w-full px-6 py-20 flex gap-16">

            <CodeModal email={email} open={modal} setOpen={setModal} />

            <Box sx={{ flexGrow: 1, bgcolor: 'primary.main', borderRadius: 4, overflow: 'hidden' }}>
                <img
                    className="w-full h-full object-cover"
                    src={imageLink}
                ></img>
            </Box>
            <div className="min-w-lg h-full flex flex-col justify-center items-center">
                <div className="w-72">
                    <Typography variant="h4" fontWeight={500} textAlign={'center'}>
                        Паводки
                    </Typography>
                    <Typography variant="body1" color="grey.700" marginTop={1} textAlign={'center'}>
                        Войдите в систему
                    </Typography>

                    <div className="flex flex-col gap-2 my-8">
                        <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Почта" variant="outlined" size="small" />
                        <TextField value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Пароль" variant="outlined" type='password' size="small" />
                    </div>

                    <Button variant="contained" className="w-full"
                        onClick={() => {
                            if (type == "LOGIN") {
                                handleLogin()
                            } else {
                                handleCreate()
                            }
                        }}
                    >
                        {type == "LOGIN" ? 'Войти' : 'Зарегестрировать'}
                    </Button>

                    <div className="w-full relative bg-gray-200 rounded-2xl h-1 my-8 flex justify-center items-center">
                        <div className="absolute bg-white px-4 text-gray-500">
                            или
                        </div>
                    </div>

                    <Button variant="text" className="w-full !text-gray-500"
                        onClick={() => {
                            setType(type == "LOGIN" ? "REGISTER" : "LOGIN")
                        }}
                    >
                        {type == "LOGIN" ? 'Нет аккаунта?' : "Есть аккаут?"}
                    </Button>

                </div>
            </div>
        </div >
    );
}