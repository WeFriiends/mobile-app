import { Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import AddDateOfBirth from '../components/profileBuilder/AddDateOfBirth'
import AddGender from '../components/profileBuilder/AddGender'
// import AddImages from '../../components/profileBuilder/AddImages'
// import AddLocation from '../../components/profileBuilder/AddLocation'
import AddName from '../components/profileBuilder/AddName'
import AddStatus from '../components/profileBuilder/AddStatus'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../assets/svg/Logo";
import { Profile } from "../types/Profile";
import ProfileConstants from "../lib/ProfileConstants";
import ProfileQuestions from "../lib/ProfileQuestions.json";
import { Step } from "../types/Step";

type Key = keyof typeof ProfileQuestions;

const ProfileScreen = () => {
  const [profile, setProfile] = useState<Profile | null>();
  const [currentStep, setCurrentStep] = useState<Step>(
    ProfileQuestions[ProfileConstants.INITIAL_STEP_ID as Key]
  );
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //   console.log('current step ', currentStep)
  useEffect(() => {
    //  AsyncStorage.clear()  // - it's here for local development, clearing localStorage to imitate a new user
    getToken();
    getTemporaryProfile();
  }, []);

  const getToken = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      setToken(token);
    } else {
      //I think here it should show error screen? IDeally user would never land on this page if there is no token
      console.log("Token not found");
      //  return
    }
  };

  const getTemporaryProfile = async () => {
    const profile: Profile = JSON.parse(
      (await AsyncStorage.getItem("temporaryProfile")) as string
    );
    console.log("profile ", profile);
    if (profile) {
      setProfile(profile);
    }
  };

  const saveInput = async (
    value: string | Array<string> | {},
    action: string
  ) => {
    const profileCopy: Profile = profile as Profile;
    let profileToSave: Profile = { ...profileCopy, [currentStep.key]: value };
    setProfile(profileToSave);
    mergeItemToAsyncStorage(profileToSave);
    getNextQuestion(action);
  };

  const mergeItemToAsyncStorage = async (profileToSave: Profile) => {
    await AsyncStorage.setItem(
      "temporaryProfile",
      JSON.stringify(profileToSave),
      () => {
        AsyncStorage.mergeItem(
          "temporaryProfile",
          JSON.stringify(profileToSave)
        );
      }
    );
  };

  const navigateToPreviousStep = (action: string) => {
    getNextQuestion(action);
  };

  const getNextQuestion = (action: string) => {
    let nextStepId: string | null;
    if (action === "next") {
      nextStepId = currentStep.next;
    } else {
      nextStepId = currentStep.prev
        ? currentStep.prev
        : ProfileConstants.INITIAL_STEP_ID; //'c97c14ce-5936-428f-95b0-1347fa2bd056'
    }

    if (nextStepId) {
      const nextStep: Step = ProfileQuestions[nextStepId as Key];
      setCurrentStep(nextStep);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View
        style={{
          height: 80,
          marginTop: 30,
          overflow: "hidden",
        }}
      >
        <Logo />
      </View>
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <View style={{ marginTop: 0 }}>
          {currentStep.key === 'name' ? (
            <AddName
              step={currentStep}
              saveInput={saveInput}
              navigateToNextStep={getNextQuestion}
              name={profile?.name}
            />
          ) : null}
          {currentStep.key === 'gender' ? (
            <AddGender
              step={currentStep}
              saveInput={saveInput}
              navigateToPreviousStep={navigateToPreviousStep}
              gender={profile?.gender}
            />
          ) : null}
          {currentStep.key === 'dateOfBirth' ? (
            <AddDateOfBirth
              step={currentStep}
              dateOfBirth={profile?.dateOfBirth}
              navigateToPreviousStep={navigateToPreviousStep}
              saveInput={saveInput}
            />
          ) : null}
          {/* {currentStep.key === 'location' ? (
            <AddLocation
              step={currentStep}
              saveInput={saveInput}
              navigateToPreviousStep={navigateToPreviousStep}
            />
          ) : null} */}
          {currentStep.key === 'status' ? (
            <AddStatus
              step={currentStep}
              saveInput={saveInput}
              navigateToPreviousStep={navigateToPreviousStep}
              status={profile?.status as Array<string>}
            />
          ) : null}
          {/* {currentStep.key === 'images' ? (
            <AddImages
              step={currentStep}
              saveInput={saveInput}
              navigateToPreviousStep={navigateToPreviousStep}
            />
          ) : null} */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
