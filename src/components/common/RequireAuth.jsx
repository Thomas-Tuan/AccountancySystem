import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const RequireAuth = () => {

    const location = useLocation();
    const getUserSession = sessionStorage.getItem('userAccount');
    const accountInfo = JSON.parse(getUserSession);

    if (accountInfo && !accountInfo.isLock) {
        return <Outlet />
    }
    else if (accountInfo === null) {
        toast.error("Tài khoản không có quyền truy cập !!!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    else {
        toast.warning("Tài khoản đang bị khóa !!!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
}

export default RequireAuth