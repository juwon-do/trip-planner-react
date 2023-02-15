import axios from "axios";
export function ExpenseNew () {
  const handleCreateExpense = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/expenses.json", params)
      .then((response) => {
        console.log(response.data);
        refreshPage();
      });
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      <form onSubmit={handleCreateExpense}>
        <div>
          Name: <input name="name" type = "text" />
        </div>
        <div>
          Budget_id: <input name="budget_id" type = "text" />
        </div>
        <div>
          Amount: <input name="amount" type = "text" />
        </div>  
        <button type="submit" className="btn btn-secondary mr-1">New Expense</button>
      </form>
    </div>
  )
}