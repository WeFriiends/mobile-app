import { StyleSheet } from 'react-native'
import { Text } from "react-native";

type PromptProps = {
    text?: string | null
}

const Prompt = (props: PromptProps) => {
    return (
        <Text style={styles.prompt}>
            {props.text}
        </Text>
    )
}

const styles = StyleSheet.create({
    prompt: {
        fontSize: 24,
      //  fontWeight: "bold",
       color: 'salmon'
     
    }
})

export default Prompt;