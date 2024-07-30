import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Button, } from 'react-bootstrap';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './App.css';
function App() {
  const [toDo, setToDo] = useState([]);
  const [newTask, setNewTask] = useState('');
  console.log(useState());
  const [updateData, setUpdateData] = useState('');
  //popup
  const [show, setShow] = useState(false);
  // content delete
  const [taskToDelete, setTaskToDelete] = useState(null);
  const handleClose = () =>{
   setShow(false);
  }
  const handleShow = (task) => {
    setTaskToDelete(task); 
    console.log(task);
    setShow(true);
  };
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      console.log(num);
      let newEntry = { 
        id: num, 
        title: newTask, 
        status: false 
      };
      console.log(newEntry);
      //add value to the array
      setToDo([...toDo, newEntry]);
      // empty input value
      setNewTask('');
    }
  };
  const deleteTask = () => {
    if (taskToDelete) {
      let newTasks = toDo.filter((task) => task.id !== taskToDelete.id);
      setToDo(newTasks);
      setTaskToDelete(null);
      handleClose();
    }
  };
  const markDone = (id) => {
    const newTasks = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTasks);
  };
  const cancelUpdate = () => {
    setUpdateData('');
  };
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    };
    setUpdateData(newEntry); //true/ false
  };
  const updateTask = () => {
    let filterRecords = [...toDo].filter((task) => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    setToDo(updatedObject);
    setUpdateData('');
  };
  return (
    <div className="container App">
    <div className='py-5 '>
    <h2 className=''>To Do List App (ReactJS)</h2>
    </div>
   
      {updateData && updateData ? (
        <>
          <div className="row">
            <div className="col">
              <input
                value={updateData && updateData.title}
                onChange={(e) => changeTask(e)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-lg btn-success mr-20" onClick={updateTask}>
                Update
              </button>
              <button className="btn btn-lg btn-warning" onClick={cancelUpdate}>
                Cancel
              </button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          <div className="row">
            <div className="col">
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="form-control form-control-lg"
                id='finput'
              /> 
            </div>
            <div className="col-auto">
              <button className="btn btn-lg btn-success" onClick={addTask}>
                Add Task
              </button>
            </div>
          </div>
          <br />
        </>
      )}
      {toDo && toDo.length ? '' : 'No tasks...'}
      {toDo &&
        toDo
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((task, index) => {
            return (
              <React.Fragment key={task.id}>
                <div className="col taskBg">
                  <div className={task.status ? 'done' : ''}>
                    <span className="taskNumber">{index + 1}</span>
                    <span className="taskText">{task.title}</span>
                  </div>
                  <div className="iconsWrap">
                    <span onClick={(e) => markDone(task.id)} title="Completed / Not Completed">
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </span>
                    {task.status ? null : (
                      <span
                        title="Edit"
                        onClick={() =>
                          setUpdateData({
                            id: task.id,
                            title: task.title,
                            status: task.status ? true : false
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                    )}
                    <span onClick={() => handleShow(task)} title="Delete">
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                  </div>
                </div>
                <Modal centered show={show} onHide={handleClose}>
                  {/* <Modal.Header >
                    <Modal.Title>Delete Task</Modal.Title>
                  </Modal.Header> */}
                  <Modal.Body className='text-black text-center text-black-50 title-style' >Do You Want to Delete <br/> <b>{task.title}</b></Modal.Body>
                  <Modal.Footer>
                    <Button className='close-btn' onClick={handleClose}>
                      Close
                    </Button>
                    <Button className='bg-danger border-0 Del-btn' onClick={deleteTask}>
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </React.Fragment>
            );
          })}
    </div>
  );
}
export default App;
