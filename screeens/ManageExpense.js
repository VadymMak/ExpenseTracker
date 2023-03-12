import { useContext, useLayoutEffect, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyle } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";

const ManageExpenses = ({ route, navigation }) => {
  const { isFetching, setIsFetching } = useState(false);
  const expenseCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    try {
      await deleteExpense(editedExpenseId);
      expenseCtx.deleteExpense(editedExpenseId);
    } catch (err) {
      console.log(err);
    } finally {
      // setIsFetching(false);
    }

    navigation.goBack();
  };

  const CancelHandler = () => {
    navigation.goBack();
  };

  async function confirmHandler(expenseData) {
    if (isEditing) {
      await updateExpense(editedExpenseId, expenseData);
      expenseCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expenseCtx.addExpense({ ...expenseData, id: id });
    }
    navigation.goBack();
  }

  return (
    <>
      {!isFetching ? (
        <View style={styles.container}>
          <ExpenseForm
            submitButtonLabel={isEditing ? "Update" : "Add"}
            onSubmit={confirmHandler}
            onCancel={CancelHandler}
            defaultValues={selectedExpense}
          />
          {isEditing && (
            <View style={styles.deleteContainer}>
              <IconButton
                icon="trash"
                color={GlobalStyle.colors.error500}
                size={24}
                onPress={deleteExpenseHandler}
              />
            </View>
          )}
        </View>
      ) : (
        <LoadingOverlay />
      )}
    </>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyle.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyle.colors.primary200,
    alignItems: "center",
  },
});
