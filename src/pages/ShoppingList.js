import React, { useState, useEffect } from 'react'
import GenPDF from './GenPDF'

const getLocalStorage = (props) => {
  const ingredients = props.location.state.ingredients
  if (ingredients) {
    console.log('props', JSON.stringify(ingredients))
    localStorage.setItem('list', JSON.stringify(ingredients))
  }
  let list = localStorage.getItem('list')
  if (list) {
    console.log(list)
    return (list = JSON.parse(localStorage.getItem('list')))
  } else {
    return []
  }
}

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert()
    }, 5000)
    return () => clearTimeout(timeout)
  }, [list])
  return <p className={`alert ${type}`}>{msg}</p>
}

const List = ({ items, removeItem, editItem }) => {
  return (
    <div className=''>
      {items.map((item) => {
        const { id, title } = item
        return (
          <article className='item' key={id}>
            <p className=''>{title}</p>
            <div className=''>
              <button
                type='submit'
                className='btn'
                onClick={() => editItem(id)}
              >
                {' '}
                Edit{' '}
              </button>
              <button
                type='submit'
                className='btn'
                onClick={() => removeItem(id)}
              >
                {' '}
                Delete{' '}
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

function App(props) {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage(props))
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      showAlert(true, 'danger', 'please enter value')
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item
        })
      )

      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'value changed')
    } else {
      showAlert(true, 'success', 'item added to the list')
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      setName('')
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed')
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  console.log(list)
  console.log('=============HERE=======================')

  return (
    <section className=''>
      <form className='' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>shopping list</h3>
        <div className='item'>
          <input
            type='text'
            className=''
            placeholder='Add items here'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='btn'>
            {' '}
            {isEditing ? 'edit' : 'submit'}{' '}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className=''>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='btn' onClick={clearList}>
            {' '}
            Clear items{' '}
          </button>
        </div>
      )}
      <div>
        <GenPDF list={list} />
      </div>
    </section>
  )
}

export default App
