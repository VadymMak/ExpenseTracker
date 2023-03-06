import { Text, View, StyleSheet } from "react-native";
import { GlobalStyle } from "../../constants/styles";

import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
  const content = <Text style={styles.infoText}>{fallbackText}</Text>;

  return (
    <View style={styles.contsiner}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {expenses.length ? <ExpensesList expenses={expenses} /> : content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  contsiner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyle.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
