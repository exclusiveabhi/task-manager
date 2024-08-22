import * as React from 'react';
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

const actions = [
  { icon: <PrintIcon />, name: 'Download' },
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <CreateIcon />, name: 'Create' },
];
//current date
const current = new Date(); 
const currentDate = current.toLocaleDateString();
export default function ControlledOpenSpeedDial() {
  const [openSpeedDial, setOpenSpeedDial] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
  
  // Separate states for each task detail
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [status, setStatus] = React.useState('pending'); // Default value can be changed
  const [endDate, setEndDate] = React.useState('');

  const handleOpenSpeedDial = () => setOpenSpeedDial(true);
  const handleCloseSpeedDial = () => setOpenSpeedDial(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
    handleCloseSpeedDial();
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleCreateTask = () => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { title, description, status, endDate },
    ]);
    handleCloseDialog();
    // Clear form after creating task
    setTitle('');
    setDescription('');
    setStatus('pending');
    setEndDate('');
  };

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
           currentDate={currentDate}
          />
        ))}
      </Box>
    </Box>
  );
}
