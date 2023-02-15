export function TripNew(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateTrip(params);
  };
  return (
    <div>
      <h1>New Trip</h1>
      <form onSubmit = {handleSubmit}>
        <div>
          Title: <input name="title" type = "text" />
        </div>
        <div>
          Image URL: <input name="image_url" type = "text" />
        </div>
        <div>
          Start Time: <input name="start_time" type = "date" />
        </div>
        <div>
          End Time: <input name="end_time" type = "date" />
        </div>
        <button type= "submit" className="btn btn-secondary mr-1">Create new trip</button>
      </form>
    </div>
      
  );
}