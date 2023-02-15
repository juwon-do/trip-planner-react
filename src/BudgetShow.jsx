import axios from "axios";
import { useEffect, useState } from "react";
import { BudgetNew } from "./BudgetNew";
import { ExpenseNew } from "./ExpenseNew";
import { Modal } from "./Modal";

export function BudgetShow(props) {
  const [tripId, setTripId] = useState([props.id]);
  const [spent, setSpent] = useState(0);
  const [budgets, setBudgets] = useState([]);
  const [isPostsShowVisible, setIsPostsShowVisible] = useState(false);

  const handleHidePost = () => {
    setIsPostsShowVisible(false);
  };

  const handleShowExpense = () => {
    setIsPostsShowVisible(true);
  };

  const handleShowBudget = () => {
    axios
      .get(`http://localhost:3000/budgets/${tripId}.json`)
      .then((response) => {
        setBudgets(response.data);
      });
  };
  useEffect(handleShowBudget, []);

  const handleDeleteExpense = (event) => {
    axios.delete(`http://localhost:3000/expenses/${event.target.id}.json`).then((response) => {
      console.log(response.data);
      refreshPage();
    });
  };

  const handleDeleteBudget = (event) => {
    axios.delete(`http://localhost:3000/budgets/${event.target.id}.json`).then((response) => {
      console.log(response.data);
      refreshPage();
    });
  };
  
  const handleRemaining = () => {
    var spent1 = 0;
    budgets.forEach((budget) => {
      budget.expenses.map((expense)=> {
        spent1 += expense.amount;
      });
    });

    setSpent(spent1);
  };
  useEffect(handleRemaining);

  const renderBudgetNew = () => {
    if (budgets.length === 0) {
      return (
        <BudgetNew />
      );
    } else {
      return (
        <div></div>
      );
    }
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      {renderBudgetNew()}
      {budgets.map((budget, index) => (
        <div key={budget.id}>
          <hr />
          <h3>Budget</h3>
          <h4>{budget.name.charAt(0).toUpperCase() + budget.name.slice(1)}(ID: {budget.id}) <button id={budget.id} onClick={handleDeleteBudget} type="button" className="btn btn-outline-dark mr-1 btn-sm"> X</button></h4>
          <br />
          <h3>Expenses</h3>
          {budget.expenses.map((expense) => (
            <div key={expense.id}>
              <p>{expense.name}: {expense.amount} <button id={expense.id} onClick={handleDeleteExpense} type="button" className="btn btn-outline-dark mr-1 btn-sm" >X</button></p>
            </div>
          ))}
          <h4>Budget: {budget.budget} Spent: {spent} Remain: {budget.budget - spent}</h4>
        </div>
      ))}
      <button onClick={handleShowExpense} type="button" className="btn btn-success mr-1">New Expense</button>
      <Modal show = {isPostsShowVisible} onClose={handleHidePost}>
        <ExpenseNew />
      </Modal>
    </div>
  );
}