import { Avatar, Card, CardContent, Typography } from "@mui/material";

const ProfileDetails = ({ profile }) => {
  return (
    <Card
      className="mx-auto my-20 flex gap-10 p-10 bg-green-50 border-2 rounded-xl"
      sx={{ maxWidth: 500, maxHeight: 350 }}
    >
      <Avatar
        src={profile.avatar}
        alt={profile.first_name}
        variant="rounded"
        sx={{ height: 128, width: 128 }}
      />
      <CardContent className="block">
        <Typography variant="h6" className="text-5xl">
          {profile.id}
        </Typography>
        <Typography variant="body1">
          {profile.first_name} {profile.last_name}
        </Typography>
        <Typography variant="subtitle2">{profile.email}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileDetails;
