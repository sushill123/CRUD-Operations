import { useEffect, useState } from "react";
import "./style.css";
import { myUsers } from "./user";

const Crud = () => {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null); // To track the ID of the item being edited
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(myUsers);
  }, []);

  const handleDelete = (currentId) => {
    if (currentId > 0) {
      if (window.confirm("Are you sure to delete the item")) {
        const dt = data.filter((item) => item.id !== currentId);
        setData(dt);
      }
    }
  };

  const handleEdit = (currentId) => {
    const itemToEdit = data.find((item) => item.id === currentId);
    if (itemToEdit) {
      setIsUpdate(true);
      setFirstName(itemToEdit.firstName);
      setLastName(itemToEdit.lastName);
      setAge(itemToEdit.age);
      setEditId(currentId);
    }
  };

  const handleSave = () => {
    const newId = data.length ? data[data.length - 1].id + 1 : 1;
    const newUser = { id: newId, firstName, lastName, age };
    setData([...data, newUser]);
    handleClear();
  };

  const handleUpdate = () => {
    const updatedData = data.map((item) =>
      item.id === editId ? { ...item, firstName, lastName, age } : item
    );
    setData(updatedData);
    handleClear();
  };

  const handleClear = () => {
    setFirstName("");
    setLastName("");
    setAge("");
    setIsUpdate(false);
    setEditId(null);
  };

  return (
    <div className="container-fluid m-5">
      <div>
        <label>
          FirstName:
          <input
            type="text"
            placeholder="Firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          LastName:
          <input
            type="text"
            placeholder="Lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="text"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        {!isUpdate ? (
          <button className="btn btn-primary mx-2" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="btn btn-success mx-2" onClick={handleUpdate}>
            Update
          </button>
        )}
        <button className="btn btn-danger" onClick={handleClear}>
          Clear
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sr.No</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Age</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Crud;
