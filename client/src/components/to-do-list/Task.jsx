import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import moment from 'moment';
import ContentEditable from 'react-contenteditable';
import { Button, Grid, Card, CardHeader, CardContent, CardActions, Collapse, makeStyles, Typography, Toolbar, TextField,  TextareaAutosize, Stack } from '@material-ui/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const TaskOptionsModal = require('../TaskOptionsModal.jsx');
//on hover over editable field -- pen icon or underline
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
    border: '1rem solid black'
  },
  editableField: {
    "&[contentEditable=true]:empty:not(:focus):before": {
      content: "attr(data-text)"
  }
},
hover: {
  "&:hover": {
    backgroundColor: 'rgb(7, 177, 77, 0.42)'
  }
}
  // editableField:hover {
  //   display: 'block'
  // },

  // edit: {
  //   padding-top: '1rem',
  //   padding-right: '1rem',
  //   position: 'absolute',
  //   right: '0',
  //   top: '0',
  //   display: 'none'
  // }
});

//only want task.in_calendar === false
function Task({task, openModal, isMobile, deleteTask, draggedEvent, setDraggedEvent, handleDragStart, myEvents}) {
  // console.log('task in task', task )
  const [userTask, setUserTask] = useState(task);
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasDates, setHasDates] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date(moment(Date.now()).add(2, 'hours')));

  const addToCal = <Button variant="contained" size="small" touchstart={openModal} >Add To Calendar</Button>;

  const isDateProvided = (task) => {
    if (!userTask.start) {
      setHasDates(false)
    } else {
      setHasDates(true)
    }
  }

  const updateTaskTime = (startTime) => {
    const momentTime = new Date(moment(startTime))
    const taskCopy = userTask
    taskCopy.start = momentTime
    setUserTask(taskCopy)
    console.log('userTask', userTask)
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    console.log('isediting')
  };

  const handleContentEditable = (e, field) => {
    const taskCopy = userTask;
    taskCopy[field] = e.target.value;
    setUserTask(taskCopy);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const classes = useStyles();

  useEffect(() => {
    isDateProvided(task);
  }, []);

  return (
    <Grid item xs={12} lg={12}>
      <Grid item xs={12}>
      <Card onDragStart={() => handleDragStart(task)} draggable='true'>
          <CardContent>
            <div style={{display: 'flex', flexDirection: 'row', gap: '5%'}}>
              <Typography classes={{hover: classes.hover}} variant="body1" contentEditable={isEditing}
              onChange={(e)=>handleContentEditable(e, 'title')} html={task.title}
              >{task.title}
              </Typography>
              {isMobile && addToCal}
            </div>
            <ContentEditable className={classes.editableField} variant="body1" contentEditable={isEditing}
            onChange={(e)=>handleContentEditable(e, 'description')} html={task.description}
            />
            <CardActions>
              <ExpandMoreIcon/>
              <Button variant="contained" size="small" onClick={() => openModal(task)}>Set Time</Button>
              <Button variant="contained" size="small" onClick={deleteTask}>Delete</Button>
            </CardActions>
          </CardContent>
      </Card>
      </Grid>
    </Grid>
  );
};

export default Task;