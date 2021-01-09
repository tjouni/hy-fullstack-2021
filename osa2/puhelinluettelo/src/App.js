import React, { useState, useEffect } from "react";
import personService from "./services/persons";

const Numbers = ({ persons, searchTerm, handleDelete }) => {
  const visiblePersons = persons.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <h3>Numbers</h3>
      <ul>
        {visiblePersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => handleDelete(person)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Form = ({
  addNumber,
  handleNameChange,
  handleNumberChange,
  newName,
  newNumber,
}) => {
  return (
    <div>
      <h3>add a new</h3>
      <form onSubmit={addNumber}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Filter = ({ handleSearchTermChange, searchTerm }) => {
  return (
    <div>
      filter shown with:
      <input onChange={handleSearchTermChange} value={searchTerm} />
    </div>
  );
};

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null;
  }
  return <div className={notification.type}>{notification.message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState({
    type: null,
    message: null,
  });

  const notify = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: null, message: null }), 5000);
  };
  useEffect(() => {
    personService.getAll().then((response) => setPersons(response.data));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleDelete = (person) => {
    window.confirm(`Delete ${person.name}?`) &&
      personService.remove(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
        notify("success", `Deleted ${person.name}`);
      });
  };
  const updateNumber = (person) => {
    const updatedPerson = { ...person, number: newNumber };
    window.confirm(
      `${newName} is already added to phonebook, replace old number with new one?`
    ) &&
      personService
        .update(person.id, updatedPerson)
        .then((response) => {
          setPersons(
            persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            )
          );
          notify("success", `Updated ${response.data.name}`);
        })
        .catch(() =>
          notify(
            "error",
            `Information of ${newName} has already been removed from server`
          )
        );
  };
  const addNumber = (event) => {
    event.preventDefault();
    const person = persons.find((person) => person.name === newName);
    person
      ? updateNumber(person)
      : personService
          .create({ name: newName, number: newNumber })
          .then((response) => {
            setPersons(persons.concat(response.data));
            notify("success", `Added ${newName}`);
          });
  };
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter
        handleSearchTermChange={handleSearchTermChange}
        searchTerm={searchTerm}
      />
      <Form
        addNumber={addNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <Numbers
        persons={persons}
        searchTerm={searchTerm}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
