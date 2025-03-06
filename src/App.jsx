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
      setTodos((prev) => [...prev, inputval])
    }
    setInputval("")
  }

  const deleteTodo = (indexToRemove) => {
    setTodos((todos) => todos.filter((todo, index) => index !== indexToRemove))
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
          <button onClick={handleClick} className='bg-[#550036] text-white font-bold rounded-lg py-1 px-2 border-1 border-[#550036] '>Save</button>
        </div>

        <div className='flex flex-col justify-center items-center gap-2 w-full'>
          <h1 className='font-bold text-2xl underline text-[#550036] mt-4'>Your Todos:</h1>
          <div className='alltodos'>
            {todos.map((todo, index) => (
              <div key={index} className="flex justify-between items-center bg-[#550036] text-white py-1 px-2 rounded-lg w-[240px] mb-2">

                <div>{todo}</div>
                <button onClick={() => deleteTodo(index)} className='cursor-pointer'>❌</button>

              </div>

            ))}
          </div>
        </div>

      </section>
    </>
  )
}

export default App
