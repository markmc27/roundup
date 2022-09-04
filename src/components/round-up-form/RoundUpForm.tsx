import { Typography } from "@mui/material";
import Container from "@mui/material/Container";

interface RoundUpFormProps {
    accountName: string;
}

const RoundUpContainer = (props: RoundUpFormProps) => {
    const { accountName } = props;

    return (
        <Container maxWidth="sm">
            <Typography variant="body1">Account: {accountName}</Typography>
        </Container>
    )
}

export default RoundUpContainer;