import { Grid, TextField  } from "@mui/material";

const CustomGrid = ({label, value, onChange, type}) => {
    return (
        <Grid item xs={12}>
            <TextField
                label={label}
                type={type !== undefined ? type : "text"}
                variant="outlined"
                value={value}
                onChange={onChange}
                sx = {{ minWidth: "400px", minHeight: "60px" }}
            />
        </Grid>
    );
};

export default CustomGrid;
