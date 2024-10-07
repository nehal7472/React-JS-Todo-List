import { useEffect, useState } from "react";
import { MdCheck } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

export default function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(() => {
    const rawTodo = localStorage.getItem("TodoData");
    if (!rawTodo) return [];
    return JSON.parse(rawTodo);
  });

  const [dateTime, setDateTime] = useState();

  // handle input field and get input value
  const handleInput = (value) => {
    setInputValue(value);
  };

  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputValue) return;

    if (data.includes(inputValue)) {
      setInputValue("");
      return;
    }

    setData((prevData) => [...prevData, inputValue]);

    setInputValue("");
  };

  // add data to local Storage
  localStorage.setItem("TodoData", JSON.stringify(data));

  // Date and time

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString();
      setDateTime(`${formattedDate} - ${formattedTime}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // delete a item
  const handleDelete = (value) => {
    const updatedData = data.filter((curElem) => curElem !== value);
    setData(updatedData);
  };
  // Delete all items

  const handleAllDelete = () => {
    // 1st method
    // const clearData = data.filter((curElem) => !curElem);
    // setData(clearData);

    // 2nd method
    setData([]);
  };

  // Display input values
  const displayData = data.map((value, index) => {
    return (
      <li key={index} className="flex items-center justify-between">
        <span>{value}</span>
        <div className="flex gap-2">
          <button className="btn btn-accent">
            <MdCheck className="text-black text-[20px]" />
          </button>
          <button className="btn btn-error" onClick={() => handleDelete(value)}>
            <RiDeleteBin5Fill className="text-black text-[20px]" />
          </button>
        </div>
      </li>
    );
  });

  const isDataAvailable = data.length == 0 ? <li>Add Your Todo-List</li> : "";

  // button
  const button =
    "rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2";

  return (
    <div className="w-full h-[100vh] pt-[5rem]">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[4rem] text-[#E7A500]">Todo List</h1>
        <p className="py-[15px] text-[22px] font-bold">{dateTime}</p>
        <div>
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row"
          >
            <input
              className="px-[10px] py-[9px] w-[20rem] rounded-md text-[18px] outline-none border-none"
              type="text"
              placeholder="enter your todo!s"
              autoComplete="off"
              value={inputValue}
              onChange={(e) => handleInput(e.target.value)}
            />
            <button type="submit" className="btn btn-warning">
              Add Task
            </button>
          </form>
          <div className=" bg-[#181D23] p-[15px] justify-start items-center mt-7 rounded-lg">
            <ul className="flex flex-col gap-2">
              {isDataAvailable}
              {displayData}
            </ul>
          </div>
          <div className="text-center mt-4">
            <button onClick={handleAllDelete} className={button}>
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
