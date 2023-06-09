import { useEffect, useState } from "react"
import { MdAdd, MdSortByAlpha, MdEditSquare, MdDelete } from "react-icons/md"
import { v4 as uuidv4 } from "uuid"
const Header = () => {
  const [input, setInput] = useState("")
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [isEdit, setIsEdit] = useState("")

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("data"))) {
      setData(JSON.parse(localStorage.getItem("data")))
    }
  }, [])

  const addValue = () => {
    if (isEdit === "") {
      const newItem = { value: input, id: uuidv4(), isCompleted: false }

      if (data.find((item) => item.value === input))
        return alert("value already exist")

      setData((preData) => [...preData, newItem])
      setData2((preData) => [...preData, newItem])
      localStorage.setItem("data", JSON.stringify([...data, newItem]))
    } else if (isEdit !== "") {
      const preData = data.map((item) =>
        item.id === isEdit ? { ...item, value: input } : item
      )
      setData(preData)
      localStorage.setItem("data", JSON.stringify(preData))
      setIsEdit("")
    }
    setInput("")
  }

  const handleSearch = (e) => {
    if (e.target.value !== "") {
      const filteringItem = data2.filter((item) =>
        item.value.includes(e.target.value)
      )
      setData(filteringItem)
    } else {
      setData(JSON.parse(localStorage.getItem("data")))
    }
  }

  const handleCheck = (e, ids) => {
    const allData = data.map((item) => {
      return item.id === ids ? { ...item, isCompleted: e.target.checked } : item
    })
    setData(allData)
    localStorage.setItem("data", JSON.stringify(allData))
  }

  const handleDelete = (id) => {
    const item = data.filter((item) => item.id !== id)
    setData(item)
    localStorage.setItem("data", JSON.stringify(item))
  }

  const handleEdit = (id) => {
    const dataa = data.find((item) => item.id === id)
    setInput(dataa.value)
    setIsEdit(id)
  }
  const sortByValueAsc = () => {
    const strAscending = [...data].sort((a, b) => (a.value > b.value ? 1 : -1))
    setData(strAscending)
    localStorage.setItem("data", JSON.stringify(strAscending))
  }
  return (
    <div className="parentContainer">
      <div className="inputContainer">
        <input
          className="input"
          placeholder="Enter value"
          onChange={(e) => {
            setInput(e.target.value)
          }}
          value={input}
        />
        <div>
          <MdAdd onClick={() => addValue()} className="plusButton" />
        </div>
      </div>

      <div className="serachContainer">
        <input
          placeholder="Searchbar"
          className="searchbar"
          onChange={(e) => handleSearch(e)}
        />
        <div onClick={() => sortByValueAsc()}>
          <MdSortByAlpha />
        </div>
      </div>
      {data && (
        <div className="contentDiv">
          <div>
            {data.map((item, index) => {
              return (
                <div className="containerContent">
                  <div>
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheck(e, item.id)}
                      checked={item.isCompleted}
                    />
                  </div>
                  <div
                    className={
                      item.isCompleted ? "checked-item" : "not-checked-item"
                    }
                  >
                    <div
                      className={index % 2 === 0 ? "itemBgEven" : "itemBgOdd"}
                    >
                      {item.value}
                    </div>
                  </div>
                  <div className="btnContainer">
                    <div
                      className="btn-edit"
                      onClick={() => handleEdit(item.id)}
                    >
                      <MdEditSquare />
                    </div>
                    <div
                      className="btn-dlt"
                      onClick={() => handleDelete(item.id)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="footer">
        <div className="total">Total : {data.length} </div>
        <div className="complete">
          Complete :{data.filter((item) => item.isCompleted === true).length}
        </div>
        <div className="incomplete">
          Incomplete :{data.filter((item) => item.isCompleted === false).length}
        </div>
      </div>
    </div>
  )
}
export default Header
