import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CreateIcon from '@mui/icons-material/Create';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TaskCard from '../cards/TaskCard'; // Adjust the path as necessary

const actions = [
  { icon: <PrintIcon />, name: 'Download' },
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <CreateIcon />, name: 'Create' },
];

export default function ControlledOpenSpeedDial() {
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Separate states for each task detail
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending'); // Default value can be changed
  const [endDate, setEndDate] = useState('');

  // Retrieve token from localStorage
  const token = localStorage.getItem('authToken');

  // Fetch user ID from backend
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`, // Ensure token is included
          },
        });
        setUserId(response.data.id); // Set user ID from response
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId(); // Fetch user ID on component mount
  }, [token]);

  const handleOpenSpeedDial = () => setOpenSpeedDial(true);
  const handleCloseSpeedDial = () => setOpenSpeedDial(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
    handleCloseSpeedDial();
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleCreateTask = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No authentication token found');
        return;
      }
  
      const task = {
        title,
        description,
        status,
        endDate,
        userId, // Ensure userId is included
      };
      
      const response = await axios.post('http://localhost:4000/api/tasks', task, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
  
      console.log('Task created:', response.data);
  
      // Clear form after creating task
      setTitle('');
      setDescription('');
      setStatus('pending');
      setEndDate('');
      fetchTasks(); // Refresh tasks after creating a new one
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error creating task:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // No response was received
        console.error('Error creating task: No response received');
      } else {
        // Something happened in setting up the request
        console.error('Error creating task:', error.message);
      }
    }
  };
  

  useEffect(() => {
    if (userId) {
      fetchTasks(); // Fetch tasks if userId is available
    }
  }, [userId]);

  return (
    <Box sx={{ height: '100vh', position: 'relative' }}>
      <SpeedDial
        ariaLabel="SpeedDial controlled"
        sx={{
          position: 'absolute',
          bottom: { xs: 16, md: 32 },
          right: { xs: 16, md: 32 },
        }}
        icon={<SpeedDialIcon />}
        onClose={handleCloseSpeedDial}
        onOpen={handleOpenSpeedDial}
        open={openSpeedDial}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.name === 'Create' ? handleOpenDialog : handleCloseSpeedDial}
          />
        ))}
      </SpeedDial>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details of the new task you want to create.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="status"
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            variant="outlined"
            required
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="not working now">Not Working Now</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            id="endDate"
            label="Expected End Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCreateTask} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {tasks.map((task, index) => (
          <TaskCard
            key={index}
            title={task.title}
            description={task.description}
            status={task.status}
            endDate={task.endDate}
            currentDate={new Date().toLocaleDateString()} // Optional: Pass current date if needed
          />
        ))}
      </Box>
    </Box>
  );
}
