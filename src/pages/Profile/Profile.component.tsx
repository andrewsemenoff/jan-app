import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { Title } from "../../App.style";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ChipsEditableField from "../../components/chips-editable-field/chips-editable-field";
import EditableField from "../../components/editable-field/editable-field.component";
import {
  editUserCity,
  editUserCommunities,
  editUserCountry,
  editUserEducation,
  editUserName,
  selectEductionLevels,
  selectUser,
} from "../../features/account/accountSlice";
import {
  AdditionalInfo,
  MainInfo,
  ProfileCard,
  ProfilePageWrapper,
} from "./Profile.styles";
import { selectCommunitiesNames } from "../../features/communities/communitiesSlice";

const Profile = () => {
  const allCommunities = useAppSelector(selectCommunitiesNames);
  const dispatch = useAppDispatch();
  const educationLevels = useAppSelector(selectEductionLevels);
  const {
    username,
    email,
    educationLevel,
    communities,
    activities,
    avatar,
    location,
    password,
    roles,
    stats,
    wallet,
  } = useAppSelector(selectUser);
  const [education, setEducation] = useState(educationLevel);
  return (
    <ProfilePageWrapper>
      <ProfileCard>
        <MainInfo>
          <Avatar
            alt={username}
            src={avatar}
            style={{ width: "5em", height: "5em" }}
          />
          <EditableField
            handleSaveChanges={(name) =>
              dispatch(editUserName(name))
            }
            title="display name"
            valueFromStore={username}
          />
          <div>
            mail:
            <Title style={{ wordWrap: "break-word" }}>{email}</Title>
          </div>
        </MainInfo>
        <AdditionalInfo>
          <EditableField
            handleSaveChanges={(education) =>
              dispatch(editUserEducation(education))
            }
            title="education"
            valueFromStore={educationLevel}
            isSelectable
            itemsForSelect={educationLevels}
          />
          <EditableField
            handleSaveChanges={(country) => dispatch(editUserCountry(country))}
            title="county"
            valueFromStore={location.country}
          />
          <EditableField
            handleSaveChanges={(city) => dispatch(editUserCity(city))}
            title="city"
            valueFromStore={location.city}
          />
          <div>
            communities:
            <ChipsEditableField defaultItems={allCommunities} handleSaveChanges={(communities)=> dispatch(editUserCommunities(communities))} initialChips={communities} />
          </div>
        </AdditionalInfo>
      </ProfileCard>
    </ProfilePageWrapper>
  );
};

export default Profile;
