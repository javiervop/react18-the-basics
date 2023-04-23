import { useState } from "react";
// import Message from "./Message";
import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button/Button";
import { BsFillCalendarFill } from "react-icons/bs";
import Like from "./components/Like";
import Form from "./components/Form";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const items = ["Tulua", "Fenicia", "Cartago", "Cali"];

  const [alertVisible, setAlertVisibility] = useState(false);

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      <h2>Form Component</h2>
      <Form />
      <hr />
      <Like onClick={() => console.log("clicked")} />
      <br />
      <BsFillCalendarFill color="red" size="20" />
      <hr />
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>
          Hello <b>World</b>
        </Alert>
      )}
      <Button
        color="primary"
        onClick={() => {
          console.log("click");
          setAlertVisibility(true);
        }}
      >
        Click
      </Button>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
      <hr />
    </div>
  );
}

export default App;
