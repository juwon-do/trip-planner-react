export function PlaceNew(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreatePlace(params);
  };
  return (
    <div>
      <h1>New Place</h1>
      <form onSubmit = {handleSubmit}>
        <div>
          Name: <input name="name" type = "text" />
        </div>
        <div>
          Trip id: <input name="trip_id" type = "number" />
        </div>
        <div>
          Address: <input name="address" type = "text" />
        </div>
        <div>
          Description: <input name="description" type = "text" />
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
        <button type= "submit">Create new place</button>
      </form>
    </div>
      
  );
}
