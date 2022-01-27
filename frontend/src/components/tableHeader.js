import { TableHead, TableRow, TableCell } from "@mui/material"

const TableHeader = () =>
{
    return (
        <TableHead>
            <TableRow>
                <TableCell><b>Sr No.</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Price </b></TableCell>
                <TableCell><b>Tags</b></TableCell>
                <TableCell><b>Add Ons</b></TableCell>
                <TableCell><b>Veg/Non-Veg</b></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    )
}

export default TableHeader;
