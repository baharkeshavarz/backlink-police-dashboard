import { Icons } from "@/components/common/icons";
import { Box, Typography } from "@mui/material";

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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      p={4}
      borderRadius={2}
      bgcolor={"common.white"}
    >
      <Box
        sx={{
          bgcolor: color,
          width: 78,
          height: 75,
          borderRadius: "41%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box height={70} flex={1}>
        <Typography variant="body1" color="grey.800" mb={1}>
          {title}
        </Typography>
        <Box display="flex" gap={1.3}>
          <Box display="flex">
            <Typography
              fontSize={32}
              fontWeight="bold"
              lineHeight={1.3}
              color="grey.900"
            >
              {value}
            </Typography>
          </Box>
          <Box display="flex" alignItems="flex-end">
            <Box display="flex" alignItems="center">
              {diffPositive ? (
                <Icons.FaCaretUp
                  fontSize={24}
                  color={diffPositive ? "#41D4AA" : "#E25457"}
                />
              ) : (
                <Icons.FaCaretDown
                  fontSize={24}
                  color={diffPositive ? "#41D4AA" : "#E25457"}
                />
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
    </Box>
  );
};

export default StatCard;
