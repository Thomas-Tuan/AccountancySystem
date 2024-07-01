import React from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "../components/common/RequireAuth";
import NotFound from "../scenes/NotFound";
import Dashboard from "../scenes/dashboard";
import SignUp from "../scenes/login/Register";
import SignIn from "../scenes/login/Signin";
import MainLayout from "../components/common/MainLayout";
import Team from "../scenes/team";
import { Box } from "@mui/material";
const UserRoutes = () => {
    return (
        <Box width={1}>
            <Routes>
                <Route path="/AccountancySystem/" element={<SignIn />} />
                <Route path="/" element={<SignIn />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
                <Route element={<RequireAuth />} >
                    <Route path="/dashboard" element={<MainLayout />}>
                        < Route index element={<Dashboard />} />
                    </Route>
                    <Route path="/team" element={<MainLayout />} >
                        < Route index element={<Team />} />
                    </Route>
                    {/* <Route path="/user" element={<MyProSidebar />} >
                        < Route index element={<UsersList />} />
                        <Route path="create" element={<AddEditUser />} />
                        <Route path="edit/:id" element={<AddEditUser />} />
                    </Route> */}
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Box>
    )
}

export default UserRoutes