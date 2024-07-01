import React, { useState } from 'react'
import Sidebar from './global/Sidebar'
import Topbar from './global/Topbar'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

const MainLayout = () => {
    const [isSidebar, setIsSidebar] = useState(true);
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Sidebar isSidebar={isSidebar} />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Topbar setIsSidebar={setIsSidebar} />
                <Box component="main" sx={{ mt: 2, overflow: 'auto' }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}

export default MainLayout