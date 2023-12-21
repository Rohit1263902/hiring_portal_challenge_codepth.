import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the backend
    axios.get(`${API_URL}/tasks`)
      .then(response => setTasks(response.data.tasks))
      .catch(error => console.error(error));
  }, []);

  return (
    <View>
      <Text>Bitcoin Saving App</Text>
      {tasks.map(task => (
        <View key={task.id}>
          <Text>{task.title}</Text>
          {/* Render other task details */}
        </View>
      ))}
      <Button title="Add Task" onPress={() => console.log('Implement add task')} />
    </View>
  );
};

export default App;
