import { Autocomplete, TextField } from "@mui/material";

const AutoComplete = ({value, options, set, label, minWidth, maxWidth}) => {
    return (
        <Autocomplete
            options={options}
            style={{ minWidth: minWidth !== undefined ? minWidth : null, maxWidth: maxWidth !== undefined ? maxWidth : null }}
            onChange={(_, value) => set(value)}
            value={value}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    variant="outlined"
                />
            )}
          />
    )
}

export default AutoComplete;
