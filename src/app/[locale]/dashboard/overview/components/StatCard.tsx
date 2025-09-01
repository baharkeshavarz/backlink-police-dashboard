import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { Icons } from "@/components/common/icons";

interface StatCardProps {
  title: string;
  value: string;
  diff: string;
  diffPositive?: boolean;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({
  title,
  value,
  diff,
  diffPositive,
  icon,
  color,
}: StatCardProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
        <Box
            sx={{
            bgcolor:color,
            width: 64,
            height: 64,
            borderRadius: "41%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}
        >
            {icon}
        </Box>
        <Box height={70}>
            <Typography variant="body1" color="grey.800" mb={1}>
              {title}
            </Typography>
            <Box display="flex" gap={1} >
             <Box
                display="flex"
                alignItems="flex-end"
              >
               <Typography fontSize={32} fontWeight="bold" color="grey.900">
                {value}
              </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="flex-end"
              >
               <Box
                display="flex"
                alignItems="center"
              >
                  {diffPositive ? (<Icons.FaCaretUp fontSize={24} color={diffPositive ? "#41D4AA" : "#E25457"}/>
                ) : (<Icons.FaCaretDown fontSize={24}  color={diffPositive ? "#41D4AA" : "#E25457"}/>
                )}
                <Typography
                  variant="body1"
                  fontWeight={600}
                  color={diffPositive ? "#41D4AA" : "#E25457"}
                 >
                {diff}
              </Typography>
              </Box>
              </Box>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default StatCard;
