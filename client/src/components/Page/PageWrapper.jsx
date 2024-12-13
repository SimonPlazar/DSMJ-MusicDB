import {Box} from "@mui/system";


export function PageWrapper(props) {
    const {children, ...other} = props;

    return (
        <Box
            {...other}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                ...other.sx,
            }}
        >
            {children}
        </Box>
    );

}