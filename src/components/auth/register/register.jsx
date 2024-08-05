import { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/slices/authSlice';
import './register.scss';

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    useSelector((state) => state.auth);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 

    const onSubmit = async (data) => {
        try {
            const resultAction = await dispatch(registerUser(data));
            if (registerUser.fulfilled.match(resultAction)) {
                setSnackbarMessage('Bạn đã đăng ký thành công');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                setTimeout(() => {
                    navigate('/login'); 
                }, 1000);
            } else {
                setSnackbarMessage(resultAction.payload || 'Đăng ký thất bại');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setSnackbarMessage('Đã xảy ra lỗi trong quá trình đăng ký');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="text-center">
                                                <h1 className="mt-1 mb-5 pb-1">ĐĂNG KÝ</h1>
                                            </div>
                                            <p>Vui lòng đăng ký tài khoản</p>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    id="username"
                                                    className="form-control"
                                                    placeholder="Nhập tên"
                                                    {...register('username', { required: 'Tên là bắt buộc' })}
                                                />
                                                {errors.username && <small className="text-danger">{errors.username.message}</small>}
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    className="form-control"
                                                    placeholder="Nhập email"
                                                    {...register('email', {
                                                        required: 'Email là bắt buộc',
                                                        pattern: {
                                                            value: /\S+@\S+\.\S+/,
                                                            message: 'Email không hợp lệ'
                                                        }
                                                    })}
                                                />
                                                {errors.email && <small className="text-danger">{errors.email.message}</small>}
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="password"
                                                    id="password"
                                                    className="form-control"
                                                    placeholder="Nhập password"
                                                    {...register('password', {
                                                        required: 'Mật khẩu là bắt buộc',
                                                        minLength: {
                                                            value: 6,
                                                            message: 'Mật khẩu phải có ít nhất 6 ký tự'
                                                        }
                                                    })}
                                                />
                                                {errors.password && <small className="text-danger">{errors.password.message}</small>}
                                            </div>
                                            <div className="form-check d-flex justify-content-center mb-4">
                                                <input
                                                    className="form-check-input me-2"
                                                    type="checkbox"
                                                    value=""
                                                    id="registerCheck"
                                                    defaultChecked
                                                    aria-describedby="registerCheckHelpText"
                                                />
                                                <label className="form-check-label">
                                                    Tôi đã đọc và đồng ý với các điều khoản
                                                </label>
                                            </div>
                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button type="submit" className="btn btn-block fa-lg gradient-custom-2 mb-3 btn-login">
                                                    ĐĂNG KÝ
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4 text-center">
                                        <h2 className="mb-4">Chào bạn</h2>
                                        <p className="small mb-0">Đăng ký với thông tin cá nhân của bạn để sử dụng tất cả các tính năng của trang web</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </section>
    );
}

export default Register;
