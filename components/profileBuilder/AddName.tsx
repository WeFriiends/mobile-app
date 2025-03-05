import { ScrollView, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";

import Data from "../Data";
import ErrorIndicator from "../ErrorIndicator";
import Prompt from "../Prompt";
import { Step } from "../../types/Step";
import { TextInput } from "react-native-paper";
import { View } from "react-native";
import LockOrientation from "../../utils/LockOrientation";
import NextStepButton from "../ui/NextStepButton";

type AddNameProps = {
  name: string | undefined;
  step: Step;
  navigateToNextStep: (action: string) => void;
  saveInput: (value: string, action: string) => void;
};

const NAME_REGEX: RegExp = /^[\p{L} ]{2,15}$/u;

// /^\s*(?:(?!\s\s)[\p{L}'-]{2,}(?:\s[\p{L}'-]+)?){1,15}\s*$/u

const AddName = (props: AddNameProps) => {
  const [name, setName] = useState<string>("");
  const [initialName, setInitialName] = useState<string | undefined>(
    props.name
  );
  const [isError, setIsError] = useState<boolean>(false);
  const [isInputValidated, setIsInputValidated] = useState<boolean>(false);
  const [orientation, setOrientation] = useState<number>(1);

  //(/^[a-zA-Z\u00C0-\u00FF\u0100-\u017F\u0180-\u024F ']+(?:-[a-zA-Z\u00C0-\u00FF\u0100-\u017F\u0180-\u024F ']+){0,14}$/
  //.test(value))

  useEffect(() => {
    if (props.name) {
      setName(props.name);
      setIsInputValidated(true);
    }
    getOrientation();
  }, [props.name]);

  const getOrientation = async () => {
    const orientation = await LockOrientation();
    setOrientation(orientation);
  };

  const onSubmit = (action: string) => {
    if (NAME_REGEX.test(name.trim() as string)) {
      handlePress(action);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const handlePress = async (action: string) => {
    if (initialName !== name.trim() && name) {
      props.saveInput(name.trim() as string, action);
    } else {
      props.navigateToNextStep(action);
    }
  };

  const handleInput = (value: string) => {
    if (value.trim().length < 2) {
      setIsInputValidated(false);
      setIsError(true);
    } else if (NAME_REGEX.test(value.trim())) {
      setIsInputValidated(true);
      setIsError(false);
    }
    else {
      setIsInputValidated(false);
      setIsError(true);
    }

    setName(value);
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      keyboardShouldPersistTaps="always"
    >
      <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
        <View style={{ marginTop: 5 }}>
          <Prompt text={props.step.prompt} />
        </View>

        <View style={{ marginTop: 4, marginBottom: 4 }}>
          <Data data={props.step.data} />
        </View>
        <View>
          <TextInput
            value={name}
            mode="outlined"
            outlineColor="#FFF1EC"
            activeOutlineColor="salmon"
            style={styles.input}
            label={"Name"}
            focusable
            maxLength={15}
            onChangeText={handleInput}
          />
        </View>
          {isError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorTitle}>Your name</Text>
              <Text style={styles.errorText}>
                - shouldn't contain numbers
              </Text>
              <Text style={styles.errorText}>
                - has 2-15 symbols
              </Text>
              <Text style={styles.errorText}>
                - has no special characters
              </Text>
            </View >
          )}
        <View style={{ marginTop: 5 }}>
          <NextStepButton
            isInputValidated={isInputValidated}
            caption="next"
            activeOpacity={1}
            onSubmit={onSubmit}
            action="next"
            styles={isInputValidated && nextStepButtonStyle.validatedInput}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 4,
  },
  input: {
    width: 300,
    backgroundColor: "#FFF1EC",
    height: 40,
    textAlign: "center",
    borderRadius: 5,
  },
  errorContainer: {
    borderRadius: 10,
    height: 130,
    width: 300,
    marginTop: 15,
    marginBottom: 50,
    paddingTop: 17,
    paddingLeft: 23,
    boxShadow: '0 0 5px 0 #d9d9d9',
    backgroundColor: '#fff',
  },
  errorTitle: {
    fontWeight: 500,
    fontSize: 14,
    marginBottom: 20,
    color: '#f1562a',
  },
  errorText: {
    fontWeight: 500,
    fontSize: 12,
    color: '#f1562a',
  },
});

const nextStepButtonStyle = StyleSheet.create({
  validatedInput: {
    backgroundColor: "salmon",
    color: "white",
  },
});

export default AddName;
