import { useState, useEffect } from 'react'

function App() {
  const [inputval, setInputval] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"))
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleClick = () => {
    if (inputval.trim().length > 0) {
      setTodos((prev) => [...prev, { text: inputval, completed: false }])
    }
    setInputval("")
  }

  const deleteTodo = (indexToRemove) => {
    setTodos((todos) => todos.filter((todo, index) => index !== indexToRemove))
  }

  const editTodo = (index) => {
    setInputval(todos[index].text)
    setTodos((prevTodos) => prevTodos.filter((todo, i) => i !== index))
  }

  const markAsDone = (index) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      ))
  }


  return (
    <>
      <section>
        <div className="bg-[#550036] text-center text-white font-bold text-3xl p-2">Manage all Your Todos at One Place</div>

        <div className='flex md:flex-row flex-col justify-center items-center gap-2 mt-8'>
          <label className='text-[#550036] font-bold' htmlFor="inputval">Enter a todo: </label>
          <input
            onChange={(e) => setInputval(e.target.value)}
            value={inputval}
            type="text"
            className='border-1 border-black py-1 pl-2 rounded-lg'
          />
          <button onClick={handleClick} className='bg-[#550036] text-white font-bold rounded-lg py-1 px-2 border-1 border-[#550036] cursor-pointer'>Save</button>
        </div>

        <div className='flex flex-col justify-center items-center gap-2 w-full'>
          <h1 className='font-bold text-2xl underline text-[#550036] mt-4'>Your Todos:</h1>
          <div className='alltodos'>
            {todos.map((todo, index) => (
              <div key={index} className="flex justify-between items-center bg-[#550036] text-white py-1 px-2 rounded-lg w-[300px] md:w-[500px] mb-2">

                <div className="flex gap-2 items-center">
                  <div>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => markAsDone(index)}
                      className='w-4 h-4 cursor-pointer accent-[#550036] mt-1'
                    />
                  </div>

                  <div className={`max-w-56 md:max-w-[450px] overflow-hidden ${todo.completed ? "line-through" : ""}`}>{todo.text}</div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => editTodo(index)} className='cursor-pointer'>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M3 21v-3.75L16.81 3.44a1.5 1.5 0 0 1 2.12 0l1.63 1.63a1.5 1.5 0 0 1 0 2.12L6.75 21H3zm16.85-15.43l-1.63-1.63L16.1 6.06l1.63 1.63 2.12-2.12zM5 19h2.25L17.06 9.19 14.94 7.06 5 16.94V19z" />
                    </svg>
                  </button>
                  <button onClick={() => deleteTodo(index)} className='cursor-pointer'>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M6.225 4.811l5.775 5.774 5.774-5.774 1.414 1.414-5.774 5.775 5.774 5.774-1.414 1.414-5.774-5.774-5.775 5.774-1.414-1.414 5.775-5.774-5.775-5.775z" />
                    </svg>
                  </button>
                </div>

              </div>

            ))}
          </div>
        </div>

      </section>
    </>
  )
}

export default App
