import { TextInput, View, Text, StyleSheet } from "react-native";
import { GlobalStyle } from "../../constants/styles";

const Input = ({ label, style, textInputConfig, invalid }) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text
        style={invalid ? [styles.label, styles.invalidLabel] : styles.label}
      >
        {label}
      </Text>
      <TextInput
        style={
          textInputConfig && textInputConfig.multiline
            ? [
                styles.input,
                styles.inputMultiline,
                invalid && styles.invalidInput,
              ]
            : [styles.input, invalid && styles.invalidInput]
        }
        {...textInputConfig}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyle.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyle.colors.primary100,
    color: GlobalStyle.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyle.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyle.colors.error50,
  },
});
