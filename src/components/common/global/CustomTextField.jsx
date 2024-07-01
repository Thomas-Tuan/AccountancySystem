import { Select, TextField } from "@mui/material";
import { useField } from "formik";

export const FormikTextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : '';

    return (
        <TextField
            {...field}
            {...props}
            label={label}
            color="secondary"
            helperText={errorText}
            error={!!errorText}
            variant="outlined"
            sx={{
                '& .MuiInputBase-root': {
                    borderRadius: 3,
                },
                borderRadius: 12,
                mb: 2,
            }}
        />
    );
};
export const CustomizedSelectForRoleFormik = ({ children, form, field }) => {
    const { name, value } = field;
    const { setFieldValue } = form;

    if (children) {
        return (
            <Select
                value={value}
                color="secondary"
                name={name}
                fullWidth
                onChange={(e) => {
                    setFieldValue(name, e.target.value);
                }}
                sx={{
                    textAlign: "start",
                    '& .MuiInputBase-root': {
                        borderRadius: 3,
                    },
                    borderRadius: 2,
                    mb: 2,
                }}
            >
                {children}
            </Select>
        );
    }
};