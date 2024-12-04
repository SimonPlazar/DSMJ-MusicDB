import {CheckBox as CheckBoxIcon, CheckBoxOutlineBlankOutlined} from "@mui/icons-material";
import {alpha, styled} from "@mui/material/styles";
import {IconButton} from "@mui/material";

const SelectButtonWraper = styled(IconButton)(({theme, isselecting}) => ({
    backgroundColor: isselecting === 'true' ? alpha(theme.palette.primary.main, 0.2) : 'transparent',
    '&:hover': {
        backgroundColor: isselecting === 'true' ? alpha(theme.palette.primary.main, 0.3) : alpha(theme.palette.common.white, 0.1),
    },
    transition: theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.shortest,
    }),
}));

export const SelectButton = ({isSelecting, setIsSelecting}) => {

    return (
        <SelectButtonWraper
            color="inherit"
            onClick={() => setIsSelecting(!isSelecting)}
            isselecting={isSelecting.toString()}
            aria-label="toggle selection mode"
        >
            {isSelecting ? <CheckBoxIcon/> : <CheckBoxOutlineBlankOutlined/>}
        </SelectButtonWraper>
    )
}