import axios from "axios";

export function BudgetNew () {
  const handleCreateBudget = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/budgets.json", params)
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
      <h4>New Budget</h4>
      <form onSubmit={handleCreateBudget}>
        <div>
          Name: <input name="name" type = "text" />
        </div>
        <div>
          Trip_id: <input name="trip_id" type = "text" />
        </div>
        <div>
          Budget: <input name="budget" type = "text" />
        </div>  
        <button type="submit" className="btn btn-secondary mr-1">New Budget</button>
      </form>
    </div>
  );
}