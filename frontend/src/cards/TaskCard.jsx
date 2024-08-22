import * as React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const TaskCard = ({ title, description, status, endDate, currentDate }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.primary" mt={2}>
          Status: {status}
        </Typography>
        <Typography variant="body2" color="text.primary" mt={1}>
           Start Date: {currentDate}
        </Typography>
        <Typography variant="body2" color="text.primary" mt={1}>
           Expected Date: {endDate}
        </Typography>

      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="secondary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
