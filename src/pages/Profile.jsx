import useProfileData from "../hooks/useProfileData";
import ProfileDetails from "../components/ProfileDetails";
import { useParams } from "react-router";

const ProfilePage = ({ profileId, layout = "full" }) => {
  const { id } = useParams();
  profileId = id;
  const { loading, profile, error } = useProfileData(profileId);

  const FullLayoutProfile = ({ profile }) => (
    <>
      <ProfileDetails profile={profile} />
    </>
  );

  const CompactLayoutProfile = ({ profile }) => (
    <>
      <div>{profile.first_name}</div>
    </>
  );

  if (loading) return <div>Loading Profile...</div>;
  if (error) return <div>Error:{error}</div>;
  if (!profile) return <div>Profile not found.</div>;

  const LayoutComponent =
    layout === "compact" ? CompactLayoutProfile : FullLayoutProfile;

  return (
    <>
      <LayoutComponent profile={profile} />
    </>
  );
};

export default ProfilePage;
