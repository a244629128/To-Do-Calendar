import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { Button, Box, Grid, Card, CardHeader, CardContent, CardActions, Collapse, makeStyles, Typography, Toolbar, TextField,  TextareaAutosize, Stack } from '@material-ui/core';
const TaskOptionsModal = React.lazy(() => import('../TaskOptionsModal.jsx'));

const useStyles = makeStyles({
  grid: {
    display: 'inline-block',
    alignItems: 'center'
  },
  header: {
    fontSize: 12
  },
  textArea: {
    padding: '1rem',
    width: '90%',
    color: 'black'
  },
  card: {
    display: 'flex',
    border: '1rem solid black',
  },
  task: {
    marginBottom: '4px'
  },
  editButton: {
    backgroundColor: '#1976d2',
    color: 'white',
    marginRight: '4px'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'right',
    padding: '0px'
  },
  title: {
    width: '50%',
    fontSize: '14px'
  },
  description: {
    fontSize: '12px'
  },
  duration: {
    display: 'flex',
    padding: '4px',
    width: '50%',
    justifyContent: 'right',
  }
});

function Task({task, isMobile, draggedEvent, setDraggedEvent, handleDragStart, clickedTask, updateTodo, deleteTodo}) {

  const [todo, setTodo] = useState(task);
  const [modalOpen, setModalOpen] = useState(false);
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();

  const convertDuration = (duration) => {
    const splitDuration = duration.split(':');
    let hours = splitDuration[0];
    const hoursDigits = hours.split('');
    if (hoursDigits[0] === '0' && hoursDigits.length === 2) {
      hours = hoursDigits[1];
    };
    let minutes = splitDuration[1];
    const minutesDigits = minutes.split('')
    if (minutesDigits[0] === '0') {
      minutes = minutesDigits[1];
    };
    setHours(hours);
    setMinutes(minutes);
  }

  const updateTask = (task) => {
    setTodo(task);
    newTodo(task);
  }

  const classes = useStyles();

  useEffect(() => {
    convertDuration(todo.duration);
  }, []);

  const newTodo = useCallback((todo) => {
    convertDuration(todo.duration)
  }, [todo]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Grid className={classes.task} item xs={12} lg={12}>
        <Grid item xs={12}>
          <Card onDragStart={() => handleDragStart(task)} draggable='true'>
            {modalOpen === true && <TaskOptionsModal setModalOpen={setModalOpen} modalOpen={modalOpen} task={task} updateTodo={updateTodo} deleteTodo={deleteTodo} updateTask={updateTask}/>}
            <CardContent>
              <div style={{display: 'flex', gap: '5%'}}>
                <Typography className={classes.title}>
                  {task.title}
                </Typography>
                <div className={classes.duration}>
                  <div>Duration: {hours} {hours === '1' ? 'hour' : 'hours'} {minutes} {minutes === '1' ? 'minute' : 'minutes'}</div>
                </div>
              </div>
              <Typography className={classes.description}>
                {task.description}
              </Typography>
              <CardActions className={classes.buttonContainer}>
                <Button className={classes.editButton} variant="contained" size="small" onClick={() => setModalOpen(true)}>Edit</Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Suspense>
  );
};

export default Task;