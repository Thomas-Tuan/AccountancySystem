import PublishIcon from '@mui/icons-material/Publish';
import { Box, Button, CircularProgress, Grid, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import categoryApi from "../../api/categoryApi";
import Header from "../../components/Header";
import { tokens } from "../../theme";
const TeamAccount = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", cellClassName: "id-column--cell", },
    {
      field: "server",
      headerName: "Sàn",
      flex: 1,
    },
    {
      field: "idAccount",
      headerName: "MT4ID",
      cellClassName: "mt4id-column--cell",
    },
    {
      field: "name",
      headerName: "Tên KH",
    },
    {
      field: "in",
      headerName: "IN",
      flex: 1,
    },
    {
      field: "out",
      headerName: "OUT",
      flex: 1,
    },
    {
      field: "preEquity",
      headerName: "Pre-Equity",
    },
    {
      field: "endEquity",
      headerName: "End-Equity",
    },
    {
      field: "lot",
      headerName: "Lot",
    },
    {
      field: "profit_Loss",
      headerName: "Profit",
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    fetchCategoryList();
  }, [])

  const fetchCategoryList = async () => {
    try {
      const response = await categoryApi.getAll();
      setIsLoading(false);
      setCategories(response);
    } catch (error) {
      console.log("Error to fetch API: ", error.message);
    }
  }

  const fileInputRef = useRef(null);

  const uploadExcel = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await categoryApi.uploadExcel(formData)
      window.location.reload();
      toast.success(response.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    catch (err) {
      if (err.response && err.response.data !== undefined) {
        toast.error(err.response.data.errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log(`Error to login with ${err.response.data.errorMessage}`);
      }
    }
  };

  return (
    <Grid container spacing={2}  >
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Header title="Danh sách các phiên làm việc của a" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box ml={2} mr={2} sx={{ display: { md: 'flex', xs: 'block', }, justifyContent: { md: "end", xs: 'none', }, }}>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept=".xlsx"
              />
              <Button
                onClick={uploadExcel}
                sx={{
                  "&:hover": {
                    backgroundColor: `${colors.primary[700]} !important`,
                  },
                  backgroundColor: colors.primary[500],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                <PublishIcon sx={{ mr: "10px" }} />
                Nhập file excel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .id-column--cell, .mt4id-column--cell": {
              color: colors.blueAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.primary[500],
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaderTitle ": {
              fontWeight: 'bold',
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.primary[500],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          {isLoading ?
            <Box sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
            >
              <CircularProgress sx={{
                m: 2
              }} />
              <Typography>Đang tải dữ liệu...</Typography>
            </Box> :
            <DataGrid checkboxSelection rows={categories} columns={columns} />
          }
        </Box>
      </Grid>
    </Grid>
  );
};

export default TeamAccount;
