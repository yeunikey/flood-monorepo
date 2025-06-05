import { api } from "@/api/instance";
import { ApiResponse, User } from "@/types";
import { Box, Button, Divider, Modal, TextField, Typography } from "@mui/material";
import Cookies from 'js-cookie';
import { useState } from "react";
import { toast } from "react-toastify";

interface ModalProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    email: string
}

function CodeModal({ open, setOpen, email }: ModalProps) {

    const [code, setCode] = useState('');

    const handleCode = async () => {

        if (code == '') {
            toast.error('Введите код')
            return;
        }

        await api.post<ApiResponse<{ token: string, user: User }>>('/auth/confirm', {
            email: email,
            code: code
        })
            .then((response) => {

                if (response.data.statusCode == 400) {
                    toast(response.data.message, {
                        type: 'error',
                    })
                    return;
                }

                Cookies.set('token', response.data.data.token);

                window.location.href = "/"

                toast("Успешное создание!", {
                    type: 'success',
                })
            })

    }

    return (
        <div className="test">
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 96 * 4,
                    bgcolor: 'background.paper',
                    p: 3,
                    borderRadius: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                }}>
                    <div className="flex flex-col gap-2">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Подтверждение аккаунта
                        </Typography>

                        <Typography variant="body2" color="text.secondary" margin={0}>{'Введите код из почты ' + email + ' ниже'}</Typography>

                        <Divider />
                    </div>
                    <div className="flex flex-col gap-3">
                        <TextField id="outlined-basic" value={code} onChange={(e) => setCode(e.target.value)} label="Код" variant="outlined" size="small" />
                    </div>

                    <div className="flex justify-end">
                        <Button variant="contained" onClick={handleCode}>Подтвердить</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default CodeModal;