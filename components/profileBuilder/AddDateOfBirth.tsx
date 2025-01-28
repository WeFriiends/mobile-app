import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

import Data from "../Data";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Prompt from "../Prompt";
import { Step } from "../../types/Step";
import { TextInput } from "react-native-paper";
import { View } from "react-native";
import dayjs from "dayjs";
import { differenceInYears } from "date-fns";
import ErrorIndicator from "../ErrorIndicator";

type AddDateOfBirthProps = {
  step: Step;
  dateOfBirth: string | undefined;
  navigateToPreviousStep: (action: string) => void;
  saveInput: (value: string, action: string) => void;
};

const AddDateOfBirth = (props: AddDateOfBirthProps) => {
  console.log("DOB page rendered");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isInputValidated, setIsInputValidated] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const [formattedDate, setFormattedDate] = useState<string>(
    dayjs(props.dateOfBirth).format("YYYY-MM-DD")
  );

  useEffect(() => {
    if (props.dateOfBirth) {
      setIsInputValidated(true);
    }
  }, []);

  const handleDateChange = (date: Date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const isDateValid = differenceInYears(new Date(), new Date(date)) >= 18;
    if (formattedDate && isDateValid) {
      setErrorMessage("");
      setIsInputValidated(true);
    } else {
      setIsInputValidated(false);
      setErrorMessage("You have to be 18 or older");
    }
    setFormattedDate(formattedDate);
    hideDatePicker();
  };

  const handleInput = async (action: string) => {
    setErrorMessage("");
    if (action === "next") {
      if (formattedDate) {
        props.saveInput(formattedDate, action);
      }
    } else {
      props.navigateToPreviousStep(action);
    }
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  return (
    <View style={{ alignItems: "center" }}>
      <View>
        <Button title="Prev" onPress={() => handleInput("prev")} />
      </View>
      <View style={{ marginTop: 3 }}>
        <Prompt text={props.step.prompt} />
      </View>
      <View style={{ marginTop: 3, marginBottom: 3 }}>
        <Data data={props.step.data} />
      </View>
      <View style={{ marginTop: 2 }}>
        <SafeAreaView>
          <TouchableOpacity
            onPress={() => {
              setDatePickerVisibility(true);
            }}
          >
            <View pointerEvents="none">
              <TextInput
                mode="outlined"
                label={"YYYY-MM-DD"}
                focusable
                outlineColor="#FFF1EC"
                activeOutlineColor="salmon"
                style={styles.input}
                value={formattedDate}
                placeholder={"YYYY-MM-DD"}
                editable={false}
              />
            </View>
          </TouchableOpacity>
          <View>
            {errorMessage ? (
              <ErrorIndicator errorMessage={errorMessage} color={"red"} />
            ) : null}
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateChange}
            onCancel={hideDatePicker}
            date={new Date(formattedDate)}
          />
        </SafeAreaView>
      </View>

      <View>
        <TouchableOpacity
          style={isInputValidated ? styles.validatedInput : styles.button}
          onPress={() => handleInput("next")}
          disabled={!isInputValidated}
        >
          <Text
            style={isInputValidated ? styles.validatedText : styles.btnText}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFF1EC",
    height: 40,
    textAlign: "center",
    width: 160,
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "salmon",
    width: 300,
    height: 40,
    alignItems: "center",
    padding: 5,
  },
  btnText: {
    fontSize: 18,
    color: "salmon",
  },
  validatedText: {
    fontSize: 18,
    color: "white",
  },
  validatedInput: {
    backgroundColor: "salmon",
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "salmon",
    width: 300,
    height: 40,
    alignItems: "center",
    padding: 5,
  },
});

export default AddDateOfBirth;
