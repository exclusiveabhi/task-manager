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
import TaskCard from '../cards/TaskCard'; 
// import { ComplexNavbar } from '../components/Navbar';
import Navbar from '../components/Navbar';

const actions = [
  { icon: <PrintIcon />, name: 'Download' },
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <CreateIcon />, name: 'Create' },
];

export default function ControlledOpenSpeedDial() {
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [endDate, setEndDate] = useState('');

  const token = localStorage.getItem('authToken');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setUserId(response.data.id);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
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
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const task = {
        title,
        description,
        status,
        endDate,
        userId,
      };
      
      const response = await axios.post('http://localhost:4000/api/tasks', task, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      console.log('Task created:', response.data);

      setTitle('');
      setDescription('');
      setStatus('pending');
      setEndDate('');
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/api/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', overflow: 'hidden'  }}>
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {tasks.map((task, index) => (
              <TaskCard
                key={index}
                title={task.title}
                description={task.description}
                status={task.status}
                endDate={task.endDate}
                currentDate={new Date().toLocaleDateString()}
              />
            ))}
          </Box>
        </Box>

        <SpeedDial
          ariaLabel="SpeedDial controlled"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
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
      </Box>
    </>
  );
}
